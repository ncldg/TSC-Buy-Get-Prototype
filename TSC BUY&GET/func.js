


//  CART FUNCTIONALITY 

let cartItems = [
      { id: 1, name: 'Spring Notebook', price: 25.00, quantity: 1, image: 'images/spring.jpg' },
      { id: 2, name: 'flexStick Ballpen', price: 15.00, quantity: 2, image: 'images/ballpen.jpg' },
      { id: 3, name: 'Correction Tape', price: 30.00, quantity: 1, image: 'images/correction.jpg' }
    ];

    // Main cart click event
    document.getElementById('cart').addEventListener('click', function() {
      // Remove existing panel if open
      const existingPanel = document.getElementById('slide-panel');
      if (existingPanel) {
        existingPanel.remove();
        return;
      }

      const slide = document.createElement('div');
      slide.id = 'slide-panel';

      // Calculate totals
      const itemCount = cartItems.reduce(function(sum, item) { return sum + item.quantity; }, 0);
      const total = cartItems.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);

      // Generate cart items HTML
      var cartItemsHTML = '';
      for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        cartItemsHTML += '<div class="cart-item" data-id="' + item.id + '">';
        cartItemsHTML += '<div class="cart-item-image"><img src="' + item.image + '" alt="' + item.name + '" onerror="this.src=\'https://via.placeholder.com/80\'"></div>';
        cartItemsHTML += '<div class="cart-item-details">';
        cartItemsHTML += '<h3 class="item-name">' + item.name + '</h3>';
        cartItemsHTML += '<p class="item-price">Php' + item.price.toFixed(2) + '</p>';
        cartItemsHTML += '<div class="quantity-controls">';
        cartItemsHTML += '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', -1)">-</button>';
        cartItemsHTML += '<span class="qty-value">' + item.quantity + '</span>';
        cartItemsHTML += '<button class="qty-btn" onclick="updateQuantity(' + item.id + ', 1)">+</button>';
        cartItemsHTML += '</div></div>';
        cartItemsHTML += '<div class="cart-item-actions">';
        cartItemsHTML += '<button class="remove-btn" onclick="removeFromCart(' + item.id + ')">✕</button>';
        cartItemsHTML += '<p class="item-subtotal">Php' + (item.price * item.quantity).toFixed(2) + '</p>';
        cartItemsHTML += '</div></div>';
      }

      // Build full HTML
      var emptyCartHTML = '<div class="empty-cart"><p>Your cart is empty</p><button class="continue-shopping" onclick="closeSlide()">Continue Shopping</button></div>';
      var footerHTML = '';
      
      if (cartItems.length > 0) {
        footerHTML = '<div class="slide-footer"><div class="cart-summary"><div class="summary-row"><span>Subtotal</span><span>Php' + total.toFixed(2) + '</span></div><div class="summary-row"><span>Shipping</span><span>Free</span></div><div class="summary-row total"><span>Total</span><span>Php' + total.toFixed(2) + '</span></div></div><button class="checkout-btn">Proceed to Checkout</button><button class="continue-shopping-btn" onclick="closeSlide()">Continue Shopping</button></div>';
      }

      slide.innerHTML = '<div class="slide-header"><div class="header-title"><h2>Shopping Cart</h2><span class="item-count">' + itemCount + ' items</span></div><button class="close-btn" onclick="closeSlide()">&times;</button></div><div class="slide-content">' + (cartItems.length > 0 ? cartItemsHTML : emptyCartHTML) + '</div>' + footerHTML;

      // Inject styles
      var style = document.createElement('style');
      style.textContent = '#slide-panel { position: fixed; top: 0; right: -520px; width: 500px; max-width: 100%; height: 100vh; background-color: #fff; transition: right 0.4s ease-in-out; z-index: 9999; box-shadow: -4px 0 20px rgba(0,0,0,0.15); display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; } #slide-panel .slide-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #eee; background: #f9f9f9; } #slide-panel .header-title h2 { margin: 0; font-size: 22px; color: #333; } #slide-panel .item-count { font-size: 14px; color: #666; } #slide-panel .close-btn { background: none; border: none; font-size: 32px; color: #999; cursor: pointer; padding: 0; line-height: 1; } #slide-panel .close-btn:hover { color: #333; } #slide-panel .slide-content { flex: 1; overflow-y: auto; padding: 20px; } #slide-panel .cart-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #eee; } #slide-panel .cart-item-image { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; background: #f5f5f5; flex-shrink: 0; } #slide-panel .cart-item-image img { width: 100%; height: 100%; object-fit: cover; } #slide-panel .cart-item-details { flex: 1; display: flex; flex-direction: column; gap: 6px; } #slide-panel .item-name { margin: 0; font-size: 15px; font-weight: 600; color: #333; } #slide-panel .item-price { margin: 0; font-size: 14px; color: #666; } #slide-panel .quantity-controls { display: flex; align-items: center; gap: 12px; margin-top: 4px; } #slide-panel .qty-btn { width: 28px; height: 28px; border: 1px solid #ddd; background: #fff; border-radius: 6px; cursor: pointer; font-size: 16px; } #slide-panel .qty-btn:hover { background: #f5f5f5; } #slide-panel .qty-value { font-size: 15px; font-weight: 500; min-width: 20px; text-align: center; } #slide-panel .cart-item-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; } #slide-panel .remove-btn { background: none; border: none; color: #999; cursor: pointer; font-size: 18px; } #slide-panel .remove-btn:hover { color: #e74c3c; } #slide-panel .item-subtotal { margin: 0; font-size: 16px; font-weight: 600; color: #333; } #slide-panel .empty-cart { display: flex; flex-direction: column; align-items: center; padding: 60px 20px; text-align: center; } #slide-panel .empty-cart p { font-size: 18px; color: #666; margin-bottom: 20px; } #slide-panel .continue-shopping, #slide-panel .continue-shopping-btn { padding: 12px 24px; background: #333; color: #fff; border: none; border-radius: 8px; cursor: pointer; } #slide-panel .slide-footer { padding: 24px; border-top: 1px solid #eee; background: #f9f9f9; } #slide-panel .cart-summary { margin-bottom: 20px; } #slide-panel .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #666; } #slide-panel .summary-row.total { margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 18px; font-weight: 700; color: #333; } #slide-panel .checkout-btn { width: 100%; padding: 16px; background: #27ae60; color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 10px; } #slide-panel .checkout-btn:hover { background: #219a52; } #slide-panel .continue-shopping-btn { width: 100%; padding: 14px; background: transparent; color: #666; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; }';

      document.head.appendChild(style);
      document.body.appendChild(slide);

      // Open animation
      setTimeout(function() {
        slide.style.right = '0';
      }, 10);
    });

    // Close slide function
    function closeSlide() {
      var slide = document.getElementById('slide-panel');
      if (slide) {
        slide.style.right = '-520px';
        setTimeout(function() {
          slide.remove();
        }, 400);
      }
    }

    // Update quantity function
    function updateQuantity(id, change) {
      var item = null;
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
          item = cartItems[i];
          break;
        }
      }
      if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
          removeFromCart(id);
        } else {
          document.getElementById('cart').click();
        }
      }
    }

    // Remove from cart function
    function removeFromCart(id) {
      var newCart = [];
      for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id !== id) {
          newCart.push(cartItems[i]);
        }
      }
      cartItems = newCart;
      document.getElementById('cart').click();
    }




