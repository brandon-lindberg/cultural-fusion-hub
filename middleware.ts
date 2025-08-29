import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Use Next.js built-in locale detection for all requests (including bots)
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = { matcher: '/:path*' };
