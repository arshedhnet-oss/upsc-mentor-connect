import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export type UserRole = "mentor" | "aspirant" | null;

interface Profile {
  id: string;
  user_id: string;
  name: string;
  photo_url: string | null;
  optional_subject: string | null;
  mains_attempts: number;
  interview_appearances: number;
  bio: string | null;
  audio_per_minute: number;
  video_per_minute: number;
  audio_per_hour: number;
  video_per_hour: number;
  languages: any[];
  subscription_plans: any[];
  availability: string[];
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  loading: boolean;
  signUp: (email: string, password: string, role: UserRole, meta?: Record<string, any>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) {
      setProfile({
        ...data,
        mains_attempts: data.mains_attempts ?? 0,
        interview_appearances: data.interview_appearances ?? 0,
        audio_per_minute: data.audio_per_minute ?? 15,
        video_per_minute: data.video_per_minute ?? 25,
        audio_per_hour: data.audio_per_hour ?? 750,
        video_per_hour: data.video_per_hour ?? 1200,
        languages: (data.languages as any[]) ?? [],
        subscription_plans: (data.subscription_plans as any[]) ?? [],
        availability: data.availability ?? [],
      });
    }
  };

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();
    setRole(data?.role as UserRole ?? null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          // Use setTimeout to avoid Supabase deadlock on auth state change
          setTimeout(async () => {
            await fetchProfile(session.user.id);
            await fetchRole(session.user.id);
            setLoading(false);
          }, 0);
        } else {
          setUser(null);
          setProfile(null);
          setRole(null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
        fetchRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userRole: UserRole, meta?: Record<string, any>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: meta?.name || "New User" } },
    });

    if (error) return { error };

    if (data.user) {
      // Insert role
      if (userRole) {
        await supabase.from("user_roles").insert({ user_id: data.user.id, role: userRole });
      }

      // Update profile with additional data
      if (meta) {
        await supabase.from("profiles").update({
          name: meta.name || "New User",
          photo_url: meta.photo_url || null,
          optional_subject: meta.optional_subject || null,
          mains_attempts: meta.mains_attempts || 0,
          interview_appearances: meta.interview_appearances || 0,
          bio: meta.bio || null,
        }).eq("user_id", data.user.id);
      }

      await fetchProfile(data.user.id);
      await fetchRole(data.user.id);
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: "Not authenticated" };
    const { error } = await supabase
      .from("profiles")
      .update(data as any)
      .eq("user_id", user.id);
    if (!error) {
      await fetchProfile(user.id);
    }
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        isAuthenticated: !!user,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
