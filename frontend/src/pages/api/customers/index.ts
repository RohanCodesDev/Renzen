import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany({
        orderBy: { joinedAt: 'desc' }
      });

      const formattedCustomers = customers.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        orders: c.ordersCount,
        spent: c.totalSpent,
        joined: c.joinedAt
      }));

      return res.status(200).json(formattedCustomers);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
