import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Allows access only if current user has one of the specified roles.
 * Usage: <RoleRoute roles={['manager', 'admin']} />
 */
export default function RoleRoute({ roles }) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
