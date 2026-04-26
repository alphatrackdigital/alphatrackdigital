import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
