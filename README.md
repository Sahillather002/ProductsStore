# ShopHub - Premium E-Commerce Platform

A comprehensive, full-stack e-commerce application built with Next.js 15, TypeScript, Supabase, and modern web technologies. This platform features all the essential functionality you'd expect from a production-ready e-commerce site.

## 🚀 Features

### Core E-Commerce Features
- **Product Catalog**: Browse products with categories, search, and filtering
- **Shopping Cart**: Full cart management with add/update/remove functionality
- **User Authentication**: Secure login/registration with Supabase Auth
- **Order Management**: Complete order processing and tracking
- **Payment Integration**: Stripe payment gateway integration
- **Review System**: Customer reviews and ratings
- **Wishlist**: Save favorite products for later

### Advanced Features
- **Admin Dashboard**: Comprehensive admin panel for store management
- **Image Hosting**: Cloudinary integration for product images
- **Real-time Updates**: WebSocket support for live notifications
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database Management**: Supabase PostgreSQL with Row Level Security
- **API Integration**: RESTful APIs for all functionality

### User Experience
- **Modern UI**: Beautiful, intuitive interface with shadcn/ui components
- **Search & Filter**: Advanced product search and category filtering
- **Order History**: Complete order tracking and management
- **User Profile**: Personal dashboard with order history and preferences
- **Secure Checkout**: Safe and secure payment processing

## 🛠 Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Supabase**: PostgreSQL database with real-time capabilities
- **Supabase Auth**: Authentication and authorization
- **Row Level Security**: Database-level security policies
- **Stripe**: Payment processing
- **Cloudinary**: Image hosting and management

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Hot Reload**: Fast development experience

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shophub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a project at https://app.supabase.com
   - Run `supabase-schema.sql` in SQL Editor
   - Run `supabase-sample-data-auth.sql` in SQL Editor
   - Get your API keys from Settings > API

4. **Set up environment variables**
   ```bash
   cp ENV_TEMPLATE.txt .env
   ```
   
   Configure the following variables in `.env`:
   ```env
   # Supabase (REQUIRED)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Stripe (Optional)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   
   # Cloudinary (Optional)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cart/          # Shopping cart API
│   │   ├── checkout/      # Payment processing
│   │   ├── orders/        # Order management
│   │   ├── products/      # Product catalog
│   │   ├── reviews/       # Review system
│   │   └── wishlist/      # Wishlist functionality
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cart/             # Cart-related components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── auth.ts           # Supabase Auth utilities
│   ├── supabase.ts       # Supabase client
│   ├── stripe.ts         # Stripe configuration
│   └── cloudinary.ts     # Cloudinary setup
└── hooks/                # Custom React hooks
```

## 🎯 Key Features Explained

### Shopping Cart System
- Persistent cart storage in database
- Real-time cart updates
- Quantity management
- Checkout integration

### Admin Dashboard
- Product management (CRUD operations)
- Order tracking and management
- Sales analytics and reporting
- User management

### Payment Processing
- Stripe integration for secure payments
- Webhook handling for payment confirmation
- Order status updates
- Refund processing

### Review System
- Customer ratings and reviews
- Review moderation
- Average rating calculations
- Verified purchase badges

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🚀 Deployment

This application is designed to be deployed on modern hosting platforms:

1. **Vercel** (Recommended)
   - Automatic deployments from Git
   - Built-in Next.js optimization
   - Edge functions support

2. **Netlify**
   - Static site generation
   - Serverless functions
   - Form handling

3. **AWS/Google Cloud**
   - Full control over infrastructure
   - Scalability options
   - Custom configurations

## 📝 API Documentation

### Products API
- `GET /api/products` - Get all products with filtering
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Cart API
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart` - Remove item from cart

### Orders API
- `GET /api/orders/user` - Get user's orders
- `POST /api/checkout` - Process checkout
- `GET /api/admin/dashboard` - Get admin stats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn/ui for beautiful components
- Prisma for excellent ORM
- Stripe for payment processing
- Cloudinary for image hosting

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using modern web technologies**