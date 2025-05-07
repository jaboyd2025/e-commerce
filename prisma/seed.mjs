import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
      },
    });

    // Create regular user
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        name: 'Regular User',
        password: await bcrypt.hash('user123', 10),
        role: 'USER',
      },
    });

    // Create categories
    const tshirtCategory = await prisma.category.upsert({
      where: { name: 'T-shirts' },
      update: {},
      create: {
        name: 'T-shirts',
        description: 'Comfortable and stylish t-shirts',
        image: '/images/p11-1.jpg',
      },
    });

    const jeansCategory = await prisma.category.upsert({
      where: { name: 'Jeans' },
      update: {},
      create: {
        name: 'Jeans',
        description: 'Classic and modern jeans',
        image: '/images/p21-1.jpg',
      },
    });

    const shoesCategory = await prisma.category.upsert({
      where: { name: 'Shoes' },
      update: {},
      create: {
        name: 'Shoes',
        description: 'Trendy and comfortable shoes',
        image: '/images/p31-1.jpg',
      },
    });

    // Create products
    const tshirt1 = await prisma.product.create({
      data: {
        name: 'Classic White T-shirt',
        description: 'A comfortable white t-shirt made from 100% cotton',
        price: 29.99,
        stock: 100,
        images: ['/images/p11-1.jpg'],
        categoryId: tshirtCategory.id,
      },
    });

    const tshirt2 = await prisma.product.create({
      data: {
        name: 'Black Graphic T-shirt',
        description: 'Stylish black t-shirt with modern graphic design',
        price: 34.99,
        stock: 75,
        images: ['/images/p11-2.jpg'],
        categoryId: tshirtCategory.id,
      },
    });

    const jeans1 = await prisma.product.create({
      data: {
        name: 'Slim Fit Blue Jeans',
        description: 'Classic blue jeans with modern slim fit',
        price: 79.99,
        stock: 50,
        images: ['/images/p21-1.jpg'],
        categoryId: jeansCategory.id,
      },
    });

    const jeans2 = await prisma.product.create({
      data: {
        name: 'Black Skinny Jeans',
        description: 'Stylish black skinny jeans for a modern look',
        price: 89.99,
        stock: 45,
        images: ['/images/p21-2.jpg'],
        categoryId: jeansCategory.id,
      },
    });

    const shoes1 = await prisma.product.create({
      data: {
        name: 'White Sneakers',
        description: 'Classic white sneakers for everyday wear',
        price: 99.99,
        stock: 60,
        images: ['/images/p31-1.jpg'],
        categoryId: shoesCategory.id,
      },
    });

    const shoes2 = await prisma.product.create({
      data: {
        name: 'Black Leather Boots',
        description: 'Stylish black leather boots for a premium look',
        price: 149.99,
        stock: 30,
        images: ['/images/p31-2.jpg'],
        categoryId: shoesCategory.id,
      },
    });

    console.log('Created users:', { adminUser, regularUser });
    console.log('Created categories:', { tshirtCategory, jeansCategory, shoesCategory });
    console.log('Created products:', { tshirt1, tshirt2, jeans1, jeans2, shoes1, shoes2 });
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 