import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set the paths that don't require the user to be signed in
const signInOut = ['/sign-in*', '/sign-up*'];

const isSignInOut = (path: string) => {
  return signInOut.find((x) => path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))));
};

const isRoot = (path: string) => {
  return path === '/';
};

export default withClerkMiddleware((request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (isSignInOut(pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);
  console.log(pathname, userId);
  if (isRoot(pathname) && userId) {
    return NextResponse.redirect('/ask');
  }

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico).*)' };
