"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts, fetchCategories } from "@/services/api";
import { Product, Category } from "@/types";
import ProductCard from "@/components/ProductCard";

// Loading component for Suspense fallback
function ProductsLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Move the component using useSearchParams to a separate client component
function ProductsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  // États
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState("featured");
  const router = useRouter();

  // Récupérer les produits et catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        const categoriesData = await fetchCategories();

        if (Array.isArray(productsData.data)) {
          setProducts(productsData.data);
          setFilteredProducts(productsData.data);
        }

        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        }

        // Initialiser le filtre de catégorie si présent dans l'URL
        if (categorySlug) {
          setActiveCategory(categorySlug);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  // Appliquer les filtres quand les états changent
  useEffect(() => {
    let result = [...products];

    // Filtre par catégorie
    if (activeCategory) {
      // Supposons que chaque produit a une propriété category.slug
      // Adapter selon votre structure de données réelle
      result = result.filter(
        (product) => product.category?.slug === activeCategory
      );
    }

    // Filtre par recherche
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          (product.description &&
            product.description.toLowerCase().includes(term))
      );
    }

    // Filtre par prix
    result = result.filter((product) =>
      product.on_sale
        ? product.sale_price !== undefined &&
          product.sale_price !== null &&
          product.sale_price >= priceRange[0] &&
          product.sale_price <= priceRange[1]
        : product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tri
    switch (sortOption) {
      case "price-asc":
        result.sort(
          (a, b) =>
            (a.on_sale ? a.sale_price! : a.price) -
            (b.on_sale ? b.sale_price! : b.price)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            (b.on_sale ? b.sale_price! : b.price) -
            (a.on_sale ? a.sale_price! : a.price)
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
        break;
      case "featured":
      default:
        result = result
          .filter((product) => product.featured)
          .concat(result.filter((product) => !product.featured));
    }

    setFilteredProducts(result);
  }, [products, activeCategory, searchTerm, priceRange, sortOption]);

  // Gérer le changement de catégorie
  const handleCategoryChange = (slug: string | null) => {
    setActiveCategory(slug);

    // Mettre à jour l'URL
    if (slug) {
      router.push(`/products?category=${slug}`);
    } else {
      router.push("/products");
    }
  };

  // Gérer le changement de prix
  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPrice = parseInt(e.target.value);
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = newPrice;
    setPriceRange(newPriceRange);
  };

  // États d'interface utilisateur
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Affichage pendant le chargement
  if (loading) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Tous nos produits</h1>
          <p className="text-xl">
            Découvrez notre vaste sélection de fournitures scolaires et livres
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-3 pl-10 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Filtres
            </button>
          </div>

          {/* Sidebar filters */}
          <aside
            className={`lg:w-1/4 ${
              showMobileFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Catégories
              </h3>
              <ul
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "250px" }}
              >
                <li>
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeCategory === null
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Toutes les catégories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeCategory === category.slug
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Prix</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Min: {priceRange[0]} €
                  </span>
                  <span className="text-sm text-gray-500">
                    Max: {priceRange[1]} €
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />

                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Trier par
              </h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>
          </aside>

          {/* Product grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun produit trouvé
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Essayez d&rsqua;ajuster vos filtres ou votre recherche.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filteredProducts.length} produit
                  {filteredProducts.length > 1 ? "s" : ""} trouvé
                  {filteredProducts.length > 1 ? "s" : ""}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
