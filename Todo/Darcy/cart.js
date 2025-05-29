let cart = []; // Reemplaza con tu número de WhatsApp

function initializeCart() {
    // Agregar el HTML del carrito
    document.body.innerHTML += `
        <div class="cart-icon" onclick="toggleCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count">0</span>
        </div>
        <div class="cart-container">
            <div class="cart-header">
                <h2>Carrito</h2>
                <button class="close-cart" onclick="toggleCart()">×</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-total">
                <h3>Total: $<span id="cart-total-amount">0</span></h3>
                <button class="send-order-btn" onclick="sendOrder()">Enviar Pedido por WhatsApp</button>
            </div>
        </div>
    `;
}

// Nueva función para inicializar los botones del carrito
function initializeCartButtons() {
    const productDescriptions = document.querySelectorAll('.product-description');
    productDescriptions.forEach(product => {
        const priceButtons = product.querySelector('.price-buttons');
        const productName = product.querySelector('h3').textContent;
        
        const buttons = priceButtons.querySelectorAll('button');
        buttons.forEach(button => {
            // Extraer solo los números del texto del botón y eliminar cualquier punto o coma
            const priceText = button.textContent.match(/\$(\d+)/)[1];
            const price = parseInt(priceText.replace(/\./g, ''));
            const size = button.textContent.includes('Grande') ? 'Grande' : 'Normal';
            button.onclick = () => addToCart(productName, price, size);
        });
    });
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.getElementById('cart-total-amount');

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name} ${item.extras ? `(${item.extras})` : ''}</h4>
                    <p>$${item.price.toLocaleString('es-CO')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    cartCount.textContent = count;
    totalAmount.textContent = total.toLocaleString('es-CO');
}

function toggleCart() {
    const cart = document.querySelector('.cart-container');
    cart.classList.toggle('active');
}

function addToCart(name, price, size) {
    // Determinar los adicionales basados en el texto del botón
    let extras = '';
    const button = event.target;
    if (button.textContent.includes('Con papa')) {
        extras = 'con papas';
    } else if (button.textContent.includes('Con huevo')) {
        extras = 'con huevo';
    } else if (button.textContent.includes('Con aros')) {
        extras = 'con aros de cebolla';
    } else if (button.textContent.includes('Para dos')) {
        extras = 'tamaño para dos personas';
    } else if (button.textContent.includes('Para tres')) {
        extras = 'tamaño para tres personas';
    }

    const item = {
        name,
        price,
        size,
        extras,
        quantity: 1
    };

    const existingItem = cart.find(i => 
        i.name === name && 
        i.size === size && 
        i.extras === extras
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    updateCartDisplay();
}

function sendOrder() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
    let total = 0;

    cart.forEach(item => {
        let itemDescription = `${item.quantity}x ${item.name}`;
        if (item.extras) {
            itemDescription += ` ${item.extras}`;
        }
        const itemTotal = item.price * item.quantity;
        itemDescription += ` - $${itemTotal.toLocaleString('es-CO')}\n`;
        message += itemDescription;
        total += itemTotal;
    });

    message += `\nTotal: $${total.toLocaleString('es-CO')}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${+573103379414}?text=${encodedMessage}`, '_blank');

    // Limpiar el carrito después de enviar el pedido
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeCart);