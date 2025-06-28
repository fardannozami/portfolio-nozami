import React, { useState } from 'react';
import { Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import BlogPost from './BlogPost';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);

  const blogPosts: BlogPostData[] = [
    {
      id: '1',
      title: 'Building Scalable APIs with Node.js and Express',
      excerpt: 'Learn how to create robust and scalable REST APIs using Node.js, Express.js, and best practices for production applications.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Node.js', 'Express.js', 'API', 'Backend'],
      author: 'Fardan Nozami Ajitama',
      content: `
# Building Scalable APIs with Node.js and Express

Creating scalable APIs is crucial for modern web applications. In this post, we'll explore best practices for building robust REST APIs using Node.js and Express.js.

## Setting Up the Project

First, let's initialize a new Node.js project:

\`\`\`bash
mkdir scalable-api
cd scalable-api
npm init -y
npm install express cors helmet morgan compression
npm install -D nodemon @types/node typescript
\`\`\`

## Basic Server Setup

Here's how to set up a basic Express server with essential middleware:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Compress responses
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Database Connection with Connection Pooling

For production applications, proper database connection management is essential:

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database query helper
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
};

module.exports = { query };
\`\`\`

## Error Handling Middleware

Implement comprehensive error handling:

\`\`\`javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
\`\`\`

## Rate Limiting

Implement rate limiting to protect your API:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`

## Conclusion

Building scalable APIs requires careful consideration of architecture, error handling, security, and performance. The patterns shown here provide a solid foundation for production-ready applications.

Key takeaways:
- Use proper middleware for security and performance
- Implement comprehensive error handling
- Use connection pooling for database operations
- Add rate limiting to prevent abuse
- Always validate input data
- Use environment variables for configuration
      `
    },
    {
      id: '2',
      title: 'Database Optimization Techniques for High-Performance Applications',
      excerpt: 'Discover advanced database optimization strategies including indexing, query optimization, and connection pooling for better performance.',
      date: '2024-01-10',
      readTime: '12 min read',
      tags: ['Database', 'PostgreSQL', 'Performance', 'Optimization'],
      author: 'Fardan Nozami Ajitama',
      content: `
# Database Optimization Techniques for High-Performance Applications

Database performance is critical for application scalability. Let's explore advanced optimization techniques that can dramatically improve your application's performance.

## Understanding Database Indexes

Indexes are crucial for query performance. Here's how to create effective indexes:

\`\`\`sql
-- Create a B-tree index for frequent WHERE clauses
CREATE INDEX idx_users_email ON users(email);

-- Composite index for multiple column queries
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index for conditional queries
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Unique index for data integrity
CREATE UNIQUE INDEX idx_users_username ON users(username);
\`\`\`

## Query Optimization Strategies

### Using EXPLAIN ANALYZE

Always analyze your queries to understand their execution plans:

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 10;
\`\`\`

### Optimized Query Examples

\`\`\`sql
-- Bad: Using SELECT *
SELECT * FROM users WHERE email = 'user@example.com';

-- Good: Select only needed columns
SELECT id, name, email FROM users WHERE email = 'user@example.com';

-- Bad: Using LIKE with leading wildcard
SELECT * FROM products WHERE name LIKE '%phone%';

-- Good: Using full-text search
SELECT * FROM products WHERE to_tsvector('english', name) @@ to_tsquery('phone');
\`\`\`

## Connection Pooling Implementation

Proper connection pooling is essential for performance:

\`\`\`javascript
const { Pool } = require('pg');

class DatabasePool {
  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      
      // Pool configuration
      max: 20, // Maximum number of connections
      min: 5,  // Minimum number of connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      
      // Connection validation
      allowExitOnIdle: true
    });

    // Handle pool errors
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async query(text, params) {
    const client = await this.pool.connect();
    try {
      const start = Date.now();
      const result = await client.query(text, params);
      const duration = Date.now() - start;
      
      console.log('Query executed', {
        text: text.substring(0, 100),
        duration,
        rows: result.rowCount
      });
      
      return result;
    } finally {
      client.release();
    }
  }

  async transaction(callback) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = new DatabasePool();
\`\`\`

## Caching Strategies

Implement Redis caching for frequently accessed data:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

class CacheService {
  async get(key) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, data, ttl = 3600) {
    try {
      await client.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key) {
    try {
      await client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async invalidatePattern(pattern) {
    try {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}

module.exports = new CacheService();
\`\`\`

## Database Monitoring

Monitor your database performance with custom metrics:

\`\`\`javascript
class DatabaseMonitor {
  constructor(pool) {
    this.pool = pool;
    this.metrics = {
      totalQueries: 0,
      slowQueries: 0,
      errors: 0,
      avgResponseTime: 0
    };
  }

  async executeQuery(text, params) {
    const start = Date.now();
    this.metrics.totalQueries++;

    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      
      // Update metrics
      this.updateResponseTime(duration);
      
      if (duration > 1000) { // Slow query threshold
        this.metrics.slowQueries++;
        console.warn('Slow query detected:', {
          query: text.substring(0, 100),
          duration,
          params
        });
      }

      return result;
    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }

  updateResponseTime(duration) {
    this.metrics.avgResponseTime = 
      (this.metrics.avgResponseTime + duration) / 2;
  }

  getMetrics() {
    return {
      ...this.metrics,
      slowQueryPercentage: 
        (this.metrics.slowQueries / this.metrics.totalQueries) * 100,
      errorRate: 
        (this.metrics.errors / this.metrics.totalQueries) * 100
    };
  }
}
\`\`\`

## Conclusion

Database optimization is an ongoing process that requires monitoring, analysis, and continuous improvement. The techniques covered here will help you build high-performance applications that can scale effectively.

Remember to:
- Always measure before optimizing
- Use appropriate indexes
- Implement connection pooling
- Cache frequently accessed data
- Monitor performance metrics
- Regular maintenance and updates
      `
    },
    {
      id: '3',
      title: 'Implementing Microservices Architecture with Docker',
      excerpt: 'A comprehensive guide to designing and implementing microservices architecture using Docker containers and orchestration tools.',
      date: '2024-01-05',
      readTime: '15 min read',
      tags: ['Microservices', 'Docker', 'Architecture', 'DevOps'],
      author: 'Fardan Nozami Ajitama',
      content: `
# Implementing Microservices Architecture with Docker

Microservices architecture has become the standard for building scalable, maintainable applications. Let's explore how to implement this architecture using Docker containers.

## Understanding Microservices

Microservices break down applications into small, independent services that communicate over well-defined APIs.

### Benefits:
- **Scalability**: Scale individual services based on demand
- **Technology Diversity**: Use different technologies for different services
- **Fault Isolation**: Failures in one service don't affect others
- **Team Independence**: Teams can work independently on different services

## Service Design Principles

### Single Responsibility Principle

Each service should have one reason to change:

\`\`\`javascript
// User Service - handles user management
class UserService {
  async createUser(userData) {
    // Validate user data
    const user = await this.userRepository.create(userData);
    
    // Publish user created event
    await this.eventBus.publish('user.created', {
      userId: user.id,
      email: user.email
    });
    
    return user;
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }
}

// Order Service - handles order management
class OrderService {
  async createOrder(orderData) {
    // Validate order
    const order = await this.orderRepository.create(orderData);
    
    // Publish order created event
    await this.eventBus.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      total: order.total
    });
    
    return order;
  }
}
\`\`\`

## Docker Configuration

### Dockerfile for Node.js Service

\`\`\`dockerfile
# Multi-stage build for production optimization
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
\`\`\`

### Docker Compose for Development

\`\`\`yaml
version: '3.8'

services:
  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
    depends_on:
      - user-service
      - order-service
    networks:
      - microservices

  # User Service
  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DB_HOST=user-db
      - DB_NAME=users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - user-db
      - redis
    networks:
      - microservices

  # Order Service
  order-service:
    build: ./order-service
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=development
      - DB_HOST=order-db
      - DB_NAME=orders
      - REDIS_URL=redis://redis:6379
    depends_on:
      - order-db
      - redis
    networks:
      - microservices

  # Databases
  user-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=users
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - user_data:/var/lib/postgresql/data
    networks:
      - microservices

  order-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=orders
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - order_data:/var/lib/postgresql/data
    networks:
      - microservices

  # Redis for caching and session storage
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - microservices

  # Message Queue
  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - microservices

volumes:
  user_data:
  order_data:
  redis_data:
  rabbitmq_data:

networks:
  microservices:
    driver: bridge
\`\`\`

## Service Communication

### API Gateway Implementation

\`\`\`javascript
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(express.json());

// Service discovery
const services = {
  user: process.env.USER_SERVICE_URL || 'http://user-service:3001',
  order: process.env.ORDER_SERVICE_URL || 'http://order-service:3002'
};

// Proxy middleware with circuit breaker
const createProxy = (target, pathRewrite) => {
  return httpProxy({
    target,
    changeOrigin: true,
    pathRewrite,
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(503).json({
        error: 'Service temporarily unavailable'
      });
    },
    onProxyReq: (proxyReq, req, res) => {
      // Add correlation ID for tracing
      proxyReq.setHeader('X-Correlation-ID', 
        req.headers['x-correlation-id'] || generateCorrelationId());
    }
  });
};

// Route definitions
app.use('/api/users', createProxy(services.user, {
  '^/api/users': '/users'
}));

app.use('/api/orders', createProxy(services.order, {
  '^/api/orders': '/orders'
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

function generateCorrelationId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`API Gateway running on port \${PORT}\`);
});
\`\`\`

### Event-Driven Communication

\`\`\`javascript
const amqp = require('amqplib');

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      
      // Create exchange for events
      await this.channel.assertExchange('events', 'topic', {
        durable: true
      });
      
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async publish(eventType, data) {
    try {
      const message = JSON.stringify({
        eventType,
        data,
        timestamp: new Date().toISOString(),
        id: this.generateEventId()
      });

      await this.channel.publish(
        'events',
        eventType,
        Buffer.from(message),
        { persistent: true }
      );

      console.log(\`Published event: \${eventType}\`);
    } catch (error) {
      console.error('Failed to publish event:', error);
      throw error;
    }
  }

  async subscribe(eventPattern, handler) {
    try {
      const queue = await this.channel.assertQueue('', {
        exclusive: true
      });

      await this.channel.bindQueue(
        queue.queue,
        'events',
        eventPattern
      );

      await this.channel.consume(queue.queue, async (msg) => {
        if (msg) {
          try {
            const event = JSON.parse(msg.content.toString());
            await handler(event);
            this.channel.ack(msg);
          } catch (error) {
            console.error('Error processing event:', error);
            this.channel.nack(msg, false, false);
          }
        }
      });

      console.log(\`Subscribed to events: \${eventPattern}\`);
    } catch (error) {
      console.error('Failed to subscribe to events:', error);
      throw error;
    }
  }

  generateEventId() {
    return \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }
}

module.exports = EventBus;
\`\`\`

## Monitoring and Logging

### Centralized Logging with Winston

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME || 'unknown-service'
  },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      correlationId: req.headers['x-correlation-id']
    });
  });
  
  next();
};

module.exports = { logger, requestLogger };
\`\`\`

## Conclusion

Microservices architecture with Docker provides a robust foundation for scalable applications. Key considerations include:

- **Service boundaries**: Design services around business capabilities
- **Communication**: Use both synchronous and asynchronous patterns
- **Data management**: Each service should own its data
- **Monitoring**: Implement comprehensive logging and monitoring
- **Security**: Secure service-to-service communication
- **Testing**: Implement contract testing between services

The patterns shown here provide a solid foundation for building production-ready microservices.
      `
    }
  ];

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Latest <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Blog Posts</span>
          </h2>
          
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <ChevronRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-gray-400 text-sm">
                      by {post.author}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;