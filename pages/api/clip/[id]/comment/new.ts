import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { content, authorId, commentId } = req.body;
  if (typeof id !== 'string') {
    res.status(400).send('Missing ids');
    return;
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      clip: {
        connect: { id: Number(id) },
      },
      author: { connect: { id: authorId } },
      comment: commentId ? { connect: { id: commentId } } : undefined,
    },
  });

  if (!newComment) {
    res.status(500).send('Error creating comment');
    return;
  }

  res.status(200).json(newComment);
};

export default handle;
