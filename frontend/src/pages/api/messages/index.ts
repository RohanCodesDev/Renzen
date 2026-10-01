import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      const message = await prisma.message.create({
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
        }
      });
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create message' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
