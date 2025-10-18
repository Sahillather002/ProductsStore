import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as any
        
        const orderId = session.metadata?.orderId
        if (!orderId) {
          throw new Error('No order ID in session metadata')
        }

        await db.order.update({
          where: { id: orderId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
          }
        })

        await db.transaction.updateMany({
          where: { 
            orderId,
            gatewayTransactionId: session.id
          },
          data: {
            status: 'COMPLETED'
          }
        })

        console.log(`Payment succeeded for order ${orderId}`)
        break

      case 'checkout.session.expired':
        const expiredSession = event.data.object as any
        const expiredOrderId = expiredSession.metadata?.orderId
        
        if (expiredOrderId) {
          await db.order.update({
            where: { id: expiredOrderId },
            data: {
              status: 'CANCELLED',
              paymentStatus: 'FAILED',
            }
          })

          await db.transaction.updateMany({
            where: { 
              orderId: expiredOrderId,
              gatewayTransactionId: expiredSession.id
            },
            data: {
              status: 'FAILED'
            }
          })
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}