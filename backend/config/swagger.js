const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Joel. Artisan Gastronomy API',
      version: '1.0.0',
      description: 'API documentation for Joel. Artisan Gastronomy food delivery system',
      contact: {
        name: 'AMOH JOEL',
        email: 'joelamoh65@gmail.com',
        phone: '+237673184599'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      },
      {
        url: 'https://api.joelgastronomy.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            isAdmin: { type: 'boolean' }
          }
        },
        Food: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            category: { type: 'string' },
            image: { type: 'string' },
            stock: { type: 'number' },
            lowStockThreshold: { type: 'number' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            items: { type: 'array' },
            amount: { type: 'number' },
            status: { type: 'string', enum: ['Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled'] },
            date: { type: 'string', format: 'date-time' }
          }
        },
        Coupon: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            code: { type: 'string' },
            discountType: { type: 'string', enum: ['percentage', 'fixed'] },
            discountValue: { type: 'number' },
            minOrderAmount: { type: 'number' },
            usageLimit: { type: 'number' },
            usageCount: { type: 'number' },
            isActive: { type: 'boolean' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
