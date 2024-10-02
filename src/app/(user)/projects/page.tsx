import Link from 'next/link'
import { ProjectSummary } from '@/types'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { getProjects } from './actions'

export default async function ProjectsPage() {
  const projects: ProjectSummary[] = await getProjects()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">プロジェクト一覧</h1>
      <div className="space-y-4">
        {projects.map((project) => (
          <div>
            <Link href={`/projects/${project.id}`} passHref>
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-sm">
          プロジェクトがありません。
        </p>
      )}
    </div>
  )
}
