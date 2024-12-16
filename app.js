const products = [
    { id: 1, name: "Диван Дублин", price: 31990, img: "img/диван1.jpg", description: "Описание дивана Дублин..." },
    // Другие диваны...
];

document.addEventListener("DOMContentLoaded", () => {
    const detailsContainer = document.getElementById("product-details");
    const cartItems = document.getElementById("cart-items");

    if (detailsContainer) {
        const productId = new URLSearchParams(window.location.search).get("id");
        const product = products.find(p => p.id == productId);
        if (product) {
            detailsContainer.innerHTML = `
                <h1>${product.name}</h1>
                <img src="${product.img}" class="img-fluid" alt="${product.name}">
                <p>${product.description}</p>
                <p>Цена: ${product.price}₽</p>
                <button class="btn btn-success" onclick="addToCart(${product.id})">Добавить в корзину</button>
            `;
        }
    }

    if (cartItems) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.innerHTML = cart.map(item => `
            <div>
                <h5>${item.name}</h5>
                <p>Цена: ${item.price}₽</p>
                <p>Количество: ${item.quantity}</p>
            </div>
        `).join("");
    }
});

function addToCart(id) {
    const product = products.find(p => p.id == id);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
}