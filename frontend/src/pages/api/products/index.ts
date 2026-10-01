import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      const product = await prisma.product.create({
        data: {
          name: data.name,
          subtitle: data.subtitle,
          price: Number(data.price),
          originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
          image: data.image,
          category: data.category,
          subCategory: data.subCategory,
          badge: data.badge,
          badgeType: data.badgeType,
          status: data.status || 'In Stock',
          stock: data.stock ? Number(data.stock) : 0,
        }
      });
      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
