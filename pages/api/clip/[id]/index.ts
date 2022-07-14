import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).send('Missing id');
    return;
  }

  const clip = await prisma.clip.findUnique({
    where: { id: Number(id) },
    include: {
      comments: {
        include: { author: true, likes: true, replies: { include: { author: true, likes: true } } },
      },
      likes: true,
    },
  });

  if (!clip) {
    res.status(404).send('Clip not found');
    return;
  }

  res.status(200).json(clip);
};

export default handle;
