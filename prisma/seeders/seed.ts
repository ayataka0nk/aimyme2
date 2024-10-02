import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const saltRounds = 10
const deleteAll = async () => {
  await prisma.monthlyProjectAllocation.deleteMany()
  await prisma.projectMember.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()
}

const insertData = async () => {
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: '田中 太郎',
      password: await bcrypt.hash('passw0rD', saltRounds)
    }
  })
  const project1 = await prisma.project.create({
    data: {
      name: 'プロジェクト1',
      description: 'プロジェクト1の説明'
    }
  })

  await prisma.projectMember.create({
    data: {
      project: {
        connect: { id: project1.id }
      },
      user: {
        connect: { id: user.id }
      },
      role: 'ADMIN'
    }
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'プロジェクト2',
      description: 'プロジェクト2の説明'
    }
  })

  await prisma.projectMember.create({
    data: {
      project: {
        connect: { id: project2.id }
      },
      user: {
        connect: { id: user.id }
      },
      role: 'ADMIN'
    }
  })

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  await prisma.monthlyProjectAllocation.create({
    data: {
      projectId: project1.id,
      userId: user.id,
      year: year,
      month: month,
      allocatedHours: 64
    }
  })
  await prisma.monthlyProjectAllocation.create({
    data: {
      projectId: project2.id,
      userId: user.id,
      year: year,
      month: month,
      allocatedHours: 32
    }
  })

  await prisma.timeEntry.create({
    data: {
      description: 'タスク1完了',
      startTime: new Date(),
      endTime: new Date(),
      project: {
        connect: { id: project1.id }
      },
      user: {
        connect: { id: user.id }
      }
    }
  })
}
const main = async () => {
  await deleteAll()
  await insertData()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
