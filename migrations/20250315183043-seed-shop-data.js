'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Get a seller user ID (assuming there's at least one user with role 'seller')
    const sellerUsers = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE role = 'seller' LIMIT 1",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    let sellerId;
    if (sellerUsers.length === 0) {
      const bcrypt = require('bcrypt');

      const hashedPassword = await bcrypt.hash('seller123', 10);

      const seller = await queryInterface.bulkInsert('users', [{
        firstName: 'Seller',
        lastName: 'User',
        email: 'seller@example.com',
        password: hashedPassword,
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true });

      sellerId = seller.id;
    } else {
      sellerId = sellerUsers[0].id;
    }

    const now = new Date();
    const shops = [
      {
        name: 'Tech Gadgets',
        slug: 'tech-gadgets',
        description: 'The latest technology gadgets and accessories',
        logoUrl: 'https://example.com/logos/tech-gadgets.png',
        contactEmail: 'contact@techgadgets.com',
        isActive: true,
        ownerId: sellerId,
        approvalStatus: 'approved',
        approvedAt: now,
        isFeatured: true,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Home Essentials',
        slug: 'home-essentials',
        description: 'Everything you need for your home',
        logoUrl: 'https://example.com/logos/home-essentials.png',
        contactEmail: 'info@homeessentials.com',
        isActive: true,
        ownerId: sellerId,
        approvalStatus: 'approved',
        approvedAt: now,
        isFeatured: false,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('shops', shops);

    // Get IDs of the gadget shops
    const techShop = await queryInterface.sequelize.query(
      "SELECT id FROM shops WHERE slug='tech-gadgets'",
      {type: queryInterface.sequelize.QueryTypes.SELECT}
    );

    // Get IDs of the home shops
    const homeShop = await queryInterface.sequelize.query(
      "SELECT id FROM shops WHERE slug='home-essentials'",
      {type: queryInterface.sequelize.QueryTypes.SELECT}
    );

    if (techShop.length > 0 && homeShop.length > 0) {
      const techShopId = techShop[0].id;
      const homeShopId = homeShop[0].id;

      // Get electronic category ID
      const electronicCategory = await queryInterface.sequelize.query(
        "SELECT id FROM categories WHERE name = 'Electronics'",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      // Get home category ID
      const homeCategory = await queryInterface.sequelize.query(
        "SELECT id FROM categories WHERE name = 'Home & Kitchen'",
        { type: queryInterface.sequelize.QueryTypes.SELECT}
      );

      // Create sample products for each shop
      if (electronicCategory.length > 0) {
        const electronicCategoryId = electronicCategory[0].id;

        // Create tech products
        const techProducts = [
          {
            name: 'Wireless Earbuds',
            description: 'High-quality wireless earbuds with noise cancellation',
            price: 79.99,
            stock: 50,
            imageUrl: 'https://example.com/images/wireless-earbuds.jpg',
            sellerId: sellerId,
            shopId: techShopId,
            createdAt: now,
            updatedAt: now
          },
          {
            name: 'Smart Watch',
            description: 'Track your fitness and stay connected',
            price: 149.99,
            stock: 30,
            imageUrl: 'https://example.com/images/smart-watch.jpg',
            sellerId: sellerId,
            shopId: techShopId,
            createdAt: now,
            updatedAt: now
          }
        ];

        await queryInterface.bulkInsert('products', techProducts);

        const techProductResults = await queryInterface.sequelize.query(
          `SELECT id FROM products WHERE "shopId" = ${techShopId}`,
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        if (techProductResults.length > 0) {
          const productCategories = techProductResults.map(product => ({
            productId: product.id,
            categoryId: electronicCategoryId,
            createdAt: now,
            updatedAt: now
          }));
          
          await queryInterface.bulkInsert('product_categories', productCategories);
        }
      }

      // Create home products
      if (homeCategory.length > 0) {
        const homeCategoryId = homeCategory[0].id;

        const homeProducts = [
          {
            name: 'Kitchen Blender',
            description: 'Powerful blender for all your kitchen needs',
            price: 59.99,
            stock: 40,
            imageUrl: 'https://example.com/images/kitchen-blender.jpg',
            sellerId: sellerId,
            shopId: homeShopId,
            createdAt: now,
            updatedAt: now
          },
          {
            name: 'Bedding Set',
            description: 'Comfortable cotton bedding set',
            price: 89.99,
            stock: 25,
            imageUrl: 'https://example.com/images/bedding-set.jpg',
            sellerId: sellerId,
            shopId: homeShopId,
            createdAt: now,
            updatedAt: now
          }
        ];

        await queryInterface.bulkInsert('products', homeProducts);

        const homeProductResults = await queryInterface.sequelize.query(
          `SELECT id FROM products WHERE "shopId" = ${homeShopId}`,
          {type: queryInterface.sequelize.QueryTypes.SELECT}
        );

        if (homeProductResults.length > 0) {
          const productCategories = homeProductResults.map(product => ({
            productId: product.id,
            categoryId: homeCategoryId,
            createdAt: now,
            updatedAt: now
          }));

          await queryInterface.bulkInsert('product_categories', productCategories);
        }
      }

      const shopMetrics = [
        {
          shopId: techShopId,
          totalViews: 120,
          totalSales: 8,
          totalOrders: 5,
          totalRevenue: 439.95,
          productCount: 2,
          averageRating: 4.7,
          reviewCount: 3,
          lastUpdated: now,
          createdAt: now,
          updatedAt: now
        },
        {
          shopId: homeShopId,
          totalViews: 85,
          totalSales: 6,
          totalOrders: 3,
          totalRevenue: 269.97,
          productCount: 2,
          averageRating: 4.3,
          reviewCount: 2,
          lastUpdated: now,
          createdAt: now,
          updatedAt: now
        }
      ];

      await queryInterface.bulkInsert('shop_metrics', shopMetrics);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE products SET shopId = NULL"
    );
    
    // Delete shop metrics
    await queryInterface.bulkDelete('shop_metrics', null, {});
    
    // Delete shops
    await queryInterface.bulkDelete('shops', null, {});
  }
};