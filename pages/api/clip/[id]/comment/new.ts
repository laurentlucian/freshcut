import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  console.log('id', id);
  const { content, authorId } = req.body;
  console.log('authorId', authorId);
  console.log('content', content);
  if (typeof id !== 'string') {
    return;
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      clip: {
        connect: { id: Number(id) },
      },
      author: { connect: { id: authorId } },
    },
  });

  if (!newComment) {
    res.status(500).send('Error creating comment');
    return;
  }

  res.status(200).json(newComment);
};

export default handle;
