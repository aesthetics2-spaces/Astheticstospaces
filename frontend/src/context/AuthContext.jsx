import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import useAuthListener from "@/hooks/useAuthListener"; // import your hook

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0); // add credits state
  const [loadingCredits, setLoadingCredits] = useState(true);

  // 1) Get session from Supabase
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Call your listener hook here
  // useAuthListener();

  // Fetch credits for logged-in user
  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("user_credits")
        .select("credits")
        .eq("user_id", user.id)
        .single();

      if (!error && data) setCredits(data.credits);
      setLoadingCredits(false);
    };
    fetchCredits();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, credits, setCredits, loadingCredits, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
