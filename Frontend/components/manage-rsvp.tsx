"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, XCircle, Trash2 } from "lucide-react"

interface AlumniData {
  id: number
  name: string
  email: string
  graduationYear: string
  degree: string
  major: string
  currentPosition: string
  company: string
  location: string
  linkedInProfile: string
  signupDate: string
}

export function ManageRsvp({ rsvpId }: { rsvpId: string }) {
  const [alumni, setAlumni] = useState<AlumniData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    fetchAlumni()
  }, [rsvpId])

  const fetchAlumni = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/rsvp/${rsvpId}`)
      if (response.ok) {
        const data = await response.json()
        setAlumni(data)
      } else {
        setError("Alumnus niet gevonden")
      }
    } catch (err) {
      console.error("Error fetching alumni:", err)
      setError("Kon alumnus niet laden")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAlumni = async () => {
    if (!confirm("Weet je zeker dat je deze alumnus wilt verwijderen?")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`http://localhost:8080/api/rsvp/${rsvpId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setIsDeleted(true)
      } else {
        setError("Verwijderen mislukt")
      }
    } catch (err) {
      console.error("Error deleting alumni:", err)
      setError("Er is een fout opgetreden bij het verwijderen")
    } finally {
      setIsDeleting(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-12 pb-12 text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">{"Gegevens worden geladen..."}</p>
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (error || !alumni) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-12 pb-12 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
          <h2 className="text-2xl font-serif mb-4">{"Alumnus Niet Gevonden"}</h2>
          <p className="text-muted-foreground">{error || "De opgegeven ID is ongeldig of verwijderd."}</p>
        </CardContent>
      </Card>
    )
  }

  // Deleted state
  if (isDeleted) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-12 pb-12 text-center">
          <Trash2 className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl font-serif mb-4">{"Inschrijving Verwijderd"}</h2>
          <p className="text-muted-foreground">{"Deze alumnus is succesvol verwijderd uit de database."}</p>
        </CardContent>
      </Card>
    )
  }

  // Main view
  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl md:text-3xl font-serif">{alumni.name || "Naam Onbekend"}</CardTitle>
        <CardDescription className="text-base">{alumni.email}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-foreground">Afstudeerjaar:</p>
            <p className="text-muted-foreground">{alumni.graduationYear || "-"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Graad:</p>
            <p className="text-muted-foreground">{alumni.degree || "-"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Major:</p>
            <p className="text-muted-foreground">{alumni.major || "-"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Huidige functie:</p>
            <p className="text-muted-foreground">{alumni.currentPosition || "-"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Bedrijf:</p>
            <p className="text-muted-foreground">{alumni.company || "-"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Locatie:</p>
            <p className="text-muted-foreground">{alumni.location || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-foreground">LinkedIn:</p>
            <a
              href={alumni.linkedInProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline break-words"
            >
              {alumni.linkedInProfile || "-"}
            </a>
          </div>
        </div>

        <div className="pt-8 text-center">
          <Button
            onClick={deleteAlumni}
            disabled={isDeleting}
            variant="destructive"
            className="h-12 w-full md:w-auto"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {"Bezig met verwijderen..."}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                {"Verwijder deze alumnus"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
