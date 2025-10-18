import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const wishlistItems = await db.wishlistItem.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const itemsWithDetails = wishlistItems.map(item => ({
      ...item,
      product: {
        ...item.product,
        images: item.product.images ? JSON.parse(item.product.images) : []
      }
    }))

    return NextResponse.json(itemsWithDetails)
  } catch (error) {
    console.error('Wishlist GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const existingItem = await db.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        productId
      }
    })

    if (existingItem) {
      return NextResponse.json(
        { error: 'Product already in wishlist' },
        { status: 400 }
      )
    }

    const wishlistItem = await db.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json(wishlistItem)
  } catch (error) {
    console.error('Wishlist POST error:', error)
    return NextResponse.json(
      { error: 'Failed to add item to wishlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await db.wishlistItem.deleteMany({
      where: {
        userId: session.user.id,
        productId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Wishlist DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to remove item from wishlist' },
      { status: 500 }
    )
  }
}