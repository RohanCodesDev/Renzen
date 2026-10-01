import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const message = await prisma.message.update({
        where: { id },
        data: {
          isRead: true,
        }
      });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
