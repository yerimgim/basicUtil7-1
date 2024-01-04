// product list 정보
let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");
const companiesContainer = document.querySelector(".companies");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

const displayProducts = () => {
  productsContainer.textContent = "";

  if (filteredProducts.length < 1) {
    const noProductsEl = document.createElement("h6");
    noProductsEl.textContent = "Sorry, no products matched your search";
    productsContainer.appendChild(noProductsEl);
    return;
  }

  filteredProducts.forEach((product) => {
    const { id, title, image, price } = product;
    const productEl = document.createElement("article");
    productEl.classList.add("product");
    productEl.dataset.id = id;

    const imgEl = document.createElement("img");
    imgEl.src = image;
    imgEl.classList.add("product-img", "img");

    const footerEl = document.createElement("footer");
    const nameEl = document.createElement("h5");
    nameEl.classList.add("product-name");
    nameEl.textContent = title;

    const priceEl = document.createElement("span");
    priceEl.classList.add("product-price");
    priceEl.textContent = price;

    footerEl.appendChild(nameEl);
    footerEl.appendChild(priceEl);
    productEl.appendChild(imgEl);
    productEl.appendChild(footerEl);
    productsContainer.appendChild(productEl);
  });
};
displayProducts();

const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  buttons.forEach((companies) => {
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("company-btn");
    buttonEl.dataset.id = companies;
    buttonEl.textContent = companies;
    companiesContainer.appendChild(buttonEl);
  });
};

// 클릭 이벤트
companiesContainer.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("company-btn")) {
    if (element.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === element.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts();
  }
});

displayButtons();
