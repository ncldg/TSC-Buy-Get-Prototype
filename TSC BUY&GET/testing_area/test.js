// ==================== CART DATA ====================
var cartItems = [];
var cartPanel = null;

// ==================== TOGGLE CART ====================
function toggleCart() {
    console.log('Toggle cart clicked');
    
    cartPanel = document.getElementById('slide-panel');
    
    if (cartPanel) {
        // Close panel
        cartPanel.classList.remove('open');
        setTimeout(function() {
            if (cartPanel.parentNode) {
                cartPanel.parentNode.removeChild(cartPanel);
            }
        }, 300);
    } else {
        // Open panel
        openCartPanel();
    }
}

// ==================== OPEN CART PANEL ====================
function openCartPanel() {
    // Create panel
    cartPanel = document.createElement('div');
    cartPanel.id = 'slide-panel';
    
    updateCartPanelHTML();
    
    document.body.appendChild(cartPanel);
    
    // Open animation
    setTimeout(function() {
        cartPanel.classList.add('open');
    }, 10);
}

// ==================== UPDATE CART PANEL HTML ====================
function updateCartPanelHTML() {
    var itemCount = cartItems.reduce(function(sum, item) { 
        return sum + item.quantity; 
    }, 0);
    
    var total = cartItems.reduce(function(sum, item) { 
        return sum + (item.price * item.quantity); 
    }, 0);
    
    var cartItemsHTML = '';
    
    if (cartItems.length > 0) {
        cartItems.forEach(function(item, index) {
            cartItemsHTML += '<div class="cart-item">';
            cartItemsHTML += '<div class="cart-item-image"><img src="' + item.image + '"></div>';
            cartItemsHTML += '<div>';
            cartItemsHTML += '<h3 class="item-name">' + item.name + '</h3>';
            cartItemsHTML += '<p class="item-price">Php ' + item.price.toFixed(2) + '</p>';
            cartItemsHTML += '<div class="quantity-controls">';
            cartItemsHTML += '<button class="qty-btn" onclick="updateQuantity(' + index + ', -1)">-</button>';
            cartItemsHTML += '<span>' + item.quantity + '</span>';
            cartItemsHTML += '<button class="qty-btn" onclick="updateQuantity(' + index + ', 1)">+</button>';
            cartItemsHTML += '</div></div>';
            cartItemsHTML += '<div class="cart-item-actions">';
            cartItemsHTML += '<button class="remove-btn" onclick="removeFromCart(' + index + ')">X</button>';
            cartItemsHTML += '<p class="item-subtotal">Php ' + (item.price * item.quantity).toFixed(2) + '</p>';
            cartItemsHTML += '</div></div>';
        });
    }
    
    var emptyHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
    var footerHTML = cartItems.length > 0 ?
        '<div class="slide-footer"><div class="summary-row total"><span>Total</span><span>Php ' + total.toFixed(2) + '</span></div><button class="checkout-btn" onclick="checkout()">Checkout</button></div>' : '';
    
    cartPanel.innerHTML = '<div class="slide-header"><h2>Shopping Cart (' + itemCount + ')</h2><button class="close-btn" onclick="toggleCart()">X</button></div>' +
        '<div class="slide-content">' + (cartItems.length > 0 ? cartItemsHTML : emptyHTML) + '</div>' +
        footerHTML;
}

// ==================== ADD TO CART ====================
function addToCart(name, price, image, qtyId) {
    var qtyInput = document.getElementById(qtyId);
    var quantity = parseInt(qtyInput.value) || 1;
    if (quantity < 1) quantity = 1;
    
    // Check if item exists
    var existingItem = cartItems.find(function(item) {
        return item.name === name;
    });
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            name: name,
            price: price,
            quantity: quantity,
            image: image
        });
    }
    
    // Update badge
    updateBadge();
    
    // Show notification
    alert(name + ' added to cart!');
    
    // Reset quantity
    qtyInput.value = 1;
}

// ==================== UPDATE QUANTITY ====================
function updateQuantity(index, change) {
    cartItems[index].quantity += change;
    
    if (cartItems[index].quantity < 1) {
        cartItems.splice(index, 1);
    }
    
    updateBadge();
    updateCartPanelHTML();
}

// ==================== REMOVE FROM CART ====================
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateBadge();
    updateCartPanelHTML();
}

// ==================== UPDATE BADGE ====================
function updateBadge() {
    var badge = document.getElementById('cart-badge');
    var totalItems = cartItems.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
    
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// ==================== CHECKOUT ====================
function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    var total = cartItems.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    
    alert('Thank you for your purchase! Total: Php ' + total.toFixed(2));
    
    cartItems = [];
    updateBadge();
    toggleCart();
}