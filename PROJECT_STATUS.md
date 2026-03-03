# Qrave — Project Status Report

> **Generated:** March 3, 2026  
> **Project:** Qrave — Restaurant Management System  
> **Stack:** React 19 + Tailwind CSS v4 + Vite 7 (Frontend) | Express 5 + MySQL2 + JWT (Backend)

---

## Table of Contents

1. [Overall Progress Summary](#1-overall-progress-summary)
2. [Completed Work](#2-completed-work)
3. [Remaining Tasks](#3-remaining-tasks)
4. [Features to Be Added](#4-features-to-be-added)
5. [Improvements Needed](#5-improvements-needed)
6. [Bugs & Issues](#6-bugs--issues)
7. [File-by-File Status](#7-file-by-file-status)

---

## 1. Overall Progress Summary

| Area                    | Done | Total | Completion |
| ----------------------- | ---- | ----- | ---------- |
| **Backend — Infra**     | 7    | 7     | 100%       |
| **Backend — Business**  | 0    | 49    | 0%         |
| **Frontend — Infra**    | 14   | 14    | 100%       |
| **Frontend — UI/Pages** | 0    | 38    | 0%         |
| **Frontend — Services** | 5    | 10    | 50%        |
| **Database**            | 0    | 11    | 0%         |
| **Testing**             | 0    | —     | 0%         |
| **DevOps**              | 0    | —     | 0%         |
| **OVERALL**             | ~26  | ~130  | **~20%**   |

> **Status: The project has a well-structured skeleton but is non-functional.**  
> Both the backend and frontend crash on startup because empty files are imported as modules.

---

## 2. Completed Work

### 2.1 Backend — Completed ✅

| #   | File / Area                      | Description                                                                                                                                      |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `server.js`                      | Express server entry point, listens on PORT 5000                                                                                                 |
| 2   | `src/app.js`                     | Full middleware stack (Helmet, CORS, Morgan, JSON parser), all 11 route groups registered, health check endpoint `/health`, global error handler |
| 3   | `src/config/db.js`               | MySQL2 connection pool (10 connections, env-configured)                                                                                          |
| 4   | `src/middleware/authenticate.js` | JWT Bearer token verification, attaches decoded payload to `req.user`                                                                            |
| 5   | `src/middleware/authorize.js`    | Role-based access guard, accepts variadic roles, checks `req.user.role`                                                                          |
| 6   | `src/middleware/errorHandler.js` | Global Express error handler using `sendError` utility                                                                                           |
| 7   | `src/utils/apiResponse.js`       | `sendSuccess(res, status, data, message)` and `sendError(res, status, message)` response helpers                                                 |
| 8   | `src/constants/orderStatus.js`   | `PENDING`, `PREPARING`, `READY`, `DELIVERED`, `CANCELLED` (frozen object)                                                                        |
| 9   | `src/constants/roles.js`         | `USER`, `MANAGER`, `ADMIN` (frozen object)                                                                                                       |
| 10  | `package.json`                   | All dependencies declared and appropriate                                                                                                        |
| 11  | `.env.example`                   | Template with PORT, DB, JWT config variables                                                                                                     |
| 12  | `.gitignore` (root)              | Properly ignores `node_modules/`, `.env`, `uploads/bills/*.pdf`, logs, dist                                                                      |

### 2.2 Frontend — Completed ✅

| #   | File / Area                     | Description                                                                                |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | `package.json`                  | React 19, React Router 7, Axios, React Toastify, Tailwind CSS v4                           |
| 2   | `vite.config.js`                | React + Tailwind CSS v4 Vite plugin                                                        |
| 3   | `index.html`                    | Standard Vite entry with viewport meta tag                                                 |
| 4   | `eslint.config.js`              | Flat config with react-hooks + react-refresh plugins                                       |
| 5   | `src/main.jsx`                  | StrictMode → renders `<App />`                                                             |
| 6   | `src/App.jsx`                   | BrowserRouter → AuthProvider → CartProvider → AppRoutes + ToastContainer                   |
| 7   | `src/index.css`                 | `@import "tailwindcss"`, dark body (#0f0f0f), Inter font                                   |
| 8   | `src/context/AuthContext.jsx`   | `login()`, `logout()`, session restore from `localStorage` (`qrave_user` + `qrave_token`)  |
| 9   | `src/context/CartContext.jsx`   | `addItem()`, `removeItem()`, `updateQty()`, `clearCart()`, computed `total`                |
| 10  | `src/hooks/useAuth.js`          | Context consumer with null guard                                                           |
| 11  | `src/hooks/useCart.js`          | Context consumer with null guard                                                           |
| 12  | `src/routes/AppRoutes.jsx`      | Full route tree — Public (6), User (6), Manager (7), Admin (4) routes with layout wrappers |
| 13  | `src/routes/ProtectedRoute.jsx` | Redirects unauthenticated to `/login`, shows loading state                                 |
| 14  | `src/routes/RoleRoute.jsx`      | Role-based access guard with `roles` prop                                                  |
| 15  | `src/services/api.js`           | Axios instance with JWT interceptor and 401 auto-redirect                                  |
| 16  | `src/services/authService.js`   | `login`, `register`, `logout` API calls                                                    |
| 17  | `src/services/menuService.js`   | Full CRUD: `getAll`, `getById`, `create`, `update`, `remove`                               |
| 18  | `src/services/orderService.js`  | `create`, `getAll`, `getById`, `updateStatus`                                              |
| 19  | `src/services/billService.js`   | `generate`, `download`, `getByOrder`                                                       |

---

## 3. Remaining Tasks

### 3.1 Backend — Critical Path (Priority Order)

| #   | Task                                                                   | Files Involved                                                       | Priority |
| --- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- |
| 1   | **Write all 9 database migrations**                                    | `src/database/migrations/001–009_*.js`                               | 🔴 P0    |
| 2   | **Create a migration runner script**                                   | New: `src/database/migrate.js` or use knex                           | 🔴 P0    |
| 3   | **Implement all 9 models** (SQL query wrappers)                        | `src/models/*.model.js` (9 files)                                    | 🔴 P0    |
| 4   | **Implement auth service & controller** (register, login, JWT signing) | `src/services/auth.service.js`, `src/controllers/auth.controller.js` | 🔴 P0    |
| 5   | **Implement auth routes** (POST /register, POST /login)                | `src/routes/auth.routes.js`                                          | 🔴 P0    |
| 6   | **Implement all remaining routes** (10 files)                          | `src/routes/*.routes.js`                                             | 🔴 P0    |
| 7   | **Implement all remaining controllers** (8 files)                      | `src/controllers/*.controller.js`                                    | 🔴 P0    |
| 8   | **Implement all remaining services** (7 files)                         | `src/services/*.service.js`                                          | 🔴 P0    |
| 9   | **Implement Joi validation schemas**                                   | `src/middleware/validate.js` + new schema files                      | 🟡 P1    |
| 10  | **Implement rate limiter**                                             | `src/middleware/rateLimiter.js`                                      | 🟡 P1    |
| 11  | **Write seed data**                                                    | `src/database/seeds/users.seed.js`, `products.seed.js`               | 🟡 P1    |
| 12  | **Implement PDF bill generation**                                      | `src/utils/generatePDF.js`                                           | 🟡 P1    |
| 13  | **Implement email sending**                                            | `src/utils/sendEmail.js`                                             | 🟡 P2    |
| 14  | **Implement logger**                                                   | `src/utils/logger.js`                                                | 🟡 P2    |
| 15  | **Implement env validation**                                           | `src/config/env.js`                                                  | 🟡 P2    |

### 3.2 Frontend — Critical Path (Priority Order)

| #   | Task                                        | Files Involved                                                                                                                | Priority |
| --- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | **Implement all 4 layout components**       | `src/layouts/*.jsx` (4 files) — App cannot render without these                                                               | 🔴 P0    |
| 2   | **Implement common components**             | `Navbar.jsx`, `Footer.jsx`, `Spinner.jsx`, `Modal.jsx`, `Button.jsx`                                                          | 🔴 P0    |
| 3   | **Implement Login & Register pages**        | `src/pages/auth/Login.jsx`, `Register.jsx`                                                                                    | 🔴 P0    |
| 4   | **Implement Home & Menu pages**             | `src/pages/public/Home.jsx`, `Menu.jsx`                                                                                       | 🔴 P0    |
| 5   | **Implement menu components**               | `MenuCard.jsx`, `CategoryTabs.jsx`                                                                                            | 🔴 P0    |
| 6   | **Implement cart components**               | `CartDrawer.jsx`, `CartItem.jsx`, `GuestCart.jsx`                                                                             | 🔴 P0    |
| 7   | **Implement Checkout page**                 | `src/pages/user/Checkout.jsx`                                                                                                 | 🔴 P0    |
| 8   | **Implement User dashboard & order pages**  | `UserDashboard.jsx`, `OrderHistory.jsx`, `OrderDetail.jsx`, `Profile.jsx`                                                     | 🟡 P1    |
| 9   | **Implement Table Booking page**            | `src/pages/user/TableBooking.jsx`                                                                                             | 🟡 P1    |
| 10  | **Implement Manager pages** (7 files)       | `ManagerDashboard.jsx`, `Products.jsx`, `Categories.jsx`, `Tables.jsx`, `Orders.jsx`, `BillSection.jsx`, `ManagerProfile.jsx` | 🟡 P1    |
| 11  | **Implement Admin pages** (4 files)         | `AdminDashboard.jsx`, `UserManagement.jsx`, `ManagerApproval.jsx`, `SystemStatus.jsx`                                         | 🟡 P1    |
| 12  | **Implement BillPreview component**         | `src/components/bill/BillPreview.jsx`                                                                                         | 🟡 P1    |
| 13  | **Implement remaining services**            | `adminService.js`, `paymentService.js`, `bookingService.js`                                                                   | 🟡 P1    |
| 14  | **Add missing services**                    | `categoryService.js`, `tableService.js` (do not exist yet)                                                                    | 🟡 P1    |
| 15  | **Implement useOrders hook**                | `src/hooks/useOrders.js`                                                                                                      | 🟡 P2    |
| 16  | **Implement constants**                     | `orderStatus.js`, `paymentMethods.js`, `roles.js`                                                                             | 🟡 P2    |
| 17  | **Implement utilities**                     | `downloadPDF.js`, `formatCurrency.js`, `roleHelpers.js`                                                                       | 🟡 P2    |
| 18  | **Implement CSS variables / design tokens** | `src/styles/variables.css`                                                                                                    | 🟡 P2    |
| 19  | **Implement ForgotPassword page**           | `src/pages/auth/ForgotPassword.jsx`                                                                                           | 🟢 P3    |

---

## 4. Features to Be Added

These features are expected for a production restaurant management system but have **no files or structure** yet.

### 4.1 Must-Have Features

| #   | Feature                           | Details                                                                                                                                     |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Image Upload for Products**     | Need Multer middleware (backend) + multipart form support (frontend). Currently `menuService.create` sends JSON, which won't handle images. |
| 2   | **Search & Filtering**            | Product search by name, category filtering, price range — no search component or endpoint exists.                                           |
| 3   | **Pagination**                    | No pagination on any list endpoint. Will be needed for orders, products, users.                                                             |
| 4   | **Password Reset Flow**           | Backend: reset token generation + email. Frontend: ForgotPassword page exists but is empty. `sendEmail.js` is empty.                        |
| 5   | **Refresh Token Rotation**        | Only access tokens exist. No refresh token mechanism for seamless session renewal.                                                          |
| 6   | **Error/404 Page**                | No 404 or generic error page exists in the frontend.                                                                                        |
| 7   | **Dashboard Analytics**           | Manager/Admin dashboards need charts (revenue, order counts, popular items). No charting library installed.                                 |
| 8   | **QR Code Generation for Tables** | Tables should have QR codes for customer self-ordering. No QR library installed.                                                            |

### 4.2 Nice-to-Have Features

| #   | Feature                           | Details                                                                    |
| --- | --------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Real-time Order Updates**       | WebSocket/Socket.io for live kitchen → waitstaff → customer status updates |
| 2   | **Push Notifications**            | Order ready alerts, booking confirmations                                  |
| 3   | **Dark/Light Mode Toggle**        | Dark theme is hardcoded; no theme switcher                                 |
| 4   | **Multi-language Support (i18n)** | No internationalization framework                                          |
| 5   | **Audit Logging**                 | Track who changed what and when (admin visibility)                         |
| 6   | **Soft Deletes**                  | No `deleted_at` columns — hard deletes lose data                           |
| 7   | **Export Reports** (CSV/Excel)    | Manager/admin reporting with exportable data                               |
| 8   | **Customer Reviews/Ratings**      | No review system for menu items                                            |
| 9   | **Inventory Management**          | Stock tracking for products                                                |
| 10  | **Kitchen Display System (KDS)**  | Dedicated view for kitchen staff to see incoming orders                    |
| 11  | **Print Support**                 | Receipt printing for POS terminals                                         |

---

## 5. Improvements Needed

### 5.1 Backend Improvements

| #   | Area                         | Current State                                     | Recommended Improvement                                                         |
| --- | ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | **Migration Runner**         | No mechanism to run migration files               | Add a custom runner or use Knex.js for migrations                               |
| 2   | **Model Pattern**            | Undefined — files are empty                       | Decide on class-based models or functional SQL wrappers. Document the pattern.  |
| 3   | **Validation Layer**         | Joi installed but `validate.js` is empty          | Create Joi schemas for every endpoint and wire through `validate.js` middleware |
| 4   | **Rate Limiting**            | express-rate-limit installed but unused           | Apply to auth endpoints (login/register) to prevent brute force                 |
| 5   | **Logging**                  | Only `console.error` in error handler             | Implement Winston or Pino logger with log levels and file rotation              |
| 6   | **Env Validation**           | `.env` loaded but never validated                 | Use Joi or Zod to validate all required env vars at startup                     |
| 7   | **Graceful Shutdown**        | `server.js` doesn't handle `SIGTERM`/`SIGINT`     | Add signal handlers to close DB pool and stop accepting connections             |
| 8   | **CORS Config**              | Single hardcoded origin                           | Support array of origins or regex for multiple environments                     |
| 9   | **API Documentation**        | None                                              | Add Swagger/OpenAPI with auto-generated docs                                    |
| 10  | **ESLint Config**            | None for backend                                  | Add ESLint + Prettier for code consistency                                      |
| 11  | **Nodemon**                  | Used in `dev` script but not in `devDependencies` | Add `nodemon` to devDependencies                                                |
| 12  | **Request ID Tracking**      | None                                              | Add correlation IDs (`x-request-id`) for debugging                              |
| 13  | **Database Connection Test** | Pool created but never tested on startup          | Add a `SELECT 1` ping on server boot to fail fast                               |

### 5.2 Frontend Improvements

| #   | Area                  | Current State                                | Recommended Improvement                                                           |
| --- | --------------------- | -------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | **Cart Persistence**  | Uses `useState([])` — lost on refresh        | Add `localStorage` sync (like AuthContext already does)                           |
| 2   | **Error Boundaries**  | None                                         | Add React ErrorBoundary at layout level                                           |
| 3   | **Data Fetching**     | Manual `useEffect` + `useState` pattern      | Consider TanStack Query (React Query) for caching, loading states, error handling |
| 4   | **Form Handling**     | No library                                   | Add react-hook-form + Zod for validation                                          |
| 5   | **TypeScript**        | `@types/react` installed but no `.tsx` files | Either adopt TypeScript or remove the type packages                               |
| 6   | **README**            | Default Vite boilerplate                     | Write a real project README with setup instructions, env vars, architecture       |
| 7   | **App.css**           | Vite boilerplate (unused)                    | Delete it                                                                         |
| 8   | **Image Assets**      | Only `react.svg` (Vite default)              | Add logo, food images, icons, illustrations                                       |
| 9   | **Accessibility**     | Zero ARIA, no keyboard navigation            | Add semantic HTML, ARIA labels, focus management                                  |
| 10  | **Responsive Design** | Only viewport meta tag                       | Design mobile-first with Tailwind breakpoints                                     |
| 11  | **Loading States**    | `Spinner.jsx` exists but is empty            | Implement loading skeletons and spinners                                          |
| 12  | **Toast Usage**       | Configured in App.jsx but never called       | Wire toast notifications into services/pages                                      |
| 13  | **Menu Image Upload** | `menuService.create` sends JSON              | Switch to `FormData` + `multipart/form-data` for image support                    |

---

## 6. Bugs & Issues

### 6.1 Critical — App Cannot Start 🔴

| #   | Bug                            | Location                         | Impact                                                                                                                                                                     |
| --- | ------------------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Backend crashes on startup** | `src/app.js` lines 6–16          | All 11 route files are `require()`'d but are empty (export nothing). `app.use('/api/auth', undefined)` throws a TypeError. **Server cannot start.**                        |
| 2   | **Frontend crashes on render** | `src/routes/AppRoutes.jsx`       | All 4 layout files and 24 page files are imported as default exports but are empty. React cannot render `undefined` as a component. **App shows a blank screen or error.** |
| 3   | **JWT_SECRET is undefined**    | `src/middleware/authenticate.js` | `process.env.JWT_SECRET` has no fallback and `env.js` is empty. JWT verification will fail with a cryptic error if the env var is missing.                                 |
| 4   | **No database schema**         | `src/database/migrations/*`      | All 9 migration files are empty. No tables exist. Even if the app could start, every query would fail.                                                                     |

### 6.2 Moderate — Logic Errors 🟡

| #   | Bug                                           | Location                                                   | Impact                                                                                                                                                                             |
| --- | --------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | **Cart lost on page refresh**                 | `Frontend/src/context/CartContext.jsx`                     | Cart uses `useState([])` with no persistence. Users lose their cart on any page reload. AuthContext persists to localStorage but CartContext does not.                             |
| 6   | **AuthContext JSON.parse crash**              | `Frontend/src/context/AuthContext.jsx` line ~13            | `JSON.parse(localStorage.getItem('qrave_user'))` will throw if the stored value is corrupted/invalid JSON. No try/catch.                                                           |
| 7   | **Logout doesn't call server**                | `Frontend/src/context/AuthContext.jsx` vs `authService.js` | `authService.logout()` calls `POST /auth/logout` but `AuthContext.logout()` only clears localStorage — never calls the service. Server-side session/token invalidation is skipped. |
| 8   | **Manager OrderHistory is orphaned**          | `Frontend/src/pages/manager/OrderHistory.jsx`              | File exists but no route in AppRoutes.jsx points to it. It's unreachable.                                                                                                          |
| 9   | **errorHandler imports unused `sendSuccess`** | `Backend/src/middleware/errorHandler.js` line 1            | `const { sendSuccess, sendError } = require(...)` — `sendSuccess` is destructured but never used. Minor but indicates dead code.                                                   |

### 6.3 Minor — Configuration Issues 🟢

| #   | Bug                                           | Location                | Impact                                                                                            |
| --- | --------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| 10  | **Nodemon not in devDependencies**            | `Backend/package.json`  | `npm run dev` will fail if nodemon is not globally installed. Should be added as a devDependency. |
| 11  | **App.css is dead code**                      | `Frontend/src/App.css`  | Contains Vite boilerplate CSS (logo animation) but is not imported anywhere. Should be deleted.   |
| 12  | **@types/react installed without TypeScript** | `Frontend/package.json` | Type packages serve no purpose in a plain JS project. Remove or convert to TypeScript.            |
| 13  | **README is Vite boilerplate**                | `Frontend/README.md`    | Still the default "React + Vite" template text. Should document the project.                      |
| 14  | **No backend .gitignore**                     | `Backend/` directory    | Root `.gitignore` covers basics, but no backend-specific ignore file for IDE configs, etc.        |

---

## 7. File-by-File Status

### 7.1 Backend

```
✅ = Has working code    ⬜ = Empty file (0 bytes)

Root
  ✅ server.js
  ✅ package.json
  ✅ .env.example

src/
  ✅ app.js

src/config/
  ✅ db.js
  ⬜ env.js

src/constants/
  ✅ orderStatus.js
  ✅ roles.js

src/controllers/
  ⬜ admin.controller.js
  ⬜ auth.controller.js
  ⬜ bill.controller.js
  ⬜ booking.controller.js
  ⬜ manager.controller.js
  ⬜ menu.controller.js
  ⬜ order.controller.js
  ⬜ payment.controller.js
  ⬜ user.controller.js

src/database/migrations/
  ⬜ 001_create_users.js
  ⬜ 002_create_categories.js
  ⬜ 003_create_products.js
  ⬜ 004_create_tables.js
  ⬜ 005_create_orders.js
  ⬜ 006_create_order_items.js
  ⬜ 007_create_payments.js
  ⬜ 008_create_bookings.js
  ⬜ 009_create_bills.js

src/database/seeds/
  ⬜ users.seed.js
  ⬜ products.seed.js

src/middleware/
  ✅ authenticate.js
  ✅ authorize.js
  ✅ errorHandler.js
  ⬜ rateLimiter.js
  ⬜ validate.js

src/models/
  ⬜ bill.model.js
  ⬜ booking.model.js
  ⬜ category.model.js
  ⬜ order.model.js
  ⬜ orderItem.model.js
  ⬜ payment.model.js
  ⬜ product.model.js
  ⬜ table.model.js
  ⬜ user.model.js

src/routes/
  ⬜ admin.routes.js
  ⬜ auth.routes.js
  ⬜ bill.routes.js
  ⬜ booking.routes.js
  ⬜ category.routes.js
  ⬜ manager.routes.js
  ⬜ menu.routes.js
  ⬜ order.routes.js
  ⬜ payment.routes.js
  ⬜ table.routes.js
  ⬜ user.routes.js

src/services/
  ⬜ admin.service.js
  ⬜ auth.service.js
  ⬜ bill.service.js
  ⬜ booking.service.js
  ⬜ manager.service.js
  ⬜ menu.service.js
  ⬜ order.service.js
  ⬜ payment.service.js

src/utils/
  ✅ apiResponse.js
  ⬜ generatePDF.js
  ⬜ logger.js
  ⬜ sendEmail.js
```

### 7.2 Frontend

```
✅ = Has working code    ⬜ = Empty file (0 bytes)    ❌ = Missing (should exist)

Root
  ✅ package.json
  ✅ vite.config.js
  ✅ index.html
  ✅ eslint.config.js

src/
  ✅ main.jsx
  ✅ App.jsx
  ✅ index.css
  ⬜ App.css (dead Vite boilerplate — should delete)

src/context/
  ✅ AuthContext.jsx
  ✅ CartContext.jsx

src/hooks/
  ✅ useAuth.js
  ✅ useCart.js
  ⬜ useOrders.js

src/routes/
  ✅ AppRoutes.jsx
  ✅ ProtectedRoute.jsx
  ✅ RoleRoute.jsx

src/layouts/
  ⬜ AdminLayout.jsx
  ⬜ ManagerLayout.jsx
  ⬜ PublicLayout.jsx
  ⬜ UserLayout.jsx

src/services/
  ✅ api.js
  ✅ authService.js
  ✅ menuService.js
  ✅ orderService.js
  ✅ billService.js
  ⬜ adminService.js
  ⬜ paymentService.js
  ⬜ bookingService.js
  ❌ categoryService.js (file does not exist)
  ❌ tableService.js (file does not exist)

src/pages/public/
  ⬜ Home.jsx
  ⬜ Menu.jsx
  ⬜ GuestCart.jsx

src/pages/auth/
  ⬜ Login.jsx
  ⬜ Register.jsx
  ⬜ ForgotPassword.jsx

src/pages/user/
  ⬜ UserDashboard.jsx
  ⬜ OrderHistory.jsx
  ⬜ OrderDetail.jsx
  ⬜ TableBooking.jsx
  ⬜ Profile.jsx
  ⬜ Checkout.jsx

src/pages/manager/
  ⬜ ManagerDashboard.jsx
  ⬜ Products.jsx
  ⬜ Categories.jsx
  ⬜ Tables.jsx
  ⬜ Orders.jsx
  ⬜ BillSection.jsx
  ⬜ ManagerProfile.jsx
  ⬜ OrderHistory.jsx (orphaned — no route)

src/pages/admin/
  ⬜ AdminDashboard.jsx
  ⬜ UserManagement.jsx
  ⬜ ManagerApproval.jsx
  ⬜ SystemStatus.jsx

src/components/common/
  ⬜ Navbar.jsx
  ⬜ Footer.jsx
  ⬜ Spinner.jsx
  ⬜ Modal.jsx
  ⬜ Button.jsx

src/components/menu/
  ⬜ MenuCard.jsx
  ⬜ CategoryTabs.jsx

src/components/cart/
  ⬜ CartDrawer.jsx
  ⬜ CartItem.jsx

src/components/bill/
  ⬜ BillPreview.jsx

src/constants/
  ⬜ orderStatus.js
  ⬜ paymentMethods.js
  ⬜ roles.js

src/styles/
  ⬜ variables.css

src/utils/
  ⬜ downloadPDF.js
  ⬜ formatCurrency.js (if exists)
  ⬜ roleHelpers.js (if exists)
```

---

## Recommended Implementation Order

A suggested sequence to get the app functional as fast as possible:

### Phase 1 — Make It Run (Week 1)

1. Write all 9 database migrations + create a migration runner
2. Implement User model + Auth service/controller/routes (register + login)
3. Implement all 4 frontend layouts (even as minimal shells with `<Outlet />`)
4. Implement Login + Register pages
5. Implement Navbar + Footer components
6. Now the app starts, users can register and log in

### Phase 2 — Core Customer Flow (Week 2)

7. Implement Category + Product models/services/controllers/routes
8. Implement Home page + Menu page + MenuCard + CategoryTabs
9. Implement CartDrawer + CartItem + GuestCart
10. Implement Order + OrderItem models/services/controllers/routes
11. Implement Checkout page
12. Implement Payment model/service/controller/routes
13. Now customers can browse → add to cart → order → pay

### Phase 3 — Management (Week 3)

14. Implement Table + Booking models/services/controllers/routes
15. Implement all Manager pages (CRUD products, categories, tables, orders)
16. Implement Bill generation (backend PDF + frontend preview/download)
17. Implement User dashboard + order history + profile

### Phase 4 — Admin & Polish (Week 4)

18. Implement Admin pages (user management, manager approval, system status)
19. Add Joi validation schemas for all endpoints
20. Add rate limiting, logging, env validation
21. Seed data for testing
22. Add error pages (404, 500)
23. Responsive design pass
24. Write tests

---

_End of Report_
