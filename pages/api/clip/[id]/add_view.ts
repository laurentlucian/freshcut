import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).send('Missing id');
    return;
  }
  try {
    const clip = await prisma.clip.update({
      where: { id: Number(id) },
      data: { viewCount: { increment: 1 } },
    });

    if (!clip) {
      res.status(404).send('Clip not found');
      return;
    }

    res.status(200).json(clip);
  } catch (e) {
    console.log('add_view -> e', e);
    res.status(500).send(e);
  }
};

export default handle;
