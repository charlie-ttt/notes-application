import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname == "/") {
    return NextResponse.redirect(new URL("/notes/1", req.url));
  }
  return NextResponse.next();
}
