import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUrl } from "lib/getUrl";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    if (!token) return NextResponse.redirect(getUrl("/login"));
  }

  if (pathname === "/login") {
    if (token) return NextResponse.redirect(getUrl());
  }

  return NextResponse.next();
}
