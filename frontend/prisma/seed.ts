import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.message.deleteMany();

  console.log('Seeding products...');
  
  const products = [
    // --- TEA PRODUCTS ---
    {
      name: 'Spring Blossom First Flush',
      subtitle: 'Light, floral, and brisk with classic muscatel notes.',
      price: 499,
      originalPrice: 650,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
      badge: 'Best Seller',
      badgeType: 'matcha',
      category: 'Tea',
      subCategory: 'Darjeeling First Flush',
      stock: 100,
    },
    {
      name: 'Moonlight Pluck First Flush',
      subtitle: 'Delicate, sweet, and hand-plucked during full moon.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c2a1?w=600&q=80',
      category: 'Tea',
      subCategory: 'Darjeeling First Flush',
      stock: 50,
    },
    {
      name: 'Summer Muscatel',
      subtitle: 'Rich, full-bodied with a pronounced fruity aroma.',
      price: 549,
      image: 'https://images.unsplash.com/photo-1582787019808-01e4a2c5a2c9?w=600&q=80',
      badge: 'New',
      badgeType: 'orange',
      category: 'Tea',
      subCategory: 'Darjeeling Second Flush',
      stock: 75,
    },
    {
      name: 'Emerald Green Estate',
      subtitle: 'Unoxidized, fresh and grassy with high antioxidants.',
      price: 399,
      image: 'https://images.unsplash.com/photo-1627492275512-4eb349924c29?w=600&q=80',
      badge: 'Organic',
      badgeType: 'matcha',
      category: 'Tea',
      subCategory: 'Darjeeling Green Tea',
      stock: 120,
    },
    {
      name: 'Rose & Hibiscus Infusion',
      subtitle: 'Caffeine-free botanical blend with tart cherry notes.',
      price: 499,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=600&q=80',
      badge: 'Popular',
      badgeType: 'orange',
      category: 'Tea',
      subCategory: 'Fruity & Floral Teas',
      stock: 60,
    },

    // --- COFFEE PRODUCTS ---
    {
      name: 'Classic Agglomerated Blend',
      subtitle: 'Rich aroma and bold flavour.',
      price: 299,
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80',
      category: 'Coffee',
      subCategory: 'Agglomerated',
      stock: 200,
    },
    {
      name: 'Premium Freeze Dried',
      subtitle: 'Preserves the delicate flavours and aromas.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&q=80',
      badge: 'Premium',
      badgeType: 'cream',
      category: 'Coffee',
      subCategory: 'Freeze Dried',
      stock: 150,
    },
    {
      name: 'Hazelnut Infusion',
      subtitle: 'Deliciously infused with hints of hazelnut.',
      price: 399,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
      badge: 'Bestseller',
      badgeType: 'orange',
      category: 'Coffee',
      subCategory: 'Flavoured',
      stock: 80,
    },
    {
      name: 'Vanilla Caramel Dream',
      subtitle: 'Smooth vanilla with a touch of sweet caramel.',
      price: 449,
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80',
      category: 'Coffee',
      subCategory: 'Flavoured',
      stock: 90,
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Seeded products successfully!');

  console.log('Seeding a dummy customer and order...');
  const customer = await prisma.customer.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Coffee St, Bean City',
      totalSpent: 998,
      ordersCount: 1,
    }
  });

  await prisma.order.create({
    data: {
      customerId: customer.id,
      total: 998,
      status: 'Processing',
      paymentStatus: 'Paid',
      items: {
        create: [
          {
            productName: 'Spring Blossom First Flush',
            qty: 2,
            price: 499
          }
        ]
      }
    }
  });

  console.log('Seeded dummy order!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
