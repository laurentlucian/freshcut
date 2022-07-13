import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

const userWithClips = Prisma.validator<Prisma.UserArgs>()({
  include: { clips: { include: { author: true, likes: true } }, followedBy: true },
});

export type UserWithClips = Prisma.UserGetPayload<typeof userWithClips>;

const commentWithAuthor = Prisma.validator<Prisma.CommentArgs>()({
  include: { author: true, likes: true },
});

export type CommentWithAuthor = Prisma.CommentGetPayload<typeof commentWithAuthor>;
