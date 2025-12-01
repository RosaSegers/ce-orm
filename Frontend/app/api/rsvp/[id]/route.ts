import { type NextRequest, NextResponse } from "next/server"

// This would connect to your database in production
// For now, we'll use a simple in-memory store (shared with the POST route)
const rsvps = new Map<
  string,
  {
    id: string
    firstName: string
    lastName: string
    email: string
    company: string
    status: "attending" | "not-attending"
    createdAt: Date
  }
>()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const rsvp = rsvps.get(params.id)

  if (!rsvp) {
    return NextResponse.json({ error: "RSVP not found" }, { status: 404 })
  }

  return NextResponse.json(rsvp)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    const rsvp = rsvps.get(params.id)

    if (!rsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 })
    }

    // Update status
    rsvp.status = status
    rsvps.set(params.id, rsvp)

    // Send update confirmation email
    await sendUpdateEmail(rsvp)

    return NextResponse.json(rsvp)
  } catch (error) {
    console.error("[v0] Error updating RSVP:", error)
    return NextResponse.json({ error: "Failed to update RSVP" }, { status: 500 })
  }
}

async function sendUpdateEmail(rsvp: {
  email: string
  firstName: string
  lastName: string
  status: "attending" | "not-attending"
}) {
  const statusText = rsvp.status === "attending" ? "Aanwezig" : "Niet Aanwezig"

  console.log("[v0] Update email would be sent to:", rsvp.email)
  console.log("[v0] New status:", statusText)

  // TODO: Integrate with email service to send update confirmation
}
