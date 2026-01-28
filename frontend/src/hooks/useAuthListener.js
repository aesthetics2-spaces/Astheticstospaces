import { useEffect } from "react";
import { supabase } from "../lib/supabase";

const useAuthListener = () => {
  useEffect(() => {
    let isMounted = true; // avoid state updates if unmounted

    const createWallet = async (userId) => {
      try {
        // Check if wallet exists
        const { data, error } = await supabase
          .from("user_credits")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking wallet:", error);
          return;
        }

        if (!data && isMounted) {
          // Create wallet for new user
          const { error: insertError } = await supabase
            .from("user_credits")
            .insert([
              {
                user_id: userId,
                credits: 10,
                daily_earned: 0,
                last_reset: new Date().toISOString(),
              },
            ]);

          if (insertError) console.error("Failed to create wallet:", insertError);
          else console.log("Wallet created for user:", userId);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.id) {
          createWallet(session.user.id); // call async safely
        }
      }
    );

    // On mount, also handle existing session
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user?.id) {
        createWallet(data.session.user.id);
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);
};

export default useAuthListener;
