'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '48px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#3b82f6',
            margin: '0',
            lineHeight: '1',
            marginBottom: '16px'
          }}>
            404
          </h1>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: '0',
            marginBottom: '16px'
          }}>
            Page Not Found
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}>
            Back to Home
          </Link>
          <Link href="/categories/electronics" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: '#3b82f6',
            padding: '12px 24px',
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}>
            Browse Products
          </Link>
        </div>

        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '24px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0 0 16px 0'
          }}>
            Popular Categories
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <Link href="/categories/electronics" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              Electronics
            </Link>
            <Link href="/categories/fashion" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              Fashion
            </Link>
            <Link href="/categories/home-garden" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              Home & Garden
            </Link>
            <Link href="/categories/sports" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}>
              Sports
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
