import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { followId, followedBy } = req.body;
  if (typeof followId !== 'number' || typeof followedBy !== 'number') {
    res.status(400).send('Missing ids');
    return;
  }

  try {
    const unfollow = await prisma.user.update({
      where: { id: followId },
      data: { followedBy: { disconnect: { id: followedBy } } },
    });

    if (!unfollow) {
      res.status(500).send('Error unfollowing!');
      return;
    }
    res.status(200).json(unfollow);
  } catch {
    res.status(500).send('Error unfollowing!');
    return;
  }
};

export default handle;
