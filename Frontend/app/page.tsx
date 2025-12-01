import { RsvpForm } from "@/components/rsvp-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-primary py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <Image
            src="/fontys-university-logo-purple.jpg"
            alt="Fontys Logo"
            width={180}
            height={60}
            className="h-14 w-auto brightness-0 invert"
          />
        </div>
      </div>

      <div className="flex items-center justify-center p-4 py-12 md:py-20">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight text-foreground">
              {"ORM Alumni Reünie"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-3 leading-relaxed">
              {"Kom samen voor een avond vol herinneringen"}
            </p>
            <div className="inline-block bg-accent text-white px-6 py-2 rounded-full font-bold text-lg">
              {"8 januari 2026"}
            </div>
          </div>

          <RsvpForm />
        </div>
      </div>
    </main>
  )
}
