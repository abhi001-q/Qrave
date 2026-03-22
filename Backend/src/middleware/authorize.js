/**
 * Role-based access control middleware
 * Usage: authorize('admin'), authorize('manager', 'admin')
 */
module.exports = (...roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
  }
  const userRole = req.user.role.toUpperCase();
  const allowedRoles = roles.map(r => r.toUpperCase());
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ success: false, message: 'Forbidden: insufficient role' });
  }
  next();
};
