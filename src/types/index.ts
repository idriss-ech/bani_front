// Types génériques pour les réponses Strapi
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
      };
    };
  } | null;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

// Type de catégorie
export interface Category {
  id: number;
  name: string;
  description?: string;
  slug: string;
  Image?: {
    url: string;
    alternativeText?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Type pour la relation avec la catégorie
export interface CategoryRelation {
  data?: {
    id: number;
    attributes: {
      name: string;
      description?: string;
      slug: string;
    };
  };
}

// Structure d'image telle que retournée par l'API
export interface ProductImage {
  id: number;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  hash?: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Type de produit tel qu'il est retourné par l'API
export interface Product {
  id: number;
  documentId?: string;
  title: string;
  description?: string;
  price: number;
  sku?: string;
  stock?: number;
  on_sale?: boolean;
  sale_price?: number;
  slug: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  images?: ProductImage[];
  category?: {
    id: number;
    name: string;
    description?: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}

// Type pour le produit côté client (après transformation si nécessaire)
export interface ClientProduct {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number | null;
  salePrice?: number | null;
  onSale: boolean;
  image: string;
  imageAlt?: string;
  rating?: number;
  stock: number;
  sku?: string;
  category?: {
    id?: number;
    name: string;
    slug?: string;
  };
  badge?: string; // 'Nouveau', 'Populaire', '-20%', etc.
}

// Type pour le panier
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}

// Types pour les commandes
export interface OrderItem {
  productId: number;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  documentId: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
  command_status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Type pour la réponse de l'API pour une commande unique
export interface OrderResponse {
  data: Order;
  meta: Record<string, never>; // Explicitly empty object type
}

// Type pour la réponse de l'API pour une liste de commandes
export interface OrdersListResponse {
  data: Order[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
