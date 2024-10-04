let icon = document.querySelector(".icon");
let navigation = document.querySelector(".navigation");
let user = document.querySelector(".icon .user h3");
let logOut = document.querySelector('.logout')

if (localStorage.getItem("userName")) {
  navigation.style.display = "none";
  icon.style.display = "flex";
  user.innerText = localStorage.getItem("userName");
}else{
  navigation.style.display = "block";
  icon.style.display = "none";
}

logOut.addEventListener("click", ()=>{
  localStorage.clear();
  setTimeout(()=>{
    window.location = './login.html'
  })
})
///////////////////////////////////////
let iconCart = document.querySelector(".icon");
let closeBtn = document.querySelector(".close");
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
/////////////////////////////////////////////
let products = document.querySelector(".listProduct");
let listProduct = [];

const addDataToHTML = () => {
  products.innerHTML = "";
  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img src="${product.image}"/>
        <h2 class="name">${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">Add To Cart</button>
      `;

      products.appendChild(newProduct);
    });
  }
};
////////////////////////////
let spanIcon = document.querySelector(".icon .icon-cart span");
let cart = [];

products.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
/////////////////////////////
let listCartHTML = document.querySelector(".listCart");

const addCartToHTML = () => {
  let totalQuantity = 0;
  if (cart.length > 0) {
    listCartHTML.innerHTML = "";
    cart.forEach((cart) => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProduct.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProduct[positionProduct];
      newCart.innerHTML = `
        <div class="image">
          <img src="${info.image}"/>
        </div>
        <div class="name">${info.name}</div>
        <div class="price">${info.price * cart.quantity}</div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${cart.quantity}</span>
          <span class="plus">></span>
        </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  spanIcon.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemCart >= 0) {
    switch (type) {
      case "plus":
        cart[positionItemCart].quantity = cart[positionItemCart].quantity + 1;
        break;
      default:
        let valueChange = cart[positionItemCart].quantity - 1;
        if (valueChange > 0) {
          cart[positionItemCart].quantity = valueChange;
        } else {
          cart.splice(positionItemCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};
///////////////////////////////////////////
let searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", () => {
  let searchInput = document.querySelector(".search input").value;
  let items = document.querySelectorAll(".listProduct .item");
  let name = document.querySelectorAll(".listProduct .item .name");

  name.forEach((element, index) => {
    // Check if text include the search value
    if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
      // display matching item
      items[index].classList.remove("hide");
    } else {
      // hide other items
      items[index].classList.add("hide");
    }
  });
});

const initApp = () => {
  fetch("js/products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToHTML();

      // get cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
