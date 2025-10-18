import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/categories/electronics">
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Popular Categories
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/electronics">Electronics</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/fashion">Fashion</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/home-garden">Home & Garden</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/categories/sports">Sports</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
