const count = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  if (cart.length > 0) {
    document.querySelector("#cart-count").innerHTML = cart.length;
  } else {
    document.querySelector("#cart-count").innerHTML = 0;
  }
  console.log(document.querySelector("#cart-count"));
};
count();

const addCart = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  var check = false;
  cart.forEach((element) => {
    if (element.id === id) {
      element.quantity = element.quantity + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      check = true;
    }
  });
  if (!check) {
    const url = "http://localhost:3000/product";

    fetch(url)
      .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
      .then((data) => {
        const product = data.filter((products) => products.id === id);
        console.log(product);
        productNew = {
          id: product[0].id,
          img: product[0].img,
          name: product[0].name,
          price: product[0].price,
          quantity: 1,
        };
        cart.push(productNew);
        localStorage.setItem("cart", JSON.stringify(cart));
      })
      .catch((error) => {
        console.error("Lỗi", error);
      });
  }
  count();
};

const sumTotal = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  Total = 0;
  cart.forEach((item, index) => {
    Total += item.quantity * item.price;
  });
  document.querySelector("#total-price").innerHTML = Total;
};
sumTotal();

const showCart = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const listproducts = document.querySelector("#giohang");
  let productListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML

  cart.forEach((item, index) => {
    productListHTML += `
      <tr>
      <td class="cart__product__item">
        <img src="${item.img}" alt="" width="100px"/>
        <div class="cart__product__item__title">
          <h6>${item.name}</h6>
        </div>
      </td>
      <td class="cart__price">${item.price}</td>
      <td class="cart__quantity">
                      <div class="pro-qty"><span onclick='decQuantity(${
                        item.id
                      })' class="dec qtybtn">-</span>
                        <input type="text" value="${item.quantity}">
                      <span onclick='incQuantity(${
                        item.id
                      })' class="inc qtybtn">+</span></div>
                    </td>
      <td class="cart__total">${item.price * item.quantity}</td>
      <td class="cart__close">
        <span  onclick='deleteCart(${item.id})' class="icon_close"></span>
      </td>
    </tr>
          `;
  });

  // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
  listproducts.innerHTML = productListHTML;
};
showCart();

const incQuantity = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  cart.forEach((element) => {
    if (element.id === id) {
      element.quantity = element.quantity + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
  sumTotal();
  showCart();
};
const decQuantity = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  cart.forEach((element) => {
    if (element.id === id) {
      if (element.quantity > 1) {
        element.quantity = element.quantity - 1;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  });
  showCart();
  sumTotal();
};

const deleteCart = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const updatedProducts = cart.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedProducts));
  showCart();
  count();
};
