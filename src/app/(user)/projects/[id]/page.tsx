import { ProjectDetail } from '@/types'
import { deleteProject, getProject } from '../actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import DeleteButton from '../delete-button'
import { Separator } from '@/components/ui/separator'

export default async function ProjectDetailPage({
  params
}: {
  params: { id: string }
}) {
  const project: ProjectDetail = await getProject(params.id)
  const action = deleteProject.bind(null, params.id)
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
            <Link href={`/projects/${project.id}/edit`} passHref>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit project</span>
              </Button>
            </Link>
          </div>
          <CardDescription>Project ID: {project.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{project.description}</p>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <Separator className="mb-4 mt-10" />
            <div className="flex justify-end">
              <DeleteButton name={project.name} action={action} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
