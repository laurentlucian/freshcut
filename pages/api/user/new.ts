import type { NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const handle = async (_, res: NextApiResponse) => {
  const newUser = await prisma.user.create({
    data: {
      username: 'impostor',
      imageURL: `/assets/avatars/${Math.floor(Math.random() * (21 - 10 + 1)) + 10}.png`,
    },
  });

  if (!newUser) {
    res.status(500).send('Error creating user');
    return;
  }

  res.status(200).json(newUser);
};

export default handle;
