import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { userId } = req.body;
  if (!id || !userId) {
    res.status(400).send('Missing ids');
    return;
  }

  try {
    const clip = await prisma.clip.update({
      where: { id: Number(id) },
      data: { likes: { connect: { id: Number(userId) } } },
    });

    if (!clip) {
      res.status(404).send('Like not successful');
      return;
    }

    res.status(200).json(clip);
  } catch (e) {
    console.log('e', e);
    res.status(500).send(e);
  }
};

export default handle;
