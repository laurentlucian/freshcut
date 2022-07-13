import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { followId, followedBy } = req.body;
  console.log('followedBy', followedBy);
  console.log('followId', followId);
  if (typeof followId !== 'number' || typeof followedBy !== 'number') {
    res.status(400).send('Missing ids');
    return;
  }

  try {
    const newFollow = await prisma.user.update({
      where: { id: followId },
      data: { followedBy: { connect: { id: followedBy } } },
    });

    if (!newFollow) {
      res.status(500).send('Error following!');
      return;
    }
    res.status(200).json(newFollow);
  } catch {
    res.status(500).send('Error following!');
    return;
  }
};

export default handle;
