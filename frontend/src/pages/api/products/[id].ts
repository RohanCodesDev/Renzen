import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.product.delete({
        where: { id: parseInt(id) }
      });
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name: data.name,
          subtitle: data.subtitle,
          price: Number(data.price),
          image: data.image,
          category: data.category,
          subCategory: data.subCategory,
        }
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
