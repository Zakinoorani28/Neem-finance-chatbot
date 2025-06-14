import { NextResponse } from "next/server"

export async function GET() {
  try {
    // You can add more health checks here if needed
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "Neem AI Assistant API",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
