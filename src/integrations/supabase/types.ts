export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          available_amount: number
          created_at: string | null
          currency_id: string
          id: string
          max_amount: number
          min_amount: number
          order_type: Database["public"]["Enums"]["order_type"]
          payment_methods: string[]
          price: number
          status: Database["public"]["Enums"]["ad_status"] | null
          terms: string | null
          updated_at: string | null
          user_id: string
          views: number | null
        }
        Insert: {
          available_amount: number
          created_at?: string | null
          currency_id: string
          id?: string
          max_amount: number
          min_amount: number
          order_type: Database["public"]["Enums"]["order_type"]
          payment_methods: string[]
          price: number
          status?: Database["public"]["Enums"]["ad_status"] | null
          terms?: string | null
          updated_at?: string | null
          user_id: string
          views?: number | null
        }
        Update: {
          available_amount?: number
          created_at?: string | null
          currency_id?: string
          id?: string
          max_amount?: number
          min_amount?: number
          order_type?: Database["public"]["Enums"]["order_type"]
          payment_methods?: string[]
          price?: number
          status?: Database["public"]["Enums"]["ad_status"] | null
          terms?: string | null
          updated_at?: string | null
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          id: string
          name: string
          symbol: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          id?: string
          name: string
          symbol: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      disputes: {
        Row: {
          created_at: string | null
          description: string | null
          dispute_number: string
          id: string
          reason: string
          reported_user_id: string | null
          reporter_id: string
          resolution: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["dispute_status"] | null
          trade_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          dispute_number: string
          id?: string
          reason: string
          reported_user_id?: string | null
          reporter_id: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          trade_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          dispute_number?: string
          id?: string
          reason?: string
          reported_user_id?: string | null
          reporter_id?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          trade_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          ad_id: string | null
          amount: number
          created_at: string | null
          currency_code: string
          id: string
          order_number: string
          order_type: Database["public"]["Enums"]["order_type"]
          payment_method: string
          price: number
          status: Database["public"]["Enums"]["trade_status"] | null
          total_value: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ad_id?: string | null
          amount: number
          created_at?: string | null
          currency_code: string
          id?: string
          order_number: string
          order_type: Database["public"]["Enums"]["order_type"]
          payment_method: string
          price: number
          status?: Database["public"]["Enums"]["trade_status"] | null
          total_value: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ad_id?: string | null
          amount?: number
          created_at?: string | null
          currency_code?: string
          id?: string
          order_number?: string
          order_type?: Database["public"]["Enums"]["order_type"]
          payment_method?: string
          price?: number
          status?: Database["public"]["Enums"]["trade_status"] | null
          total_value?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          completion_rate: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          total_trades: number | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          completion_rate?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          total_trades?: number | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          completion_rate?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          total_trades?: number | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          report_number: string
          reported_user_id: string | null
          reporter_id: string
          status: string | null
          trade_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          report_number: string
          reported_user_id?: string | null
          reporter_id: string
          status?: string | null
          trade_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          report_number?: string
          reported_user_id?: string | null
          reporter_id?: string
          status?: string | null
          trade_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          amount: number
          buyer_id: string
          completed_at: string | null
          created_at: string | null
          currency_code: string
          expires_at: string | null
          id: string
          order_id: string
          payment_confirmed_at: string | null
          payment_method: string
          price: number
          seller_id: string
          status: Database["public"]["Enums"]["trade_status"] | null
          time_limit_minutes: number | null
          total_value: number
          trade_number: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          buyer_id: string
          completed_at?: string | null
          created_at?: string | null
          currency_code: string
          expires_at?: string | null
          id?: string
          order_id: string
          payment_confirmed_at?: string | null
          payment_method: string
          price: number
          seller_id: string
          status?: Database["public"]["Enums"]["trade_status"] | null
          time_limit_minutes?: number | null
          total_value: number
          trade_number: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string
          completed_at?: string | null
          created_at?: string | null
          currency_code?: string
          expires_at?: string | null
          id?: string
          order_id?: string
          payment_confirmed_at?: string | null
          payment_method?: string
          price?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["trade_status"] | null
          time_limit_minutes?: number | null
          total_value?: number
          trade_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trades_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency_code: string
          id: string
          status: string | null
          trade_id: string | null
          transaction_number: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency_code: string
          id?: string
          status?: string | null
          trade_id?: string | null
          transaction_number: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency_code?: string
          id?: string
          status?: string | null
          trade_id?: string | null
          transaction_number?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ad_status: "active" | "paused" | "expired"
      app_role: "admin" | "moderator" | "user"
      dispute_status: "open" | "investigating" | "resolved" | "closed"
      order_type: "buy" | "sell"
      trade_status:
        | "pending"
        | "in_progress"
        | "awaiting_payment"
        | "payment_confirmed"
        | "completed"
        | "cancelled"
        | "disputed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ad_status: ["active", "paused", "expired"],
      app_role: ["admin", "moderator", "user"],
      dispute_status: ["open", "investigating", "resolved", "closed"],
      order_type: ["buy", "sell"],
      trade_status: [
        "pending",
        "in_progress",
        "awaiting_payment",
        "payment_confirmed",
        "completed",
        "cancelled",
        "disputed",
      ],
    },
  },
} as const
