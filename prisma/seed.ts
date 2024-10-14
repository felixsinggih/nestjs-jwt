import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed users
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@mail.com',
        password: await hash('password', 10),
        role: 'admin',
      },
      {
        name: 'Alice',
        email: 'user@mail.com',
        password: await hash('password', 10),
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
