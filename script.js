// Definindo variáveis globais
let cart = [];

// Função para carregar produtos da API
async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error);
  }
}

// Função para exibir produtos no catálogo
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 50)}...</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Adicionar ao Carrinho</button>
    `;
    productList.appendChild(productCard);
  });
}

// Função para adicionar produto ao carrinho
function addToCart(id, title, price) {
  // Verifica se o produto já está no carrinho
  const existingProduct = cart.find(item => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }
  displayCart();
}

// Função para exibir o carrinho
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  
  let total = 0;
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})">Remover</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Função para remover produto do carrinho
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

// Função para finalizar a compra
function checkout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  alert('Compra finalizada com sucesso!');
  
  // Integrar com a API do AfterShip aqui para enviar notificação de confirmação de pedido
  
  cart = []; // Limpar o carrinho após a finalização da compra
  displayCart();
}

// Carregar produtos quando a página for carregada
window.onload = loadProducts;

// Adiciona evento ao botão de finalização da compra
document.getElementById('checkout-button').addEventListener('click', checkout);
