import { type NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

// In-memory storage for demo purposes
// In production, use a database
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company } = body

    // Generate unique ID for this RSVP
    const id = randomBytes(16).toString("hex")

    // Store RSVP
    rsvps.set(id, {
      id,
      firstName,
      lastName,
      email,
      company: company || "",
      status: "attending",
      createdAt: new Date(),
    })

    // Send confirmation email
    await sendConfirmationEmail({
      email,
      firstName,
      lastName,
      rsvpId: id,
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("[v0] Error processing RSVP:", error)
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 })
  }
}

async function sendConfirmationEmail({
  email,
  firstName,
  lastName,
  rsvpId,
}: {
  email: string
  firstName: string
  lastName: string
  rsvpId: string
}) {
  // Get the base URL for the manage link
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const manageUrl = `${baseUrl}/manage/${rsvpId}`

  // Email content
  const emailContent = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 32px; font-weight: 400; margin-bottom: 24px; color: #2c2c2c;">
        Thank you for your RSVP
      </h1>
      
      <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 16px;">
        Dear ${firstName} ${lastName},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 24px;">
        We're delighted to confirm your attendance at the Alumni Reunion on January 8th, 2026.
      </p>
      
      <div style="background: #f5f5f0; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px;">
          Event Details
        </p>
        <p style="font-size: 16px; color: #2c2c2c; margin: 0;">
          <strong>Date:</strong> January 8th, 2026<br/>
          <strong>Status:</strong> Attending
        </p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 24px;">
        Need to update your RSVP? You can manage your attendance status using the link below:
      </p>
      
      <a href="${manageUrl}" style="display: inline-block; background: #2c2c2c; color: white; padding: 12px 32px; text-decoration: none; border-radius: 4px; font-size: 16px;">
        Manage RSVP
      </a>
      
      <p style="font-size: 14px; line-height: 1.6; color: #999; margin-top: 32px;">
        We look forward to seeing you there!
      </p>
    </div>
  `

  // Log email for demo purposes
  // In production, integrate with an email service like Resend, SendGrid, etc.
  console.log("[v0] Email would be sent to:", email)
  console.log("[v0] Manage URL:", manageUrl)
  console.log("[v0] Email content:", emailContent)

  // TODO: Integrate with email service
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'Alumni Reunion <noreply@yourdomain.com>',
  //   to: email,
  //   subject: 'RSVP Confirmation - Alumni Reunion',
  //   html: emailContent
  // })
}
