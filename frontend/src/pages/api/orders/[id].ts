import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { status } = req.body;
      const order = await prisma.order.update({
        where: { id },
        data: { status },
        include: {
          customer: true,
          items: true
        }
      });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update order status' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
