import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId, userId } = req.body;
  if (!commentId || !userId) {
    res.status(400).send('Missing ids');
    return;
  }

  try {
    const comment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { likes: { connect: { id: Number(userId) } } },
    });

    if (!comment) {
      res.status(404).send('Like not successful');
      return;
    }

    res.status(200).json(comment);
  } catch (e) {
    console.log('e', e);
    res.status(500).send(e);
  }
};

export default handle;
