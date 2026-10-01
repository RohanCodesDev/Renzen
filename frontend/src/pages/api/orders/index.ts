import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          items: true
        },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { customerName, customerEmail, customerAddress, total, items } = req.body;
      
      let customer = await prisma.customer.findUnique({ where: { email: customerEmail } });
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            name: customerName || 'Guest User',
            email: customerEmail || `guest_${Date.now()}@example.com`,
            address: customerAddress || 'N/A'
          }
        });
      }

      const order = await prisma.order.create({
        data: {
          customerId: customer.id,
          total: Number(total),
          items: {
            create: items.map((item: any) => ({
              productName: item.productName,
              qty: item.qty,
              price: Number(item.price)
            }))
          }
        },
        include: {
          customer: true,
          items: true
        }
      });

      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          ordersCount: { increment: 1 },
          totalSpent: { increment: Number(total) }
        }
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create order' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
