"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"

export default function ProjectionCard({ projection, onEdit }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(projection)
  }

  return (
    <Card className="w-full h-[500px] overflow-hidden cursor-pointer relative" onClick={handleFlip}>
      <CardContent className="p-0 h-full">
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
            <Image
              src={projection.imageUrl || "/placeholder.svg"}
              alt={projection.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-bold">{projection.title}</h2>
              <p className="text-sm">{projection.projectionName}</p>
            </div>
          </div>
          <div
            className="absolute w-full h-full p-6 bg-white backface-hidden flex flex-col justify-between overflow-y-auto"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{projection.title}</h2>
              <p className="text-gray-600 mb-2">{projection.description}</p>
              <p className="text-sm font-semibold mb-1">Projection Name: {projection.projectionName}</p>
              <p className="text-sm font-semibold mb-1">Anatomical Zone: {projection.anatomicalZone}</p>
              <div className="mb-4">
                {projection.labels &&
                  projection.labels.map((label, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {label}
                    </Badge>
                  ))}
              </div>
              <h3 className="text-xl font-semibold mb-2">Extended Information:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {projection.extendedInfo && projection.extendedInfo.map((info, index) => <li key={index}>{info}</li>)}
              </ul>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleFlip()
              }}
              className="mt-4"
            >
              View Image
            </Button>
          </div>
        </div>
      </CardContent>
      <Button variant="outline" size="icon" className="absolute top-2 right-2 z-10" onClick={handleEdit}>
        <Edit className="h-4 w-4" />
      </Button>
    </Card>
  )
}

