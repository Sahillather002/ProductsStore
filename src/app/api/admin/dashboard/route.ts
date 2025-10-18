import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
      topProducts
    ] = await Promise.all([
      db.product.count({
        where: { status: 'ACTIVE' }
      }),
      db.order.count(),
      db.user.count(),
      db.order.aggregate({
        _sum: { total: true },
        where: {
          paymentStatus: 'PAID'
        }
      }),
      db.order.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      db.product.findMany({
        take: 10,
        include: {
          category: true,
          _count: {
            select: {
              orderItems: true
            }
          }
        },
        orderBy: {
          orderItems: {
            _count: 'desc'
          }
        }
      })
    ])

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
      topProducts
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}