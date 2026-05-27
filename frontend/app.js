let products = [];
let cart = [];
let wishlist = new Set(
  JSON.parse(
    localStorage.getItem('wishlist')
  ) || []
);
let currentCat = 'All';
let currentSearch = '';
let maxPrice = 1000;
let minRating = 0;
let viewMode = 'grid';

async function loadProducts() {
  try {

    const response = await fetch(
      'http://localhost:5000/api/products'
    );

    products = await response.json();

    updateCategoryCounts();

    renderProducts();

  } catch (error) {
    console.error(error);
  }
}

async function fetchCart() {

  try {

    const response = await fetch(
      'http://localhost:5000/api/cart'
    );

    cart = await response.json();

    updateCart();

  } catch (error) {
    console.error(error);
  }
}

function updateCategoryCounts() {

  document.getElementById('count-all').textContent =
    products.length;

  document.getElementById('count-Accessories').textContent =
    products.filter(p => p.cat === 'Accessories').length;

  document.getElementById('count-Apparel').textContent =
    products.filter(p => p.cat === 'Apparel').length;

  document.getElementById('count-Fragrance').textContent =
    products.filter(p => p.cat === 'Fragrance').length;

  document.getElementById('count-Footwear').textContent =
    products.filter(p => p.cat === 'Footwear').length;

  document.getElementById('count-Wellness').textContent =
    products.filter(p => p.cat === 'Wellness').length;

  document.getElementById('count-Sale').textContent =
    products.filter(p => p.badge === 'Sale').length;
}

function getFiltered() {

  let filtered = products.filter(p => {

    if(currentCat === 'All') {}

    else if(currentCat === 'Sale') {

      if(!p.badge || p.badge !== 'Sale')
        return false;
    }

    else if(p.cat !== currentCat)
      return false;

    if(p.price > maxPrice)
      return false;

    if(p.rating < minRating)
      return false;

    if(
      currentSearch &&
      !p.name.toLowerCase().includes(currentSearch) &&
      !p.brand.toLowerCase().includes(currentSearch)
    )
      return false;

    return true;
  });

  const sort =
    document.getElementById('sort-select').value;

  if(sort === 'price-asc')
    filtered.sort((a,b)=>a.price-b.price);

  else if(sort === 'price-desc')
    filtered.sort((a,b)=>b.price-a.price);

  else if(sort === 'rating')
    filtered.sort((a,b)=>b.rating-a.rating);

  else if(sort === 'name')
    filtered.sort((a,b)=>a.name.localeCompare(b.name));

  return filtered;
}

function renderProducts() {

  const filtered = getFiltered();

  const grid =
    document.getElementById('product-grid');

  document.getElementById('result-count')
    .textContent =
      filtered.length + ' products';

  grid.className =
    'product-grid' +
    (viewMode === 'list'
      ? ' list-view'
      : '');

  grid.innerHTML = filtered.map(p => {

    const isLiked = wishlist.has(p._id);

    const inCart =
      cart.find(c => c._id === p._id);

    return `
      <div class="card"
           onclick="openModal('${p._id}')">

        <div class="card-img">

          ${p.badge
            ? `<div class="card-badge ${p.badge.toLowerCase()}">${p.badge}</div>`
            : ''}

          <button class="wishlist-btn ${isLiked ? 'liked' : ''}"
                  onclick="toggleWishlist(${p.id}, event)">

            <i class="ti ti-heart${isLiked ? '-filled' : ''}"></i>

          </button>

          <img src="${p.image}" class="product-image">

        </div>

        <div class="card-info">

          <div class="card-brand">
            ${p.brand}
          </div>

          <div class="card-name">
            ${p.name}
          </div>

          <div class="card-stars">

            ${'★'.repeat(Math.floor(p.rating))}
            ${'☆'.repeat(5 - Math.floor(p.rating))}

            <span>
              ${p.rating} (${p.reviews})
            </span>

          </div>

          <div class="card-price">

            <span class="price">
              ₹${p.price}
            </span>


            ${p.oldPrice
              ? `<span class="price-old">₹${p.oldPrice}</span>`
              : ''}

          </div>

          <button class="add-btn ${inCart ? 'added' : ''}"
                  onclick="event.stopPropagation(); addToCart('${p._id}')">

            <i class="ti ti-shopping-bag"></i>

            ${inCart ? 'In Bag' : 'Add to Bag'}

          </button>

        </div>

      </div>
    `;

  }).join('');
}

async function addToCart(id) {

  try {

    await fetch(
      'http://localhost:5000/api/cart',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id,
          qty:1
        })
      }
    );

    await fetchCart();

    renderProducts();

    showToast('Added to cart');

  } catch (error) {
    console.error(error);
  }
}

async function removeFromCart(id) {

  try {

    await fetch(
      `http://localhost:5000/api/cart/${id}`,
      {
        method:'DELETE'
      }
    );

    await fetchCart();

    renderCartPanel();

    renderProducts();

  } catch (error) {
    console.error(error);
  }
}

function updateCart() {

  const total =
    cart.reduce((sum,item)=>
      sum + item.qty,0);

  const badge =
    document.getElementById('cart-count');

  badge.style.display =
    total > 0 ? 'flex' : 'none';

  badge.textContent = total;
}

function renderCartPanel() {

  const itemsEl =
    document.getElementById('cart-items');

  const footer =
    document.getElementById('cart-footer');

  if(cart.length === 0) {

    itemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="ti ti-shopping-bag"></i>
        <p>Your bag is empty</p>
      </div>
    `;

    footer.innerHTML = '';

    return;
  }

  itemsEl.innerHTML = cart.map(item => `

    <div class="cart-item">

     <div class="cart-item-img">
   <img src="${item.image}" class="product-image">
</div>

      <div>

        <div class="cart-item-name">
          ${item.name}
        </div>

        <div class="cart-item-price">
          ₹${item.price}
        </div>

        <div class="qty-control">

          <button class="qty-btn"
                  onclick="changeQty(${item.id},-1)">
            -
          </button>

          <span class="qty-num">
            ${item.qty}
          </span>

          <button class="qty-btn"
                  onclick="changeQty(${item.id},1)">
            +
          </button>

        </div>

      </div>

      <button class="remove-btn"
              onclick="removeFromCart(${item.id})">

        <i class="ti ti-trash"></i>

      </button>

    </div>

  `).join('');

  const subtotal =
    cart.reduce((sum,item)=>
      sum + (item.price * item.qty),0);

  footer.innerHTML = `

    <div class="cart-summary">

      <div class="summary-row">
        <span>Subtotal</span>
        <span>₹${subtotal}</span>
      </div>

      <div class="summary-row">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div class="summary-row total">
        <span>Total</span>
        <span class="price">₹${subtotal}</span>
      </div>

    </div>

    <button class="checkout-btn"
            onclick="checkout()">
      Checkout
    </button>

  `;
}

function filterCategory(cat) {

  currentCat = cat;

  document
    .querySelectorAll('.pill')
    .forEach(p=>p.classList.remove('active'));

  renderProducts();
}

function showNewArrivals() {

  const filtered = products.filter(
    p => p.badge === 'New'
  );

  const grid =
    document.getElementById('product-grid');

  document.getElementById('result-count')
    .textContent =
      filtered.length + ' new arrivals';

  grid.innerHTML = filtered.map(p => {

    const isLiked = wishlist.has(p._id);

    const inCart =
      cart.find(c => c._id === p._id);

    return `
      <div class="card"
           onclick="openModal('${p._id}')">

        <div class="card-img">

          <div class="card-badge new">
            New
          </div>

          <button class="wishlist-btn ${isLiked ? 'liked' : ''}"
                  onclick="toggleWishlist(${p.id}, event)">

            <i class="ti ti-heart${isLiked ? '-filled' : ''}"></i>

          </button>

          <img src="${p.image}" class="product-image">

        </div>

        <div class="card-info">

          <div class="card-brand">
            ${p.brand}
          </div>

          <div class="card-name">
            ${p.name}
          </div>

          <div class="card-price">
            ₹${p.price}
          </div>

          <button class="add-btn ${inCart ? 'added' : ''}"
                  onclick="event.stopPropagation(); addToCart('${p._id}')">

            <i class="ti ti-shopping-bag"></i>

            ${inCart ? 'In Bag' : 'Add to Bag'}

          </button>

        </div>

      </div>
    `;

  }).join('');
}

function searchProducts(q) {

  currentSearch = q.toLowerCase();

  renderProducts();
}

function sortProducts() {
  renderProducts();
}

function filterByPrice(v) {

  maxPrice = parseInt(v);

  document.getElementById('price-max')
    .textContent = '₹' + v;

  renderProducts();
}

function filterRating(r) {

  minRating = r;

  renderProducts();
}

function setView(v) {

  viewMode = v;

  document.getElementById('grid-btn')
    .classList.toggle('active', v==='grid');

  document.getElementById('list-btn')
    .classList.toggle('active', v==='list');

  renderProducts();
}

function openCart() {

  renderCartPanel();

  document.getElementById('cart-panel')
    .classList.add('open');

  document.getElementById('cart-overlay')
    .classList.add('open');
}

function closeCart() {

  document.getElementById('cart-panel')
    .classList.remove('open');

  document.getElementById('cart-overlay')
    .classList.remove('open');
}

function toggleWishlist(id,e) {

  e.stopPropagation();

  if(wishlist.has(id))
    wishlist.delete(id);

  else
    wishlist.add(id);
  localStorage.setItem(
  'wishlist',
  JSON.stringify([...wishlist])
);

  renderProducts();
}

function showToast(msg) {

  const t =
    document.getElementById('toast');

  document.getElementById('toast-msg')
    .textContent = msg;

  t.classList.add('show');

  setTimeout(()=>{
    t.classList.remove('show');
  },2500);
}

function openModal(id) {

  const p =
    products.find(x=>x.id===id);

  const modal =
    document.getElementById('modal-content');

  modal.innerHTML = `

    <button class="modal-close"
            onclick="closeModal()">

      <i class="ti ti-x"></i>

    </button>

    <div class="modal-img">
   <img src="${p.image}" class="product-image">
</div>

    <div class="modal-info">

      <div class="modal-brand">
        ${p.brand}
      </div>

      <h2 class="modal-name">
        ${p.name}
      </h2>

      <p class="modal-desc">
        ${p.desc}
      </p>

      <div class="modal-price">
        ₹${p.price}
      </div>

      <button class="modal-add"
              onclick="addToCart('${p._id}'); closeModal()">

        Add to Bag

      </button>

    </div>
  `;

  document.getElementById('modal-overlay')
    .classList.add('open');
}

function closeModal() {

  document.getElementById('modal-overlay')
    .classList.remove('open');
}

async function checkout() {

  try {

    const token = localStorage.getItem("token");

    if(!token){
      showToast("Please login first");
      return;
    }

    if(cart.length === 0){
      showToast("Cart is empty");
      return;
    }

    const total = cart.reduce(
      (sum,item)=>sum + item.price * item.qty,
      0
    );

    const response = await fetch(
      "http://localhost:5000/api/orders",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + token
        },
        body:JSON.stringify({
          items: cart,
          totalPrice: total
        })
      }
    );

    const data = await response.json();

    console.log(data);

    cart = [];

    updateCart();

    renderCartPanel();

    closeCart();

    document.getElementById("success-modal")
      .classList.add("open");

  } catch(error){

    console.log(error);

    showToast("Checkout failed");

  }

}

function closeSuccess() {

  document.getElementById('success-modal')
    .classList.remove('open');
}

function changeQty(id,delta) {

  const item =
    cart.find(c=>c.id===id);

  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0) {

    cart = cart.filter(
      c=>c.id!==id
    );
  }

  updateCart();

  renderCartPanel();
}

function toggleSearch() {

  document.getElementById('search-input')
    .focus();
}

function showSection(section) {

  document.getElementById('shop-section')
    .scrollIntoView({
      behavior:'smooth'
    });
}

/* AUTH SYSTEM */

function openAuthModal(){

  document.getElementById('auth-overlay')
    .classList.add('open');
}

function closeAuthModal(){

  document.getElementById('auth-overlay')
    .classList.remove('open');
}

function showLogin(){

  document.getElementById('login-form')
    .style.display = 'block';

  document.getElementById('signup-form')
    .style.display = 'none';

  document.getElementById('login-tab')
    .classList.add('active');

  document.getElementById('signup-tab')
    .classList.remove('active');
}

function showSignup(){

  document.getElementById('signup-form')
    .style.display = 'block';

  document.getElementById('login-form')
    .style.display = 'none';

  document.getElementById('signup-tab')
    .classList.add('active');

  document.getElementById('login-tab')
    .classList.remove('active');
}

async function signupUser(){

  const name =
    document.getElementById('signup-name').value;

  const email =
    document.getElementById('signup-email').value;

  const password =
    document.getElementById('signup-password').value;

  const response = await fetch(
    'http://localhost:5000/api/auth/signup',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  const data = await response.json();

  showToast('Account created');

  showLogin();
}

async function loginUser(){

  const email =
    document.getElementById('login-email').value;

  const password =
    document.getElementById('login-password').value;

  const response = await fetch(
    'http://localhost:5000/api/auth/login',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      })
    }
  );

  const data = await response.json();

  if(data.token){

    localStorage.setItem(
      'token',
      data.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    showToast('Login successful');

    closeAuthModal();

    showLoggedInUser();

  }else{

    showToast(data.message);
  }
}

function showLoggedInUser(){

  const user = JSON.parse(
    localStorage.getItem('luxeUser')
  );

  const loggedIn =
    localStorage.getItem('loggedIn');

  if(user && loggedIn){

    const existing =
      document.querySelector('.user-name');

    if(existing) return;

    document.querySelector('.nav-right')
      .insertAdjacentHTML(
        'beforeend',
        `
          <span class="user-name">
            ${user.name}
          </span>
        `
      );
  }
}

function togglePassword(id, icon){

  const input =
    document.getElementById(id);

  if(input.type === 'password'){

    input.type = 'text';

    icon.className = 'ti ti-eye-off';

  }else{

    input.type = 'password';

    icon.className = 'ti ti-eye';
  }
}

window.onload = () => {

  loadProducts();

  fetchCart();

  showLoggedInUser();
};