const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');

const authRoutes    = require('./routes/auth.routes');
const menuRoutes    = require('./routes/menu.routes');
const categoryRoutes= require('./routes/category.routes');
const orderRoutes   = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const bookingRoutes = require('./routes/booking.routes');
const billRoutes    = require('./routes/bill.routes');
const tableRoutes   = require('./routes/table.routes');
const managerRoutes = require('./routes/manager.routes');
const userRoutes    = require('./routes/user.routes');
const adminRoutes   = require('./routes/admin.routes');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://qrave-web.vercel.app',
  'https://qrave-mobile.vercel.app'
];

if (process.env.CLIENT_URL) {
  const envOrigins = process.env.CLIENT_URL.split(',').map(url => url.trim());
  allowedOrigins.push(...envOrigins);
}

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    // Check for exact match or match from CLIENT_URL
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Error out if not allowed
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads (bill PDFs)
app.use('/uploads', express.static('uploads'));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/menu',     menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/bills',    billRoutes);
app.use('/api/tables',   tableRoutes);
app.use('/api/manager',  managerRoutes);
app.use('/api/user',     userRoutes);
app.use('/api/admin',    adminRoutes);

// ── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'OK', project: 'Qrave' }));

// ── 404 handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    hint: 'Ensure your VITE_API_URL in Vercel ends with /api (e.g., https://your-backend.onrender.com/api)'
  });
});

// ── Global error handler ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
