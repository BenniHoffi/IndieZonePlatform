export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      allowed_cities: {
        Row: {
          bbox: unknown | null
          bbox_json: Json
          id: string
          name: string
        }
        Insert: {
          bbox?: unknown | null
          bbox_json: Json
          id?: string
          name: string
        }
        Update: {
          bbox?: unknown | null
          bbox_json?: Json
          id?: string
          name?: string
        }
        Relationships: []
      }
      attributes: {
        Row: {
          id: number
          name: Json
          type: string
          values: Json | null
        }
        Insert: {
          id?: number
          name: Json
          type: string
          values?: Json | null
        }
        Update: {
          id?: number
          name?: Json
          type?: string
          values?: Json | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          attributes: number[] | null
          id: number
          name: Json
          path: unknown | null
        }
        Insert: {
          attributes?: number[] | null
          id?: number
          name: Json
          path?: unknown | null
        }
        Update: {
          attributes?: number[] | null
          id?: number
          name?: Json
          path?: unknown | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          created_at: string
          id: string
          shop_id: string | null
          shopname: string
          user_id: string | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          shop_id?: string | null
          shopname: string
          user_id?: string | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          shop_id?: string | null
          shopname?: string
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      group_users: {
        Row: {
          created_at: string | null
          group_id: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_users_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string
          created_at: string
          deleted: boolean
          from: string
          id: string
          message: string
          read: boolean
          shop_sender_name: string | null
        }
        Insert: {
          chat_id: string
          created_at?: string
          deleted?: boolean
          from: string
          id?: string
          message: string
          read?: boolean
          shop_sender_name?: string | null
        }
        Update: {
          chat_id?: string
          created_at?: string
          deleted?: boolean
          from?: string
          id?: string
          message?: string
          read?: boolean
          shop_sender_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          message: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      product_rating: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          stars: number
          text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          product_id: string
          stars: number
          text?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          stars?: number
          text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_rating_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_rating_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean
          attributes: Json | null
          category: number | null
          created_at: string | null
          currency: string
          description: string | null
          id: string
          name: string
          price: string
          shop_id: string
        }
        Insert: {
          active?: boolean
          attributes?: Json | null
          category?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          name: string
          price: string
          shop_id: string
        }
        Update: {
          active?: boolean
          attributes?: Json | null
          category?: number | null
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          name?: string
          price?: string
          shop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          }
        ]
      }
      shops: {
        Row: {
          active: boolean
          category: string | null
          city: string
          country: string
          created_at: string | null
          description: string | null
          id: string
          location: unknown
          max_products: number | null
          name: string
          opening_hours: Json | null
          owner_id: string
          product_count: number
          shopowner_name: string
          slogan: string
          stats: Json | null
          street_adress: string
          telephone: string | null
          verified: boolean
          zip_code: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          id?: string
          location: unknown
          max_products?: number | null
          name: string
          opening_hours?: Json | null
          owner_id?: string
          product_count?: number
          shopowner_name: string
          slogan: string
          stats?: Json | null
          street_adress: string
          telephone?: string | null
          verified?: boolean
          zip_code: string
        }
        Update: {
          active?: boolean
          category?: string | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          location?: unknown
          max_products?: number | null
          name?: string
          opening_hours?: Json | null
          owner_id?: string
          product_count?: number
          shopowner_name?: string
          slogan?: string
          stats?: Json | null
          street_adress?: string
          telephone?: string | null
          verified?: boolean
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "shops_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          bday: string | null
          created_at: string | null
          email: string
          favorite_products: Json | null
          favorite_shops: Json | null
          groups: Json | null
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          bday?: string | null
          created_at?: string | null
          email: string
          favorite_products?: Json | null
          favorite_shops?: Json | null
          groups?: Json | null
          id: string
          name?: string | null
          username?: string | null
        }
        Update: {
          bday?: string | null
          created_at?: string | null
          email?: string
          favorite_products?: Json | null
          favorite_shops?: Json | null
          groups?: Json | null
          id?: string
          name?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _ltree_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _ltree_gist_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      add_allowed_city: {
        Args: {
          name: string
          west: number
          south: number
          east: number
          north: number
          json: Json
        }
        Returns: undefined
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      jwt_has_group_role: {
        Args: {
          group_id: string
          group_role: string
        }
        Returns: boolean
      }
      jwt_is_expired: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      jwt_is_group_member: {
        Args: {
          group_id: string
        }
        Returns: boolean
      }
      lca: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      lquery_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltree_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_gist_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_gist_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      ltree_gist_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltree2text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltxtq_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      nlevel: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      text2ltree: {
        Args: {
          "": string
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
