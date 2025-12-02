import { RsvpForm } from "@/components/rsvp-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-primary py-6 px-4 shadow-md">
        {/* <div className="max-w-7xl mx-auto">
          <img
            src="../public/Fontys.png"
            alt="Fontys Logo"
            width={180}
            height={60}
          />
        </div> */}
      </div>

      <div className="flex items-center justify-center p-4 py-12 md:py-20">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight text-foreground">
              {"CE & ORM Alumni Reünie"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-3 leading-relaxed">
              Leuk dat je je wilt aanmelden voor de reünie van Fontys ORM en CE!
              <br/>
              De reünie vindt plaats op <b>7 januari</b> vanaf <b>19:00 uur</b> in <b>Stadscafé De Spijker</b>.
            </p>
          </div>

          <RsvpForm />
        </div>
      </div>
    </main>
  )
}
