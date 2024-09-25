import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const saltRounds = 10
const deleteAll = async () => {
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
