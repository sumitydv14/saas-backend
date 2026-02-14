import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding plans...");

  await prisma.plan.upsert({
    where: { name: "FREE" },
    update: {},
    create: {
      name: "FREE",
      price: 0,
      requestLimit: 100,
    },
  });

  await prisma.plan.upsert({
    where: { name: "PRO" },
    update: {},
    create: {
      name: "PRO",
      price: 999,
      requestLimit: 10000,
    },
  });

  console.log("Plans seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
