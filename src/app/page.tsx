'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, User, Menu, X, Heart, Star, TrendingUp, Package, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CartSidebar } from '@/components/cart/cart-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const { toast } = useToast()

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.5,
      reviews: 234,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 449.99,
      originalPrice: 599.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 189,
      badge: 'New'
    },
    {
      id: 3,
      name: '4K Webcam Ultra',
      price: 179.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&h=400&fit=crop',
      rating: 4.3,
      reviews: 156,
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Mechanical Keyboard RGB',
      price: 129.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 412,
      badge: 'Popular'
    }
  ]

  const categories = [
    { name: 'Electronics', icon: '💻', count: 1234 },
    { name: 'Fashion', icon: '👕', count: 856 },
    { name: 'Home & Garden', icon: '🏠', count: 642 },
    { name: 'Sports', icon: '⚽', count: 428 },
    { name: 'Books', icon: '📚', count: 892 },
    { name: 'Toys', icon: '🎮', count: 367 }
  ]

  const addToCart = async (productId: string, productName: string) => {
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
        window.location.href = '/auth/signin'
        return
      }

      if (response.ok) {
        toast({
          title: 'Added to cart',
          description: `${productName} has been added to your cart`,
        })
        setCartCount(prev => prev + 1)
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
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary">🛍️</span>
              </div>
              <span className="text-xl font-bold">Product Store</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <CartSidebar />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <nav className="space-y-2">
                <Link href="/categories" className="block py-2 text-sm font-medium hover:text-primary">
                  Categories
                </Link>
                <Link href="/deals" className="block py-2 text-sm font-medium hover:text-primary">
                  Deals
                </Link>
                <Link href="/about" className="block py-2 text-sm font-medium hover:text-primary">
                  About
                </Link>
                <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4">🎉 Black Friday Sale</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Amazing Deals on
                <span className="text-primary"> Premium Products</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover thousands of products at unbeatable prices. Fast shipping, secure payments, and 24/7 support.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="px-8">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  View Deals
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className={`relative overflow-hidden rounded-lg border bg-card ${index === 0 ? 'row-span-2' : ''}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-lg font-bold">₹{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over ₹4000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-muted-foreground">Price match guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our wide selection of products</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked items just for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => addToCart(product.id.toString(), product.name)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 opacity-90">
            Subscribe to our newsletter for exclusive deals and new product alerts
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              placeholder="Enter your email"
              className="bg-background text-foreground"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">🛍️</span>
                </div>
                <span className="text-xl font-bold">Product Store</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted online marketplace for quality products and great deals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/categories" className="hover:text-foreground">Categories</Link></li>
                <li><Link href="/deals" className="hover:text-foreground">Deals</Link></li>
                <li><Link href="/new" className="hover:text-foreground">New Arrivals</Link></li>
                <li><Link href="/brands" className="hover:text-foreground">Brands</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-foreground">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-foreground">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/affiliate" className="hover:text-foreground">Affiliate Program</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Product Store. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}