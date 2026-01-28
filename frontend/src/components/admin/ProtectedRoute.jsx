import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// 🔒 SAME ADMIN EMAILS AS LOGIN
const ADMIN_EMAILS = ["admin@gmail.com"]; // change if needed

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && ADMIN_EMAILS.includes(user.email)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  // While checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking access…
      </div>
    );
  }

  // Not admin
  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  // Admin allowed
  return children;
};

export default ProtectedRoute;
