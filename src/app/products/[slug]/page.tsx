"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchProductBySlug, getStrapiMedia } from "@/services/api";
import { useCart } from "@/hooks/useCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Share2,
  Heart,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Product } from "@/types"; 

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  // Récupérer le produit par son slug
  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductBySlug(slug as string);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getProduct();
    }
  }, [slug]);

  // Gestion du panier
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.title} ajouté au panier`);
    }
  };

  // Fonctions pour la galerie d'images
  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images!.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage((prev) =>
        prev === 0 ? product.images!.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded"
                  ></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="mb-6">
            Désolé, nous n&rsquo;avons pas pu trouver le produit que vous
            recherchez.
          </p>
          <Link
            href="/products"
            className="text-red-600 hover:underline font-medium flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const price =
    product.on_sale && product.sale_price ? product.sale_price : product.price;

  return (
    <div className="bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-red-600">
              Produits
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            {product.category && (
              <>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-gray-500 hover:text-red-600"
                >
                  {product.category.name}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6 md:border-r border-gray-100">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-6 shadow-sm">
                {product.images && product.images.length > 0 ? (
                  <>
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
                    <Image
                      src={getStrapiMedia(product.images[selectedImage].url) || ""}
                      alt={
                        product.images[selectedImage].alternativeText || product.title
                      }
                      fill
                      className="object-contain p-4 z-10"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      className="w-16 h-16 text-gray-300"
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

                {/* Navigation arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2 shadow-md z-20 transition-all duration-200"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full p-2 shadow-md z-20 transition-all duration-200"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                        selectedImage === index
                          ? "ring-2 ring-red-500 shadow-md scale-105"
                          : "border border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/50"></div>
                      <Image
                        src={getStrapiMedia(image.formats.thumbnail.url) || ""}
                        alt={
                          image.alternativeText ||
                          `${product.title} - image ${index + 1}`
                        }
                        fill
                        className="object-contain p-1 z-10"
                        sizes="(max-width: 768px) 20vw, 10vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">32 avis</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-4">
                  <span
                    className={`text-2xl font-bold ${
                      product.on_sale ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {price.toFixed(2)} €
                  </span>
                  {product.on_sale && (
                    <span className="text-gray-500 line-through">
                      {product.price.toFixed(2)} €
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="flex items-center">
                  {product.stock > 0 ? (
                    <div className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      En stock ({product.stock} disponibles)
                    </div>
                  ) : (
                    <div className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm">
                      Rupture de stock
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <Tabs defaultValue="description" className="mt-4 mb-6">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <p className="text-gray-700">{product.description}</p>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex">
                      <span className="font-medium w-24">Référence:</span>
                      <span>{product.sku}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-24">Catégorie:</span>
                      <span>{product.category?.name || "Non catégorisé"}</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>

              {/* Quantity and Add to Cart */}
              <div className="mt-auto pt-4">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-l border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 h-10 border-t border-b border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 rounded-r border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Heart className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="bg-red-600 hover:bg-red-700 text-white flex-1 h-12 text-base"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.stock > 0 ? "Ajouter au panier" : "Indisponible"}
                  </Button>
                  <Link href="/cart" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-50 h-12 text-base"
                    >
                      Commander maintenant
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
