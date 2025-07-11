"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Loader2, Printer } from "lucide-react";
import { fetchOrder } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Order, OrderItem } from "@/types"; // Import proper types

export default function OrderConfirmationPage() {
  const { id } = useParams();
  // Use Order type instead of any
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (id) {
          const orderData = await fetchOrder(id as string);
          if (orderData?.data) {
            console.log("Données de la commande récupérées:", orderData);
            setOrder(orderData.data);
          } else {
            setError("Commande non trouvée");
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la commande:", err);
        setError("Erreur lors du chargement de la commande");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  // Fonction pour imprimer la page
  const handlePrint = () => {
    if (printRef.current && order) {
      // Créer une nouvelle fenêtre
      const printWindow = window.open("", "_blank", "height=600,width=800");

      if (!printWindow) {
        alert("Veuillez autoriser les pop-ups pour imprimer la commande.");
        return;
      }

      // Récupérer les styles de la page actuelle
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("");
          } catch {
            // Feuilles de style CORS peuvent générer des erreurs
            return "";
          }
        })
        .join("");

      // Préparer le contenu HTML avec null check
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Commande ${order.orderNumber}</title>
            <style>
              ${styles}
              @media print {
                body { 
                  padding: 20px; 
                  font-family: sans-serif;
                }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printRef.current.innerHTML}
            </div>
            <script>
              setTimeout(function() { 
                window.print();
                window.close();
              }, 500);
            </script>
          </body>
        </html>
      `;

      // Écrire le contenu et lancer l'impression
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
        <p className="text-xl">Chargement de votre commande...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {error || "Commande non trouvée"}
          </h1>
          <p className="mb-6">
            Nous n&apos;avons pas pu trouver les détails de votre commande.
            Veuillez vérifier le numéro de commande ou contacter notre service
            client.
          </p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);

  return (
    <div className="container mx-auto px-4 py-12">
      <div
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden print:shadow-none"
        ref={printRef}
      >
        <div className="p-6 bg-green-50 border-b flex items-center print:bg-white">
          <CheckCircle className="h-10 w-10 text-green-600 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Commande confirmée
            </h1>
            <p className="text-gray-600">
              Merci pour votre confiance ! Nous vous tiendrons informé
              rapidement de la suite de votre commande.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Détails de la commande
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Numéro de commande</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Date de commande</p>
                <p className="font-medium">
                  {orderDate.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-medium">
                  {order.total.toFixed(2)} DH
                </p>
              </div>
              <div>
                <p className="text-gray-500">État</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.command_status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.command_status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.command_status === "pending"
                    ? "En attente"
                    : order.command_status === "completed"
                    ? "Terminée"
                    : order.command_status === "processing"
                    ? "En traitement"
                    : "Confirmée"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Articles commandés</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Produit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantité
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prix unitaire
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item: OrderItem, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {item.unitPrice.toFixed(2)} DH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        {(item.quantity * item.unitPrice).toFixed(2)} DH
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-right font-medium"
                    >
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">
                      {order.total.toFixed(2)} DH
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Informations de livraison
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">
                {order.firstName} {order.lastName}
              </p>
              <p>{order.address}</p>
              <p>
                {order.postalCode} {order.city}, {order.country}
              </p>
              <p className="mt-2">
                <span className="text-gray-600">Tél:</span> {order.phone}
              </p>
              <p>
                <span className="text-gray-600">Email:</span> {order.email}
              </p>
              {order.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-600 font-medium">Notes:</p>
                  <p className="text-gray-800">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8 no-print">
            <Link href="/products">
              <Button className="bg-red-600 hover:bg-red-700 flex items-center">
                Continuer vos achats
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              onClick={handlePrint}
              className="bg-gray-600 hover:bg-gray-700 flex items-center"
            >
              Imprimer la commande
              <Printer className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
