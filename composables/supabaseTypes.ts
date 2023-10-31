type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

interface Database {
    public: {
        Tables: {
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
                        referencedRelation: "groups"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "group_users_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
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
            notifications: {
                Row: {
                    created_at: string | null
                    id: string
                    label: string
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    label: string
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    label?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "notifications_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
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
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "product_rating_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
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
                    group: boolean
                    id: string
                    name: string
                    price: Json
                    shop_id: string
                }
                Insert: {
                    active?: boolean
                    attributes?: Json | null
                    category?: number | null
                    created_at?: string | null
                    currency: string
                    description?: string | null
                    group?: boolean
                    id?: string
                    name: string
                    price: Json
                    shop_id: string
                }
                Update: {
                    active?: boolean
                    attributes?: Json | null
                    category?: number | null
                    created_at?: string | null
                    currency?: string
                    description?: string | null
                    group?: boolean
                    id?: string
                    name?: string
                    price?: Json
                    shop_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "products_category_fkey"
                        columns: ["category"]
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "products_shop_id_fkey"
                        columns: ["shop_id"]
                        referencedRelation: "shops"
                        referencedColumns: ["id"]
                    },
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
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    bday: string | null
                    created_at: string | null
                    email: string
                    favorite_products: string[] | null
                    favorite_shops: string[] | null
                    groups: Json | null
                    id: string
                    name: string | null
                    username: string | null
                }
                Insert: {
                    bday?: string | null
                    created_at?: string | null
                    email: string
                    favorite_products?: string[] | null
                    favorite_shops?: string[] | null
                    groups?: Json | null
                    id: string
                    name?: string | null
                    username?: string | null
                }
                Update: {
                    bday?: string | null
                    created_at?: string | null
                    email?: string
                    favorite_products?: string[] | null
                    favorite_shops?: string[] | null
                    groups?: Json | null
                    id?: string
                    name?: string | null
                    username?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "users_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
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
