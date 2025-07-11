import { OrderInput, OrderResponse } from "@/types";
import axios from "axios";

// URL de base de l'API Strapi
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Helper pour formater les URL des médias Strapi
export const getStrapiMedia = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${API_URL}${url}`;
};

// Client API pour toutes les requêtes
const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Service pour récupérer les catégories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories", {
      params: {
        populate: "*", // Récupérer les relations et médias
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return [];
  }
};

// Service pour récupérer les produits
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products", {
      params: {
        populate: "*",
      },
    });
    return response.data; // Ajoutez cette ligne pour retourner les données
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/products`, {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: "*",
      },
    });

    const products = response.data?.data;
    console.log(`Produits récupérés pour le slug "${slug}":`, products);
    if (Array.isArray(products) && products.length > 0) {
      return products[0];
    }

    return null;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit avec le slug "${slug}":`,
      error
    );
    return null;
  }
};

export const createOrder = async (
  orderData: OrderInput
): Promise<OrderResponse> => {
  try {
    const response = await api.post("/commands", { data: orderData });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
};

// Ajouter cette nouvelle fonction
export const fetchOrder = async (id: string) => {
  try {
    const response = await api.get(`/commands/${id}`, {
      params: {
        populate: "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la commande ${id}:`,
      error
    );
    return null;
  }
};

// Service pour récupérer les produits populaires
export const fetchPopularProducts = async (limit = 4) => {
  try {
    const response = await api.get("/products", {
      params: {
        populate: "*",
        sort: "featured:desc",
        pagination: {
          limit: limit,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits populaires:",
      error
    );
    return { data: [] };
  }
};

export default api;
