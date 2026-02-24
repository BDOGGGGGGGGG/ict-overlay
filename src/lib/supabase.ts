import { createClient } from "@supabase/supabase-js";

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: "monthly" | "yearly";
  status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type VerificationCode = {
  id: string;
  email: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<User>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, "id" | "created_at" | "updated_at">;
        Update: Partial<Subscription>;
        Relationships: [];
      };
      verification_codes: {
        Row: VerificationCode;
        Insert: Omit<VerificationCode, "id" | "created_at">;
        Update: Partial<VerificationCode>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

import type { SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabase;
}

// Convenience alias — lazy singleton, safe at build time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
