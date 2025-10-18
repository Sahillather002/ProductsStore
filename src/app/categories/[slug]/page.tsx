'use client'

import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'

// Mock data - in real app, fetch from database
const categories = {
  'electronics': {
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    products: [
      {
        id: 'prod_001',
        name: 'Premium Wireless Headphones',
        price: 24999.99,
        originalPrice: 34999.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.5,
        reviews: 234,
        badge: 'Best Seller'
      },
      {
        id: 'prod_002',
        name: 'Smart Watch Pro',
        price: 37999.99,
        originalPrice: 49999.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        rating: 4.8,
        reviews: 189,
        badge: 'New'
      },
      {
        id: 'prod_003',
        name: '4K Webcam Ultra',
        price: 14999.99,
        originalPrice: 20999.99,
        image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400',
        rating: 4.3,
        reviews: 156,
        badge: 'Sale'
      },
      {
        id: 'prod_004',
        name: 'Mechanical Keyboard RGB',
        price: 10999.99,
        originalPrice: 15999.99,
        image: 'https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400',
        rating: 4.7,
        reviews: 412,
        badge: 'Popular'
      },
      {
        id: 'prod_005',
        name: 'Laptop Pro 15"',
        price: 109999.99,
        originalPrice: 139999.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        rating: 4.6,
        reviews: 89,
        badge: 'Premium'
      }
    ]
  },
  'fashion': {
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    products: [
      {
        id: 'prod_006',
        name: 'Designer Leather Jacket',
        price: 49999.99,
        originalPrice: 69999.99,
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
        rating: 4.4,
        reviews: 67,
        badge: 'Designer'
      },
      {
        id: 'prod_007',
        name: 'Classic Denim Jeans',
        price: 7999.99,
        originalPrice: 11999.99,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
        rating: 4.2,
        reviews: 123,
        badge: 'Classic'
      },
      {
        id: 'prod_008',
        name: 'Silk Evening Dress',
        price: 24999.99,
        originalPrice: 39999.99,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        rating: 4.6,
        reviews: 45,
        badge: 'Elegant'
      }
    ]
  },
  'home-garden': {
    name: 'Home & Garden',
    description: 'Everything for your home and garden',
    products: [
      {
        id: 'prod_011',
        name: 'Smart Home Hub',
        price: 12999.99,
        originalPrice: 17999.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        rating: 4.5,
        reviews: 78,
        badge: 'Smart'
      },
      {
        id: 'prod_012',
        name: 'Ceramic Plant Pot Set',
        price: 3499.99,
        originalPrice: 5499.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
        rating: 4.3,
        reviews: 32,
        badge: 'Eco'
      }
    ]
  },
  'sports': {
    name: 'Sports',
    description: 'Sports equipment and apparel',
    products: [
      {
        id: 'prod_009',
        name: 'Yoga Mat Premium',
        price: 3999.99,
        originalPrice: 5999.99,
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
        rating: 4.4,
        reviews: 156,
        badge: 'Premium'
      },
      {
        id: 'prod_010',
        name: 'Running Shoes Pro',
        price: 15999.99,
        originalPrice: 20999.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        rating: 4.6,
        reviews: 89,
        badge: 'Pro'
      }
    ]
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  const addToCart = async (productId: string, productName: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (response.status === 401) {
        toast({
          title: 'Login Required',
          description: 'Please login to add items to cart',
          variant: 'destructive',
        })
        router.push('/auth/signin')
        return
      }

      if (response.ok) {
        toast({
          title: 'Added to cart',
          description: `${productName} has been added to your cart`,
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add item to cart',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2">
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={() => addToCart(product.id, product.name)}
                    disabled={isLoading}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => addToCart(product.id, product.name)}
                    disabled={isLoading}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
