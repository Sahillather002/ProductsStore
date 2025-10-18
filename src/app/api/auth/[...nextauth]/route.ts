// This route is no longer needed - authentication is handled by Supabase
// Auth endpoints are now:
// - Sign up: Use Supabase client signUp method
// - Sign in: Use Supabase client signInWithPassword method
// - Sign out: Use Supabase client signOut method
// - OAuth: Use Supabase client signInWithOAuth method

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { message: 'Authentication is handled by Supabase. Please use Supabase Auth methods.' },
    { status: 200 }
  )
}

export async function POST() {
  return NextResponse.json(
    { message: 'Authentication is handled by Supabase. Please use Supabase Auth methods.' },
    { status: 200 }
  )
}