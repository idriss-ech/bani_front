'use client';
import { useState, useEffect, createContext, useContext } from 'react';

// Type pour les produits du panier
export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  slug: string;
  stock: number;
  on_sale?: boolean;
  sale_price?: number | null;
};

// Type pour le panier complet
type Cart = {
  items: CartItem[];
  total: number;
  count: number;
};

// Type pour le produit (à adapter selon votre modèle réel)
export type Product = {
  id: number;
  title: string;
  price: number;
  images?: { url: string }[];
  slug: string;
  stock: number;
  on_sale?: boolean;
  sale_price?: number | null;
};

// Type pour le contexte
type CartContextType = {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
};

// Créer le contexte
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart doit être utilisé avec un CartProvider');
  }
  return context;
};

// Provider pour le panier
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    count: 0,
  });

  // Charger le panier depuis localStorage au chargement
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (e) {
        console.error('Erreur lors du chargement du panier:', e);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  // Calculer le total et le nombre d'articles
  const calculateCartTotals = (items: CartItem[]) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => {
      const price = item.on_sale && item.sale_price ? item.sale_price : item.price;
      return sum + price * item.quantity;
    }, 0);
    return { count, total };
  };

  // Ajouter un produit au panier
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      // Vérifier si le produit est déjà dans le panier
      const existingItemIndex = prevCart.items.findIndex((item) => item.id === product.id);

      let updatedItems;
      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si le produit est déjà dans le panier
        updatedItems = prevCart.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      } else {
        // Ajouter un nouvel élément au panier
        const image = product.images && product.images.length > 0
          ? product.images[0].url
          : undefined;

        const newItem: CartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          image: image,
          slug: product.slug,
          stock: product.stock,
          on_sale: product.on_sale,
          sale_price: product.sale_price,
        };

        updatedItems = [...prevCart.items, newItem];
      }

      const { count, total } = calculateCartTotals(updatedItems);
      return {
        items: updatedItems,
        count,
        total,
      };
    });
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(1, Math.min(quantity, item.stock)),
          };
        }
        return item;
      });

      const { count, total } = calculateCartTotals(updatedItems);
      return {
        items: updatedItems,
        count,
        total,
      };
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      const { count, total } = calculateCartTotals(updatedItems);
      return {
        items: updatedItems,
        count,
        total,
      };
    });
  };

  // Vider le panier
  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      count: 0,
    });
  };

  // Vérifier si un produit est déjà dans le panier
  const isInCart = (id: number) => {
    return cart.items.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};