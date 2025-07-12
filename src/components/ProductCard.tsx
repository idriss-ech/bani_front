"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/services/api";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index: number;
  delay?: number;
}

const ProductCard = ({ product, index, delay = 150 }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Ensure stock is a number before passing to addToCart
    const safeProduct = { ...product, stock: product.stock ?? 0 };
    addToCart(safeProduct, 1);

    toast.success(`${product.title} ajouté au panier`);
  };

  const price =
    product.on_sale && product.sale_price ? product.sale_price : product.price;

  const imageUrl =
    product.images && product.images.length > 0
      ? getStrapiMedia(product.images[0].url)
      : null;

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } flex flex-col h-full shadow-sm hover:shadow-lg`}
      style={{ transitionDelay: `${index * delay}ms` }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex-grow flex flex-col h-full"
      >
        {/* Zone image - hauteur standardisée mais plus petite sur mobile */}
        <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              quality={90}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Badges plus petits sur mobile */}
          {product.on_sale && (
            <span className="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 bg-red-600/90 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
              PROMO
            </span>
          )}

          {product.featured && !product.on_sale && (
            <span className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 bg-indigo-600/90 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
              Populaire
            </span>
          )}
        </div>

        {/* Zone informations - padding réduit sur mobile */}
        <div className="p-2 sm:p-3 md:p-4 flex-grow flex flex-col">
          <div className="flex flex-col min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
            {/* Catégorie plus petite sur mobile */}
            {product.category && (
              <span className="text-[9px] sm:text-xs font-medium text-red-600 uppercase tracking-wider mb-1">
                {product.category.name}
              </span>
            )}

            {/* Titre plus petit et hauteur réduite sur mobile */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] mb-1 sm:mb-2">
              {product.title}
            </h3>

            {/* Prix ajusté pour mobile */}
            <div className="flex items-center mt-auto">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {price.toFixed(2)} DH
              </span>
              {product.on_sale && product.sale_price && (
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500 line-through">
                  {product.price.toFixed(2)} DH
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Bouton plus petit sur mobile */}
      <div className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4 pt-0 mt-auto">
        <button
          onClick={handleAddToCart}
          className="w-full rounded-lg bg-red-600 text-white font-medium text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-2.5 flex items-center justify-center gap-1 shadow-sm hover:bg-red-700 transition-colors duration-300 cursor-pointer"
          aria-label="Ajouter au panier"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="hidden xs:inline">Ajouter au panier</span>
            <span className="xs:hidden">Acheter</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
