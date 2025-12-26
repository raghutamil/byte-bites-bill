import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Printer } from "lucide-react";

export const PrintBill = () => {
  const { cart, getCartTotal } = useStore();
  const printRef = useRef<HTMLDivElement>(null);
  const total = getCartTotal();

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "", "width=300,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              max-width: 280px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px dashed #333;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .header h1 {
              font-size: 20px;
              margin: 0;
            }
            .header p {
              font-size: 12px;
              margin: 5px 0;
              color: #666;
            }
            .items {
              border-bottom: 1px dashed #333;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin: 8px 0;
              font-size: 14px;
            }
            .item-name {
              flex: 1;
            }
            .item-qty {
              width: 30px;
              text-align: center;
            }
            .item-price {
              width: 60px;
              text-align: right;
            }
            .total {
              display: flex;
              justify-content: space-between;
              font-size: 18px;
              font-weight: bold;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍽️ South Spice</h1>
            <p>Authentic South Indian Cuisine</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
          <div class="items">
            ${cart
              .map(
                (item) => `
              <div class="item">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x${item.quantity}</span>
                <span class="item-price">₹${item.price * item.quantity}</span>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="total">
            <span>TOTAL</span>
            <span>₹${total}</span>
          </div>
          <div class="footer">
            <p>Thank you for dining with us!</p>
            <p>Visit again 🙏</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (cart.length === 0) return null;

  return (
    <Button
      variant="outline"
      onClick={handlePrint}
      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Printer className="w-4 h-4 mr-2" />
      Print Bill
    </Button>
  );
};
