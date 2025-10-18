import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/auth'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's cart with items and products
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id, user_id, cart_items(id, quantity, product_id, variant_id, products(id, name, price, images), product_variants(id, name, value))')
      .eq('user_id', user.id)
      .single()

    if (cartError && cartError.code !== 'PGRST116') {
      throw cartError
    }

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single()

      if (createError) throw createError

      return NextResponse.json({
        id: newCart.id,
        user_id: newCart.user_id,
        items: []
      })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Cart GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId, variantId, quantity } = await request.json()

    // Get or create cart
    let { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (cartError && cartError.code !== 'PGRST116') {
      throw cartError
    }

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select('id')
        .single()
      if (createError) throw createError
      cart = newCart
    }

    // Check if item exists
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId)
      .single()

    let cartItem
    if (existingItem) {
      const { data: updatedItem, error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select('id, quantity, product_id, variant_id, products(id, name, price, images), product_variants(id, name, value)')
        .single()
      if (updateError) throw updateError
      cartItem = updatedItem
    } else {
      const { data: newItem, error: insertError } = await supabase
        .from('cart_items')
        .insert({ 
          cart_id: cart.id, 
          product_id: productId, 
          variant_id: variantId, 
          quantity 
        })
        .select('id, quantity, product_id, variant_id, products(id, name, price, images), product_variants(id, name, value)')
        .single()
      if (insertError) throw insertError
      cartItem = newItem
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Cart POST error:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { itemId, quantity } = await request.json()

    const { data: cartItem, error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select('id, quantity, product_id, variant_id, products(id, name, price, images), product_variants(id, name, value)')
      .single()

    if (updateError) throw updateError
    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Cart PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (deleteError) throw deleteError
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cart DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
}


