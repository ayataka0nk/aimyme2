import { ProjectForm } from '../project-form'

export default async function ProjectNewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-3xl mx-auto">
        <ProjectForm name="" description="" />
      </div>
    </div>
  )
}
