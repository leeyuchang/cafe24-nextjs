import prisma from '../lib/prisma';

async function main() {
  const SEED_EMAIL = process.env.SEED_EMAIL;
  const SEED_NAME = process.env.SEED_NAME;
  const SEED_PASSWORD = process.env.SEED_PASSWORD;

  if (!SEED_EMAIL || !SEED_NAME || !SEED_PASSWORD) {
    throw new Error('There is no process.env check plz..');
  }

  const user = await prisma.user.create({
    data: {
      email: SEED_EMAIL,
      name: SEED_NAME,
      password: SEED_PASSWORD,
      role: 'ADMIN',
    },
  });
  console.log('successfully created ', user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
