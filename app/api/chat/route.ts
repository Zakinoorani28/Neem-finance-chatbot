import { type NextRequest, NextResponse } from "next/server"

const NEEM_API_URL = "https://ff27-119-63-128-155.ngrok-free.app"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    if (!body.query || typeof body.query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    // Make the request to your ngrok API
    const response = await fetch(NEEM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        query: body.query,
      }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Return the response with proper CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("API Error:", error)

    return NextResponse.json(
      {
        error: "Failed to connect to Neem AI API",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
