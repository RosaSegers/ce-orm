"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RsvpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    degree: "",
    major: "",
    currentPosition: "",
    company: "",
    oudLidGlow: "",
    linkedInProfile: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Error submitting alumni signup:", response.statusText)
      }
    } catch (error) {
      console.error("Error submitting alumni signup:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-accent bg-card shadow-xl">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            {"Bedankt voor je aanmelding als alumnus!"}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-2 text-lg">
            {"We hebben een bevestigingsmail gestuurd naar"}{" "}
            <span className="font-semibold text-accent">{formData.email}</span>
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {"Je kunt later contact opnemen om je gegevens bij te werken."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-accent bg-card shadow-xl">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{"Alumni Registratie"}</CardTitle>
        <CardDescription className="text-base leading-relaxed mt-2">
          {"Vul je alumni-gegevens hieronder in"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background border-2 focus:border-accent h-11"
                placeholder="Naam..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border-2 focus:border-accent h-11"
                placeholder="Emailadres..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Afstudeerjaar</Label>
              <Input
                id="graduationYear"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="bg-background border-2 focus:border-accent h-11"
                placeholder="2020"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">Gevolgde opleiding</Label>
            <Input
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              className="bg-background border-2 focus:border-accent h-11"
              placeholder="Major..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="currentPosition">Huidige functie</Label>
              <Input
                id="currentPosition"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                className="bg-background border-2 focus:border-accent h-11"
                placeholder="Functie..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Bedrijf <span className="text-muted-foreground font-normal">(optioneel)</span>
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-background border-2 focus:border-accent h-11"
                placeholder="Bedrijfsnaam..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ben je oud lid van GLOW</Label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="oudLidGlow"
                  value="Ja"
                  checked={formData.oudLidGlow === "Ja"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="oudLidGlow"
                  value="Nee"
                  checked={formData.oudLidGlow === "Nee"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Nee</span>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedInProfile">
              LinkedIn-profiel <span className="text-muted-foreground font-normal">(optioneel)</span>
            </Label>
            <Input
              id="linkedInProfile"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              className="bg-background border-2 focus:border-accent h-11"
              placeholder="https://www.linkedin.com/in/..."
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-white hover:bg-accent/90 h-12 text-base font-bold mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Bezig met verzenden..." : "Aanmelding versturen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
