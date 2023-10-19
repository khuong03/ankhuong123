const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const priceElement = document.querySelector(".price");
const main_name = document.querySelector(".main-name");
const imgPro = document.querySelector(
  ".product__details__pic__slider owl-carousel img"
);
const mota = document.querySelector(".product__details__text p");
if (productId) {
  fetch("http://localhost:3000/product")
    .then((response) => response.json())
    .then((data) => {
      let singleProduct = data.filter((product) => product.id == productId);
      priceElement.textContent = singleProduct[0].price + " VND";
      main_name.textContent = singleProduct[0].name;
      imgPro.src = singleProduct[0].img;
      mota.textContent = singleProduct[0].description;
    });
}
