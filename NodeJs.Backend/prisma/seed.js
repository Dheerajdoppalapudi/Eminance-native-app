const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      username: "User One",
      email: "user1@example.com",
      password: "hashedpassword1",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      username: "User Two",
      email: "user2@example.com",
      password: "hashedpassword2",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        name: "First Post",
        description: "This is the first post.",
        thumbnail: 'https://cdn.thewirecutter.com/wp-content/media/2023/08/drones-2048px-0718.jpg',
        userId: user1.id,
      },
      {
        name: "Second Post",
        description: "This is the second post.",
        thumbnail: 'https://cdn.thewirecutter.com/wp-content/media/2023/08/drones-2048px-0718.jpg',
        userId: user2.id,
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });