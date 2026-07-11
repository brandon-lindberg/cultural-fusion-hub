import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const acceptsMarkdown = request.headers
    .get('accept')
    ?.toLowerCase()
    .split(',')
    .some((type) => type.trim().startsWith('text/markdown'));

  if (
    !acceptsMarkdown ||
    (request.method !== 'GET' && request.method !== 'HEAD')
  ) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = '/api/agent-markdown';
  destination.search = '';
  const originalPath = new URL(request.url).pathname;
  destination.searchParams.set('path', originalPath);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-agent-original-path', originalPath);
  return NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)',
  ],
};
