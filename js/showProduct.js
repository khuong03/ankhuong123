const url = "http://localhost:3000/product";

fetch(url)
  .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
  .then((data) => {
    const listproducts = document.querySelector("#listproducts");
    let productListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML

    data.forEach((item, index) => {
      if (index < 8) {
        productListHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 mix women">
              <div class="product__item">
                <div
                  class="product__item__pic set-bg">
                  <img src="${item.img}" alt="" />
  >
                  <ul class="product__hover">
                    <li>
                      <a href="javascript:addCart(${item.id})"><span class="icon_bag_alt"></span></a>
                    </li>
                  </ul>
                </div>
                <div class="product__item__text">
                  <h6><a href="product-details.html">${item.name}</a></h6>
                  <div class="product__price">${item.price}</div>
                </div>
              </div>
            </div>
          `;
      }
    });

    // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
    listproducts.innerHTML = productListHTML;
  })
  .catch((error) => {
    console.error("Lỗi", error);
  });
