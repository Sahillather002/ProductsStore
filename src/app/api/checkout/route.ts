import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { items, shippingAddress, billingAddress } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'UNFULFILLED',
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
        shippingFirstName: shippingAddress.firstName,
        shippingLastName: shippingAddress.lastName,
        shippingCompany: shippingAddress.company,
        shippingAddress1: shippingAddress.address1,
        shippingAddress2: shippingAddress.address2,
        shippingCity: shippingAddress.city,
        shippingProvince: shippingAddress.province,
        shippingCountry: shippingAddress.country,
        shippingPostalCode: shippingAddress.postalCode,
        shippingPhone: shippingAddress.phone,
        billingFirstName: billingAddress.firstName,
        billingLastName: billingAddress.lastName,
        billingCompany: billingAddress.company,
        billingAddress1: billingAddress.address1,
        billingAddress2: billingAddress.address2,
        billingCity: billingAddress.city,
        billingProvince: billingAddress.province,
        billingCountry: billingAddress.country,
        billingPostalCode: billingAddress.postalCode,
        billingPhone: billingAddress.phone,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            image: item.image
          }))
        }
      }
    })

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    })

    await db.transaction.create({
      data: {
        orderId: order.id,
        gateway: 'stripe',
        gatewayTransactionId: stripeSession.id,
        amount: total,
        currency: 'USD',
        status: 'PENDING',
      }
    })

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}