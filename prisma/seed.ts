import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Everything for your home and garden',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and apparel',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      }
    })
  ])

  const products = [
    {
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      price: 299.99,
      comparePrice: 399.99,
      sku: 'WH-001',
      inventory: 50,
      featured: true,
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
      ]),
      tags: JSON.stringify(['wireless', 'bluetooth', 'noise-cancelling', 'premium'])
    },
    {
      name: 'Smart Watch Pro',
      slug: 'smart-watch-pro',
      description: 'Advanced smartwatch with health tracking, GPS, and smartphone integration.',
      price: 449.99,
      comparePrice: 599.99,
      sku: 'SW-002',
      inventory: 30,
      featured: true,
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400'
      ]),
      tags: JSON.stringify(['smartwatch', 'fitness', 'gps', 'health'])
    },
    {
      name: '4K Webcam Ultra',
      slug: '4k-webcam-ultra',
      description: 'Professional 4K webcam perfect for streaming, video calls, and content creation.',
      price: 179.99,
      comparePrice: 249.99,
      sku: 'WC-003',
      inventory: 75,
      featured: false,
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400'
      ]),
      tags: JSON.stringify(['webcam', '4k', 'streaming', 'video'])
    },
    {
      name: 'Mechanical Keyboard RGB',
      slug: 'mechanical-keyboard-rgb',
      description: 'Premium mechanical keyboard with customizable RGB backlighting and tactile switches.',
      price: 129.99,
      comparePrice: 179.99,
      sku: 'KB-004',
      inventory: 100,
      featured: true,
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1598928424272-9e667f73ed3e?w=400'
      ]),
      tags: JSON.stringify(['keyboard', 'mechanical', 'rgb', 'gaming'])
    },
    {
      name: 'Designer Leather Jacket',
      slug: 'designer-leather-jacket',
      description: 'Genuine leather jacket with modern design and premium craftsmanship.',
      price: 599.99,
      comparePrice: 799.99,
      sku: 'LJ-005',
      inventory: 20,
      featured: false,
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400'
      ]),
      tags: JSON.stringify(['jacket', 'leather', 'fashion', 'designer'])
    },
    {
      name: 'Yoga Mat Premium',
      slug: 'yoga-mat-premium',
      description: 'Extra thick, non-slip yoga mat with carrying strap and alignment markers.',
      price: 49.99,
      comparePrice: 69.99,
      sku: 'YM-006',
      inventory: 150,
      featured: false,
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400'
      ]),
      tags: JSON.stringify(['yoga', 'fitness', 'exercise', 'mat'])
    },
    {
      name: 'Smart Home Hub',
      slug: 'smart-home-hub',
      description: 'Central control hub for all your smart home devices with voice assistant.',
      price: 149.99,
      comparePrice: 199.99,
      sku: 'SH-007',
      inventory: 60,
      featured: true,
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ]),
      tags: JSON.stringify(['smart-home', 'iot', 'automation', 'voice'])
    },
    {
      name: 'Running Shoes Pro',
      slug: 'running-shoes-pro',
      description: 'Professional running shoes with advanced cushioning and breathable design.',
      price: 189.99,
      comparePrice: 249.99,
      sku: 'RS-008',
      inventory: 80,
      featured: false,
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
      ]),
      tags: JSON.stringify(['shoes', 'running', 'athletic', 'comfort'])
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })