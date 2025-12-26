import { useStore } from "@/store/useStore";
import { MenuCard } from "@/components/MenuCard";
import { Cart } from "@/components/Cart";
import { PaymentDialog } from "@/components/PaymentDialog";
import { PrintBill } from "@/components/PrintBill";
import { Header } from "@/components/Header";

const Index = () => {
  const menuItems = useStore((state) => state.menuItems);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Our Menu
              </h2>
              <p className="text-muted-foreground">
                Click on any item to add it to your order
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MenuCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-card p-6 border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span>🧾</span> Current Order
                </h2>
                
                <Cart />
                
                <div className="mt-4 space-y-3">
                  <PrintBill />
                  <PaymentDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