/*

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  var productPrice = 25.00;
  var selectedSize = 'Short';
  var quantity = 1;
  
  // DOM Elements
  var itemButton = document.getElementById('itemButton');
  var modalOverlay = document.getElementById('modalOverlay');
  var modalClose = document.getElementById('modalClose');  // FIXED: was closeModalBtn
  var sizeOptions = document.querySelectorAll('.size-option');
  var qtyMinus = document.getElementById('qtyMinus');
  var qtyPlus = document.getElementById('qtyPlus');
  var qtyValue = document.getElementById('qtyValue');
  var totalPrice = document.getElementById('totalPrice');
  var addToCartBtn = document.getElementById('addToCart');
  
  // Open modal
  itemButton.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    quantity = 1;
    selectedSize = 'Short';
    updateQuantityDisplay();
  });
  
  // Close modal - FIXED: use modalClose instead of closeModalBtn
  modalClose.addEventListener('click', function() {  // FIXED
    modalOverlay.classList.remove('active');
  });
  
  // Close when clicking outside
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
  
  // Size selection
  document.addEventListener('DOMContentLoaded', function() {
      var sizeButtons = document.querySelectorAll('.opt');
      
      sizeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          // Toggle green color on/off
          this.classList.toggle('active');
        });
      });
    });
  
  // Quantity controls
  qtyMinus.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      updateQuantityDisplay();
    }
  });
  
  qtyPlus.addEventListener('click', function() {
    quantity++;
    updateQuantityDisplay();
  });
  
  // Update display
  function updateQuantityDisplay() {
    qtyValue.textContent = quantity;
    var total = productPrice * quantity;
    totalPrice.textContent = 'Php ' + total.toFixed(2);
  }
  
  // Add to cart
  addToCartBtn.addEventListener('click', function() {
    var cartItem = {
      name: 'White Folder',
      size: selectedSize,
      price: productPrice,
      quantity: quantity,
      total: productPrice * quantity
    };
    
    alert('Added to cart!\n\nSize: ' + selectedSize + '\nQuantity: ' + quantity + '\nTotal: Php ' + (productPrice * quantity).toFixed(2));
    
    modalOverlay.classList.remove('active');
    
    console.log('Cart Item:', cartItem);
  });
  
});
*/

// Size selection (toggle green)
document.addEventListener('DOMContentLoaded', function() {
      
      // SELECT THE BUTTONS - Use '.opt' not '.size-option'
      var sizeButtons = document.querySelectorAll('.opt');
      
      // Add click event to each button
      sizeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          // Toggle green color on/off
          this.classList.toggle('active');
        });
      });
      
    });

      