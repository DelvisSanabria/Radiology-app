"use client"

import { useState, useEffect } from "react"
import Slider from "react-slick"
import ProjectionCard from "./ProjectionCard"
import ProjectionForm from "./ProjectionForm"
import { getProjections, saveProjections } from "../lib/api"
import Loading from "./Loading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SearchBar from "./SearchBar"

// Import CSS files for react-slick
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function ProjectionSlider({ initialProjections = [] }) {
  const [projections, setProjections] = useState(initialProjections)
  const [filteredProjections, setFilteredProjections] = useState(initialProjections)
  const [loading, setLoading] = useState(initialProjections.length === 0)
  const [editingProjection, setEditingProjection] = useState(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  useEffect(() => {
    async function fetchProjections() {
      if (initialProjections.length === 0) {
        setLoading(true)
        try {
          const data = await getProjections()
          setProjections(data)
          setFilteredProjections(data)
        } catch (error) {
          console.error("Failed to fetch projections:", error)
          setProjections([])
          setFilteredProjections([])
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProjections()
  }, [initialProjections])

  const handleEdit = (projection) => {
    setEditingProjection(projection)
  }

  const handleSave = async (updatedProjection) => {
    let updatedProjections
    if (editingProjection) {
      updatedProjections = projections.map((p) => (p.id === updatedProjection.id ? updatedProjection : p))
    } else {
      updatedProjections = [...projections, { ...updatedProjection, id: Date.now() }]
    }
    try {
      await saveProjections(updatedProjections)
      setProjections(updatedProjections)
      setFilteredProjections(updatedProjections)
    } catch (error) {
      console.error("Failed to save projections:", error)
    }
    setEditingProjection(null)
    setIsAddingNew(false)
  }

  const handleCancel = () => {
    setEditingProjection(null)
    setIsAddingNew(false)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
  }

  const handleSearch = (searchTerm) => {
    const filtered = projections.filter(
      (projection) =>
        projection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projection.projectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projection.anatomicalZone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projection.labels.some((label) => label.toLowerCase().includes(searchTerm.toLowerCase())) ||
        projection.extendedInfo.some((info) => info.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredProjections(filtered)
  }

  const settings = {
    dots: true,
    infinite: filteredProjections.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (loading) {
    return <Loading />
  }

  if (editingProjection || isAddingNew) {
    return <ProjectionForm projection={editingProjection || {}} onSave={handleSave} onCancel={handleCancel} />
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Projection
        </Button>
      </div>
      {filteredProjections.length > 0 ? (
        <Slider {...settings}>
          {filteredProjections.map((projection) => (
            <div key={projection.id} className="px-2">
              <ProjectionCard projection={projection} onEdit={handleEdit} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No projections found.</p>
      )}
    </div>
  )
}

