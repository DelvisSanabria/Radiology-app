import { getProjections } from "../lib/api"
import ProjectionCard from "./ProjectionCard"

export default async function ProjectionList({ searchParams }) {
  const projections = await getProjections(searchParams?.search)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projections.map((projection) => (
        <ProjectionCard key={projection.id} projection={projection} />
      ))}
    </div>
  )
}

