"use client"

import { useState } from "react"
import { Suspense } from "react"
import ProjectionSlider from "./components/ProjectionSlider"
import EditorMode from "./components/EditorMode"
import Loading from "./components/Loading"
import { Button } from "@/components/ui/button"
import { getProjections } from "./lib/api"

export default function Home() {
  const [isEditorMode, setIsEditorMode] = useState(false)
  const [projections, setProjections] = useState([])

  const toggleEditorMode = async () => {
    if (!isEditorMode && projections.length === 0) {
      // Fetch projections when entering editor mode for the first time
      const fetchedProjections = await getProjections()
      setProjections(fetchedProjections)
    }
    setIsEditorMode(!isEditorMode)
  }

  const handleSaveChanges = (updatedProjections) => {
    setProjections(updatedProjections)
    setIsEditorMode(false)
    // Here you would typically send the updated projections to your backend
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Radiological Projections Review</h1>
        <Button onClick={toggleEditorMode}>{isEditorMode ? "Exit Editor Mode" : "Enter Editor Mode"}</Button>
      </div>
      {isEditorMode ? (
        <EditorMode projections={projections} onSave={handleSaveChanges} onCancel={() => setIsEditorMode(false)} />
      ) : (
        <Suspense fallback={<Loading />}>
          <ProjectionSlider initialProjections={projections} />
        </Suspense>
      )}
    </main>
  )
}

