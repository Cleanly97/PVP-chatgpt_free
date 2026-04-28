let cart = [];

const filters = {
category: document.getElementById("categoryFilter"),
size: document.getElementById("sizeFilter"),
color: document.getElementById("colorFilter"),
material: document.getElementById("materialFilter")
};

const products = document.querySelectorAll(".product");

Object.values(filters).forEach(filter => {
if(filter){
filter.addEventListener("change", filterProducts);
}
});

function filterProducts() {
products.forEach(product => {

const matchCategory = !filters.category || filters.category.value === "all" || product.dataset.category === filters.category.value;
const matchSize = !filters.size || filters.size.value === "all" || product.dataset.size === filters.size.value;
const matchColor = !filters.color || filters.color.value === "all" || product.dataset.color === filters.color.value;
const matchMaterial = !filters.material || filters.material.value === "all" || product.dataset.material === filters.material.value;

if (matchCategory && matchSize && matchColor && matchMaterial) {
product.style.display = "block";
} else {
product.style.display = "none";
}
});
}

function addToCart(button) {
const product = button.parentElement;

const item = {
name: product.dataset.name,
price: Number(product.dataset.price)
};

cart.push(item);
updateCart();
}

function removeFromCart(index) {
cart.splice(index, 1);
updateCart();
}

function updateCart() {
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const total = document.getElementById("total");

if(!cartItems) return;

cartItems.innerHTML = "";

let sum = 0;

cart.forEach((item, index) => {
sum += item.price;

cartItems.innerHTML += `
<div>
${item.name} - ${item.price} kr
<button onclick="removeFromCart(${index})">Ta bort</button>
</div>
`;
});

let shipping = sum >= 599 ? 0 : 59;

total.textContent = sum + shipping;
cartCount.textContent = cart.length;
}