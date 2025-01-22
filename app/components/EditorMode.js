"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditorMode({ projections, onSave, onCancel }) {
  const [editedProjections, setEditedProjections] = useState(projections)
  const [newProjection, setNewProjection] = useState({
    title: "",
    description: "",
    imageUrl: "",
    extendedInfo: [""],
  })

  const handleProjectionChange = (index, field, value) => {
    const updatedProjections = [...editedProjections]
    updatedProjections[index] = { ...updatedProjections[index], [field]: value }
    setEditedProjections(updatedProjections)
  }

  const handleExtendedInfoChange = (index, infoIndex, value) => {
    const updatedProjections = [...editedProjections]
    updatedProjections[index].extendedInfo[infoIndex] = value
    setEditedProjections(updatedProjections)
  }

  const handleNewProjectionChange = (field, value) => {
    setNewProjection({ ...newProjection, [field]: value })
  }

  const handleNewExtendedInfoChange = (index, value) => {
    const updatedExtendedInfo = [...newProjection.extendedInfo]
    updatedExtendedInfo[index] = value
    setNewProjection({ ...newProjection, extendedInfo: updatedExtendedInfo })
  }

  const addExtendedInfo = (index) => {
    const updatedProjections = [...editedProjections]
    updatedProjections[index].extendedInfo.push("")
    setEditedProjections(updatedProjections)
  }

  const addNewExtendedInfo = () => {
    setNewProjection({
      ...newProjection,
      extendedInfo: [...newProjection.extendedInfo, ""],
    })
  }

  const handleSave = () => {
    const allProjections = [...editedProjections]
    if (newProjection.title) {
      allProjections.push({
        ...newProjection,
        id: Date.now(), // Generate a temporary ID
        extendedInfo: newProjection.extendedInfo.filter((info) => info !== ""),
      })
    }
    onSave(allProjections)
  }

  return (
    <div className="space-y-8">
      {editedProjections.map((projection, index) => (
        <Card key={projection.id}>
          <CardHeader>
            <CardTitle>Edit Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                value={projection.title}
                onChange={(e) => handleProjectionChange(index, "title", e.target.value)}
                placeholder="Title"
              />
              <Textarea
                value={projection.description}
                onChange={(e) => handleProjectionChange(index, "description", e.target.value)}
                placeholder="Description"
              />
              <Input
                value={projection.imageUrl}
                onChange={(e) => handleProjectionChange(index, "imageUrl", e.target.value)}
                placeholder="Image URL"
              />
              {projection.extendedInfo.map((info, infoIndex) => (
                <Input
                  key={infoIndex}
                  value={info}
                  onChange={(e) => handleExtendedInfoChange(index, infoIndex, e.target.value)}
                  placeholder={`Extended Info ${infoIndex + 1}`}
                />
              ))}
              <Button onClick={() => addExtendedInfo(index)}>Add Extended Info</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Add New Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={newProjection.title}
              onChange={(e) => handleNewProjectionChange("title", e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={newProjection.description}
              onChange={(e) => handleNewProjectionChange("description", e.target.value)}
              placeholder="Description"
            />
            <Input
              value={newProjection.imageUrl}
              onChange={(e) => handleNewProjectionChange("imageUrl", e.target.value)}
              placeholder="Image URL"
            />
            {newProjection.extendedInfo.map((info, index) => (
              <Input
                key={index}
                value={info}
                onChange={(e) => handleNewExtendedInfoChange(index, e.target.value)}
                placeholder={`Extended Info ${index + 1}`}
              />
            ))}
            <Button onClick={addNewExtendedInfo}>Add Extended Info</Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

