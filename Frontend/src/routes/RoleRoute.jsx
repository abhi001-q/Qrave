import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Allows access only if current user has one of the specified roles.
 * Usage: <RoleRoute roles={['manager', 'admin']} />
 */
export default function RoleRoute({ roles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user.role || "").toLowerCase();
  const allowedRoles = roles.map(r => r.toLowerCase());

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
