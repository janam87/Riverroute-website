import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.type) {
      return NextResponse.json(
        { error: "Missing required field: type" },
        { status: 400 }
      );
    }

    // Log submission (replace with Supabase insert later)
    console.log("Contact form submission:", body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
