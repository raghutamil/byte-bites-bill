// Menu Data
const menuItems = [
  { id: 1, name: "Idly", price: 40, category: "breakfast", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400" },
  { id: 2, name: "Dosa", price: 60, category: "breakfast", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
  { id: 3, name: "Vada", price: 30, category: "breakfast", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400" },
  { id: 4, name: "Poori", price: 50, category: "breakfast", image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400" },
  { id: 5, name: "Puttu", price: 45, category: "breakfast", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400" },
  { id: 6, name: "Coffee", price: 25, category: "beverages", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" }
];

// Cart State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const totalAmount = document.getElementById('totalAmount');
const printBtn = document.getElementById('printBtn');
const payBtn = document.getElementById('payBtn');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const modalTotal = document.getElementById('modalTotal');

// Initialize App
function init() {
  renderMenu();
  renderCart();
  setupEventListeners();
}

// Render Menu Items
function renderMenu() {
  menuGrid.innerHTML = menuItems.map(item => `
    <div class="menu-card" onclick="addToCart(${item.id})">
      <img src="${item.image}" alt="${item.name}" class="menu-card-image">
      <div class="menu-card-overlay">
        <h3>${item.name}</h3>
      </div>
      <div class="menu-card-info">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
      </div>
    </div>
  `).join('');
}

// Add Item to Cart
function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  const existingItem = cart.find(i => i.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  renderCart();
  showToast(`${item.name} added to cart`);
}

// Update Cart Item Quantity
function updateQuantity(itemId, change) {
  const item = cart.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += change;
  
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }

  renderCart();
}

// Calculate Cart Total
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render Cart
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.style.display = 'none';
    printBtn.disabled = true;
    payBtn.disabled = true;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price} each</p>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
    
    const total = getCartTotal();
    cartTotal.style.display = 'flex';
    totalAmount.textContent = `₹${total}`;
    printBtn.disabled = false;
    payBtn.disabled = false;
  }
}

// Show Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// Print Bill
function printBill() {
  const total = getCartTotal();
  const billContent = `
    ================================
        SOUTH INDIAN RESTAURANT
    ================================
    Date: ${new Date().toLocaleDateString()}
    Time: ${new Date().toLocaleTimeString()}
    --------------------------------
    ITEMS:
    ${cart.map(item => `
    ${item.name} x${item.quantity}
      ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`).join('')}
    --------------------------------
    TOTAL: ₹${total}
    ================================
        Thank you for visiting!
    ================================
  `;
  
  const printWindow = window.open('', '', 'height=600,width=400');
  printWindow.document.write('<pre style="font-family: monospace; font-size: 14px;">' + billContent + '</pre>');
  printWindow.document.close();
  printWindow.print();
}

// Complete Payment
function completePayment(method) {
  const total = getCartTotal();
  
  // Save to localStorage (simulating sales record)
  const sales = JSON.parse(localStorage.getItem('restaurant-sales') || '[]');
  sales.push({
    id: Date.now(),
    items: [...cart],
    total,
    paymentMethod: method,
    date: new Date().toISOString()
  });
  localStorage.setItem('restaurant-sales', JSON.stringify(sales));

  // Clear cart
  cart = [];
  renderCart();
  
  // Close modal
  paymentModal.classList.remove('active');
  
  showToast(`Payment of ₹${total} completed via ${method.toUpperCase()}`);
}

// Setup Event Listeners
function setupEventListeners() {
  printBtn.addEventListener('click', printBill);
  
  payBtn.addEventListener('click', () => {
    modalTotal.textContent = `₹${getCartTotal()}`;
    paymentModal.classList.add('active');
  });
  
  closeModal.addEventListener('click', () => {
    paymentModal.classList.remove('active');
  });
  
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      completePayment(btn.dataset.method);
    });
  });
}

// Start the app
init();
