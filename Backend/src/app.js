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

// ── CORS & Security ───────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://qrave-web.vercel.app',
  'https://qrave-mobile.vercel.app'
];

if (process.env.CLIENT_URL) {
  const envOrigins = process.env.CLIENT_URL.split(',').map(url => url.trim());
  allowedOrigins.push(...envOrigins.filter(url => url));
}

// Global CORS - Extremely permissive for debugging
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health & Diagnostic Checks
app.get('/ping', async (req, res) => {
  try {
    const pool = require('./config/db');
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected', time: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: err.message });
  }
});

app.get('/api/test-email', async (req, res) => {
  try {
    const sendEmail = require('./utils/sendEmail');
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Qrave Diagnostic Test',
      text: 'If you see this, your email service is working perfectly!'
    });
    res.json({ status: 'success', message: `Test email sent to ${process.env.EMAIL_USER}` });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      message: err.message,
      code: err.code,
      hint: 'Verify EMAIL_PASS (no spaces) and EMAIL_USER on Render'
    });
  }
});

// Static uploads (bill PDFs)
app.use('/uploads', express.static('uploads'));

// ── Routes ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '🚀 Qrave Backend API is running!',
    docs: 'https://github.com/abhi001-q/Qrave',
    hint: 'Use /api prefix for API calls (e.g., /api/menu)'
  });
});

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
