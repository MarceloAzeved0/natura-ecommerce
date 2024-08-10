import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flushDatabase = async () => {
  await prisma.$connect();
  await prisma.$transaction([
    prisma.orderProduct.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  await prisma.$disconnect();
};

export default flushDatabase;
