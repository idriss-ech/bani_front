"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { getStrapiMedia, createOrder } from "@/services/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"cart" | "checkout">("cart");

  // États pour le formulaire de commande
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    additionalInfo: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Gérer les changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumettre la commande
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    try {
      setSubmitting(true);

      // Générer un numéro de commande unique - sans les délimiteurs regex
      const timestamp = Date.now().toString();
      const orderNumber = `ORD-${timestamp}`;

      // Préparer les données de commande avec format plat (sans imbrication)
      const orderData = {
        orderNumber: orderNumber,
        command_status: "pending", // Utiliser command_status au lieu de status
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postalCode,
        city: formData.city,
        country: "France", // Ajouter ce champ qui existe dans votre modèle
        notes: formData.additionalInfo || "",
        items: JSON.stringify(
          cart.items.map((item) => ({
            productId: item.id,
            title: item.title,
            quantity: item.quantity,
            unitPrice:
              item.on_sale && item.sale_price ? item.sale_price : item.price,
          }))
        ),
        total: cart.total,
      };

      // Envoyer la commande à l'API
      const result = await createOrder(orderData);

      if (result.data.documentId) {
        toast.success("Commande envoyée avec succès!");
        // Vider le panier
        clearCart();
        // Rediriger vers une page de confirmation
        router.push(`/order-confirmation/${result.data.documentId}`);
      } else {
        throw new Error("Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
      toast.error("Échec de l'envoi de la commande. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
            <p className="text-gray-600 mb-6">
              Vous n&rsquo;avez pas encore ajouté de produits à votre panier.
            </p>
          </div>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              Parcourir nos produits
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {step === "cart" ? "Votre panier" : "Finaliser votre commande"}
        </h1>
        <div className="flex items-center mt-2">
          <div
            className={`h-2 rounded-full ${
              step === "cart" ? "bg-red-600" : "bg-gray-200"
            } flex-1`}
          ></div>
          <div
            className={`h-2 rounded-full ${
              step === "checkout" ? "bg-red-600" : "bg-gray-200"
            } flex-1`}
          ></div>
        </div>
      </div>

      {step === "cart" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Articles ({cart.count})
                  </h2>
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-gray-500 hover:text-red-600 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Vider le panier
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cart.items.map((item) => {
                  const itemPrice =
                    item.on_sale && item.sale_price
                      ? item.sale_price
                      : item.price;

                  return (
                    <div key={item.id} className="p-6 flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded relative flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={getStrapiMedia(item.image) || ""}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 96px, 96px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <svg
                              className="w-8 h-8 text-gray-300"
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
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-medium text-gray-900 hover:text-red-600"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Supprimer du panier"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.stock}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">
                              {(itemPrice * item.quantity).toFixed(2)} €
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-500">
                                {itemPrice.toFixed(2)} € l&rsquo;unité
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between">
                  <Link
                    href="/products"
                    className="text-red-600 hover:underline flex items-center text-sm font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Continuer vos achats
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Résumé de commande</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{cart.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span>Gratuit</span>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl">{cart.total.toFixed(2)} €</span>
                </div>
              </div>

              <Button
                onClick={() => setStep("checkout")}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
              >
                Passer à la commande
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">
                  Informations personnelles
                </h2>
              </div>

              <form onSubmit={handleSubmitOrder} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <h3 className="text-base font-medium mb-3">
                  Adresse de livraison
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Adresse *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Code postal *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ville *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Informations complémentaires
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="text-red-600 hover:underline flex items-center text-sm font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Retour au panier
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Résumé de commande</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{cart.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span>Gratuit</span>
                </div>
              </div>

              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl">{cart.total.toFixed(2)} €</span>
                </div>
              </div>

              <Button
                type="submit"
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  "Commander maintenant"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
