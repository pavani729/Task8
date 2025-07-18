const products = [
  { title: "Zari Anarkali", price: 999, category: "Traditional", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRDNPa8c3GoChMJHLImE5GM2Ao0_4glFqSGUB6UZkxoUHADxk2yZMzRJeNihOIS75uaGYt4CqeszgnEpSMQ-EBDho-b9kr7i92N0CXEZ5pBq09QW_Z1oi2G" },
  { title: "Floral Nightsuit", price: 1399, category: "Fusion", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRUjpGR6dCILSTpl8cRnKxWi0QhBghU6sUeA-NVEwoZjO3TYFsRE5uYezlrIHSgIABJGaX0MppySfxCP_BM3sN-3d8ZI-6IhHv5vQxaXP0Tws329NfQaCYv" },
  { title: "Ruffle Dress", price: 1799, category: "Western", image: "https://m.media-amazon.com/images/I/71+Z7ldu4lL.jpg" },
  { title: "Bridal Lehenga", price: 1499, category: "Traditional", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRtVAou90l0PVenWjIwnxAOom5fg3GnkzHNbLpETfint9ggB1tc_yMo3Aw90eb_rX_iuDr8LzqbQhLQyl6cIC_UOh3Kdpa7ECViXeUGaanp_eMoEWOw5kXaqQ" },
  { title: "Pink Kurta Set", price: 1899, category: "Fusion", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwm8whVEXaMOFb85-wTbMWhPoZ05cHjFG1670kR2BKfj03sJ7-LBzxSUfZvGzBJJB7r1wNn5dFLiVAPYM3274186-g2inz2yJ_avzGt8ZTrTyNOv7tya4i-A" },
  { title: "Peach Frock", price: 1099, category: "Western", image: "https://m.media-amazon.com/images/I/71j-4hNASwL.jpg" },
  { title: "Banarasi Saree", price: 899, category: "Traditional", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTRkvYS1dJox9suvLzSx95NO9isqajTqVbl-CHjnEJJ_OTV-lg8Chm4z59-81ogCPio9lKfMKtqhZUndWCeOFKpkyXW1Ar-Vsd1FmOqrea3yxo4ojahmFAmHw" },
  { title: "Fusion Jumpsuit", price: 1299, category: "Fusion", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSbmXDwWmr-YCYIwXvqj_euguw0ez8cdseEpqk6Ct7pg0HmfDWS0JIp9pgOAgAf4afTnnvqkpbXf3jR1MTktMT9cSvzvt6yllwbLRo9crKOXjGE72RBe3L3Mw" },
  { title: "Yellow Kurti", price: 1199, category: "Western", image: "https://m.media-amazon.com/images/I/71jYlV7vIaL.jpg" },
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

function renderProducts(data) {
  grid.innerHTML = "";
  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function filterProducts() {
  let search = searchInput.value.toLowerCase();
  let category = categoryFilter.value;
  let sorted = priceSort.value;

  let filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.title.toLowerCase().includes(search)
  );

  if (sorted === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sorted === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

function addToCart(product) {
  const index = cart.findIndex(item => item.title === product.title);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <li>
        ${item.title} x${item.qty} - ₹${item.price * item.qty}
        <button onclick="removeItem(${i})">✕</button>
      </li>
    `;
  });
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartTotal.textContent = total ? `Total: ₹${total}` : "Cart is empty";
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("cartBtn").addEventListener("click", () => {
  cartModal.style.display = "flex";
});

function closeCart() {
  cartModal.style.display = "none";
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceSort.addEventListener("change", filterProducts);

renderProducts(products);
