import { Navigate } from "react-router";

export default function RedirectToSignIn() {
  return <Navigate to="/auth/login" replace />;
}
