import { NextResponse } from "next/server"
import { simpleGoogleSheets } from "@/lib/google-sheets-simple"

export async function GET() {
  try {
    const result = await simpleGoogleSheets.testConnection()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}