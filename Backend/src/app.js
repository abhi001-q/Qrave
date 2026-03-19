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
app.use(cors({ origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174'] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ── Global error handler ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
