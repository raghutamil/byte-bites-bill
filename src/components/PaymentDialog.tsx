import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { CreditCard, QrCode, Check } from "lucide-react";
import { toast } from "sonner";

export const PaymentDialog = () => {
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { cart, getCartTotal, completeSale } = useStore();
  const total = getCartTotal();

  const handlePayment = (method: string) => {
    if (method === "qr") {
      setShowQR(true);
    } else {
      completeSale(method);
      setOpen(false);
      setShowQR(false);
      toast.success("Payment completed successfully!", {
        description: `Amount: ₹${total}`,
      });
    }
  };

  const confirmQRPayment = () => {
    completeSale("QR Code");
    setOpen(false);
    setShowQR(false);
    toast.success("Payment completed successfully!", {
      description: `Amount: ₹${total}`,
    });
  };

  if (cart.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); setShowQR(false); }}>
      <DialogTrigger asChild>
        <Button className="w-full gradient-warm text-primary-foreground font-semibold py-6 text-lg shadow-warm hover:opacity-90 transition-opacity">
          <CreditCard className="w-5 h-5 mr-2" />
          Pay Now - ₹{total}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">
            {showQR ? "Scan QR to Pay" : "Choose Payment Method"}
          </DialogTitle>
        </DialogHeader>

        {showQR ? (
          <div className="flex flex-col items-center py-6 animate-scale-in">
            <div className="p-4 bg-card rounded-2xl shadow-card mb-4">
              <div className="w-48 h-48 bg-foreground rounded-xl flex items-center justify-center">
                <QrCode className="w-32 h-32 text-background" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">₹{total}</p>
            <p className="text-muted-foreground text-sm mb-6">Scan with any UPI app</p>
            <Button 
              onClick={confirmQRPayment}
              className="gradient-warm text-primary-foreground w-full py-6"
            >
              <Check className="w-5 h-5 mr-2" />
              Confirm Payment Received
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handlePayment("qr")}
            >
              <QrCode className="w-6 h-6 mr-4 text-primary" />
              Pay via QR Code (UPI)
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handlePayment("Cash")}
            >
              <span className="w-6 h-6 mr-4 text-lg">💵</span>
              Cash Payment
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg justify-start px-6 hover:border-primary hover:bg-primary/5"
              onClick={() => handlePayment("Card")}
            >
              <CreditCard className="w-6 h-6 mr-4 text-primary" />
              Card Payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
