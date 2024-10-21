// app/api/setCookie/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Cookie set successfully" });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json({ message: "Error setting cookie" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const authToken = cookies().get("authToken");

    if (authToken) {
      return NextResponse.json({
        message: "Cookie retrieved successfully",
        token: authToken.value,
      });
    } else {
      return NextResponse.json({ message: "Cookie not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return NextResponse.json({ message: "Error retrieving cookie" }, { status: 500 });
  }
}