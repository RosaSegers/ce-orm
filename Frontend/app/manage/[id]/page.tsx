import { ManageRsvp } from "@/components/manage-rsvp"

export default async function ManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            {"Manage Your RSVP"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {"Update your attendance status below"}
          </p>
        </div>

        <ManageRsvp rsvpId={id} />
      </div>
    </main>
  )
}
