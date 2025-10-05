// ================= DADOS DE PRODUTOS ================= //
// Simulando produtos do menu da cafeteria
const products = [
  {
    id: 1,
    name: "Café Expresso",
    description: "Café intenso e encorpado.",
    price: 8.50,
    image: "https://placehold.co/150x150?text=Café+Expresso"
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Café cremoso com leite e espuma.",
    price: 12.00,
    image: "https://placehold.co/150x150?text=Cappuccino"
  },
  {
    id: 3,
    name: "Mocha",
    description: "Café com chocolate e chantilly.",
    price: 14.00,
    image: "https://placehold.co/150x150?text=Mocha"
  },
 
];
// ================= VARIÁVEIS GLOBAIS ================= //
let cart = []; // Array que guarda os produtos adicionados ao carrinho

// Elementos do DOM
const productsGrid = document.getElementById("productsGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutItemsContainer = document.getElementById("checkoutItems");
const checkoutTotalEl = document.getElementById("checkoutTotal");
const thanksModal = document.getElementById("thanksModal");

// ================= FUNÇÕES ================= //

// Função para renderizar os produtos no menu
function renderProducts() {
  productsGrid.innerHTML = ""; // Limpa antes de renderizar
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <strong>R$ ${product.price.toFixed(2)}</strong>
      <button class="btn add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
    `;

    productsGrid.appendChild(productCard);
  });

  // Adicionar evento aos botões "Adicionar ao Carrinho"
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Função para adicionar produto ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const itemInCart = cart.find(item => item.id === productId);

  if (itemInCart) {
    itemInCart.quantity += 1; // Incrementa quantidade se já estiver no carrinho
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();
}

// Função para remover produto do carrinho
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Função para atualizar visualização do carrinho
function updateCart() {
  // Atualiza contador de itens
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Atualiza lista de itens do carrinho
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <strong>R$ ${(item.price * item.quantity).toFixed(2)}</strong>
      <button class="remove-btn" data-id="${item.id}">✖</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  // Adiciona evento aos botões de remover
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      removeFromCart(id);
    });
  });

  // Atualiza total
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

// ================= EVENTOS ================= //

// Abrir e fechar carrinho
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCart");

cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);

function openCart() {
  cartDrawer.classList.remove("hidden");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.add("hidden");
  cartDrawer.setAttribute("aria-hidden", "true");
}

// Limpar carrinho
document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Checkout
document.getElementById("goCheckout").addEventListener("click", () => {
  openCheckout();
});

function openCheckout() {
  // Preenche resumo do pedido
  checkoutItemsContainer.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} x ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
    checkoutItemsContainer.appendChild(div);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutTotalEl.textContent = `R$ ${totalPrice.toFixed(2)}`;

  checkoutModal.classList.remove("hidden");
  checkoutModal.setAttribute("aria-hidden", "false");
  closeCart();
}

// Voltar ao carrinho
document.getElementById("backToCart").addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
  checkoutModal.setAttribute("aria-hidden", "true");
  openCart();
});

// Fechar modal checkout
document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
  checkoutModal.setAttribute("aria-hidden", "true");
});

// Finalizar pedido
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Aqui você poderia enviar os dados para um servidor real

  // Limpar carrinho
  cart = [];
  updateCart();

  // Fechar checkout e abrir thanks modal
  checkoutModal.classList.add("hidden");
  checkoutModal.setAttribute("aria-hidden", "true");

  thanksModal.classList.remove("hidden");
  thanksModal.setAttribute("aria-hidden", "false");
});

// Fechar modal de agradecimento
document.getElementById("closeThanks").addEventListener("click", () => {
  thanksModal.classList.add("hidden");
  thanksModal.setAttribute("aria-hidden", "true");
});

// ================= INICIALIZAÇÃO ================= //
renderProducts(); // Renderiza os produtos quando a página carrega
updateCart();     // Atualiza carrinho inicial