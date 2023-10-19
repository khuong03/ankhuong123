let renderproduct = (currentPage, itemsPerPage) => {
  const url = "http://localhost:3000/product";
  fetch(url)
    .then((response) => response.json()) // dùng câu lệnh này để tự động về parse => hướng đối tượng Js
    .then((data) => {
      const listproducts = document.querySelector("#shopproduct");
      let productListHTML = ""; // Khởi tạo một chuỗi rỗng để tích luỹ HTML

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const currentPageData = data.slice(startIndex, endIndex);

      currentPageData.forEach((item) => {
        productListHTML += `
      <div class="col-lg-4 col-md-6">
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
                    <h6><a href="product-details.html?id=${item.id}">${item.name}</a></h6>
                    <div class="product__price">${item.price}</div>
                  </div>
                </div>
              </div>
        `;
      });

      // Sau khi vòng lặp hoàn thành, đặt innerHTML của listproducts
      listproducts.innerHTML = productListHTML;

      // Tạo phân trang
      const totalPages = Math.ceil(data.length / itemsPerPage);
      const paginationContainer = document.getElementById("pagination");
      let paginationHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<li><a href="#" onclick="changePage(${i})">${i}</a></li>`;
      }

      paginationContainer.innerHTML = paginationHTML;
    })
    .catch((error) => {
      console.error("Lỗi", error);
    });
};
function changePage(page) {
  // Gọi lại hàm renderproduct với trang mới
  renderproduct(page, itemsPerPage);
}

const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
renderproduct(1, itemsPerPage); // Hiển thị trang đầu tiên khi trang web được tải lên
