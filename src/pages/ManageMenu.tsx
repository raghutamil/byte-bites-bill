import { useState } from "react";
import { Header } from "@/components/Header";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { MenuItem } from "@/types/menu";

const ManageMenu = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Breakfast",
    image: "",
  });

  const resetForm = () => {
    setFormData({ name: "", price: "", category: "Breakfast", image: "" });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    addMenuItem({
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    });

    toast.success("Menu item added successfully!");
    resetForm();
    setIsAddOpen(false);
  };

  const handleEdit = () => {
    if (!editingItem || !formData.name || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateMenuItem(editingItem.id, {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image || editingItem.image,
    });

    toast.success("Menu item updated successfully!");
    resetForm();
    setEditingItem(null);
  };

  const handleDelete = (id: string, name: string) => {
    deleteMenuItem(id);
    toast.success(`${name} removed from menu`);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Manage Menu
            </h2>
            <p className="text-muted-foreground">
              Add, edit, or remove menu items
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-warm text-primary-foreground shadow-warm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Add New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Masala Dosa"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 60"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Breakfast"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <Button onClick={handleAdd} className="w-full gradient-warm text-primary-foreground">
                  Add to Menu
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Edit Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name">Item Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price (₹) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              <Button onClick={handleEdit} className="w-full gradient-warm text-primary-foreground">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold text-xl">₹{item.price}</p>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEdit(item)}
                      className="hover:border-primary hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="hover:border-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground">No menu items yet</p>
            <p className="text-sm text-muted-foreground">Click "Add Item" to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageMenu;
