import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { getStrapiMedia } from "@/services/api";
import { useMemo } from "react";

interface CategoryCardProps {
  category: Category;
  variant?: "compact" | "full";
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = "full",
}) => {
  // Memoize the truncated description to avoid recalculating on re-renders
  const truncatedDescription = useMemo(() => {
    // Different character limits based on variant
    const maxLength = variant === "compact" ? 30 : 80;
    const text =
      category.description ||
      "Découvrez notre sélection de produits dans cette catégorie";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  }, [category.description, variant]);

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Image container with consistent height */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        {category.Image ? (
          <Image
            src={getStrapiMedia(category.Image.url) || ""}
            alt={category.Image.alternativeText || category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300"
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
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Badge */}
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Explorer
        </div>
      </div>

      {/* Content with fixed heights for consistent card appearance */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Title with fixed height */}
        <div className="h-7 sm:h-8 mb-2">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {category.name}
          </h3>
        </div>

        {/* Description with fixed height based on variant */}
        {variant === "full" && (
          <div className="h-7 sm:h-8 mb-2">
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
              {truncatedDescription}
            </p>
          </div>
        )}

        {/* CTA always at the bottom */}
        <div className="mt-auto pt-2 flex items-center text-red-600 text-sm font-medium">
          <span>Découvrir</span>
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
