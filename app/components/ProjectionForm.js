"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectionForm({ projection = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: projection.title || "",
    description: projection.description || "",
    imageUrl: projection.imageUrl || "",
    projectionName: projection.projectionName || "",
    anatomicalZone: projection.anatomicalZone || "",
    labels: projection.labels ? projection.labels.join(", ") : "",
    extendedInfo: projection.extendedInfo || [""],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleExtendedInfoChange = (index, value) => {
    const updatedExtendedInfo = [...formData.extendedInfo]
    updatedExtendedInfo[index] = value
    setFormData((prevData) => ({ ...prevData, extendedInfo: updatedExtendedInfo }))
  }

  const addExtendedInfo = () => {
    setFormData((prevData) => ({
      ...prevData,
      extendedInfo: [...prevData.extendedInfo, ""],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedProjection = {
      ...projection,
      ...formData,
      labels: formData.labels.split(",").map((label) => label.trim()),
      extendedInfo: formData.extendedInfo.filter((info) => info !== ""),
    }
    onSave(updatedProjection)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{projection.id ? "Edit Projection" : "Add New Projection"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
          <Input
            name="projectionName"
            value={formData.projectionName}
            onChange={handleChange}
            placeholder="Projection Name"
            required
          />
          <Input
            name="anatomicalZone"
            value={formData.anatomicalZone}
            onChange={handleChange}
            placeholder="Anatomical Zone"
            required
          />
          <Input
            name="labels"
            value={formData.labels}
            onChange={handleChange}
            placeholder="Labels (comma-separated)"
            required
          />
          {formData.extendedInfo.map((info, index) => (
            <Input
              key={index}
              value={info}
              onChange={(e) => handleExtendedInfoChange(index, e.target.value)}
              placeholder={`Extended Info ${index + 1}`}
            />
          ))}
          <Button type="button" onClick={addExtendedInfo} variant="outline">
            Add Extended Info
          </Button>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

