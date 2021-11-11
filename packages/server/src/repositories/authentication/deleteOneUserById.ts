import { PrismaClient } from ".prisma/client"

interface deleteOneUserByIdArgs {
  id: string
}
export async function deleteOneUserById({ id }: deleteOneUserByIdArgs, prisma: PrismaClient) {
  await prisma.score.deleteMany({
    where: {
      userId: id,
    }
  })
  return await prisma.user.delete({
    where: {
      id
    }
  })
}