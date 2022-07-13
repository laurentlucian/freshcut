import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'housebbu',
    imageURL: '/assets/avatars/6.png',
    bio: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit magna.',
    creator: true,
    clips: {
      create: [
        {
          description:
            'Satoshi Nakamoto launched lots of decentralisation when Litecoin required many decentralised application',
          videoURL: 'https://content.jwplatform.com/videos/E69TdJGW-zR83cUvz.mp4',
          game: 'League of Legends',
          tags: { create: [{ name: 'sniped' }, { name: 'teamsolomid' }] },
        },
        {
          description: 'Quick slamming',
          videoURL: 'https://content.jwplatform.com/videos/2Ru3Q2RK-zR83cUvz.mp4',
          game: 'Call of Duty: Warzone',
        },
      ],
    },
  },
  {
    username: 'uhSnow',
    imageURL: '/assets/avatars/2.png',
    comments: {
      create: [
        {
          content: 'I remember when this first dropped!',
          clip: {
            connect: {
              id: 1,
            },
          },
        },
      ],
    },
  },
  {
    username: 'Marble',
    imageURL: '/assets/avatars/3.png',
    comments: {
      create: [
        {
          content:
            'A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.',
          clip: {
            connect: {
              id: 1,
            },
          },
        },
      ],
    },
  },
  {
    username: 'Ravs',
    imageURL: '/assets/avatars/4.png',
    replies: {
      create: [
        {
          content:
            'A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.',
          comment: {
            connect: {
              id: 2,
            },
          },
        },
      ],
    },
  },
  {
    username: 'AnthonyZ',
    imageURL: '/assets/avatars/5.png',
    comments: {
      create: [
        {
          content:
            'A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.',
          clip: {
            connect: {
              id: 1,
            },
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
