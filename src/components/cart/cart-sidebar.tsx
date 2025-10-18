'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'

interface CartItem {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
}

interface Cart {
  id: string
  items: CartItem[]
}

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const cartData = await response.json()
        setCart(cartData)
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchCart()
    }
  }, [isOpen])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          quantity: newQuantity,
        }),
      })

      if (response.ok) {
        await fetchCart()
        toast({
          title: 'Cart updated',
          description: 'Item quantity updated successfully',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update cart',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchCart()
        toast({
          title: 'Item removed',
          description: 'Item removed from cart successfully',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalItems = () => {
    return cart?.items.reduce((total, item) => total + item.quantity, 0) || 0
  }

  const getTotalPrice = () => {
    return cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) || 0
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {cart?.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">
                Add some products to get started!
              </p>
              <Button onClick={() => setIsOpen(false)} className="w-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart?.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.product.images[0] || '/api/placeholder/80/80'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={isLoading || item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive"
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart?.items.length > 0 && (
          <div className="border-t pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}