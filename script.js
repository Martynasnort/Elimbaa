
emailjs.init("YOUR_USER_ID"); // Pakeisk savo EmailJS vartotojo ID

const cart = {};

function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { quantity: 1, price: price };
  } else {
    cart[name].quantity += 1;
  }
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0;

  for (const [name, data] of Object.entries(cart)) {
    total += data.price * data.quantity;
    cartItems.innerHTML += `<li>${name} (${data.quantity}) - ${ (data.price * data.quantity).toFixed(2)}€ <button onclick="changeQty('${name}', -1)">➖</button> <button onclick="changeQty('${name}', 1)">➕</button></li>`;
  }
  totalEl.textContent = total.toFixed(2);
}

function changeQty(name, delta) {
  cart[name].quantity += delta;
  if (cart[name].quantity <= 0) delete cart[name];
  renderCart();
}

function sendOrder(e) {
  e.preventDefault();
  const form = e.target;
  const items = Object.entries(cart).map(([name, data]) => `${name} x ${data.quantity}`).join(", ");
  const params = {
    vardas: form.vardas.value,
    email: form.email.value,
    uzsakymas: items || "Krepšelis tuščias"
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
    .then(() => alert("Užsakymas išsiųstas!"))
    .catch(err => alert("Klaida siunčiant: " + err));
}
