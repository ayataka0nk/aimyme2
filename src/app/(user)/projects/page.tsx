import Link from 'next/link'
import { ProjectSummary } from '@/types'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProjects } from './actions'

export default async function ProjectsPage() {
  const projects: ProjectSummary[] = await getProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">プロジェクト一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/projects/${project.id}`} passHref>
                <Button className="w-full">詳細を見る</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          プロジェクトがありません。
        </p>
      )}
    </div>
  )
}
