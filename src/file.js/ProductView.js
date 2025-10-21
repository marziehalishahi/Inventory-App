import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector('#search-input');
const selectedSort = document.querySelector('#sort-products');

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProduct(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;

    if (!title || !quantity || !category) return;
    Storage.savedProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllcategories().find(
        (c) => c.id = item.category
      );
      result += ` <div class="flex items-center justify-between mb-2">
        <div><span class="text-slate-300 text-sm font-medium">${item.title} </span></div>
        <div class="flex items-center justify-center gap-x-3">
          <span class="text-slate-300 text-sm font-medium">${new Date().toLocaleDateString("fa-IR")}</span>
          <span class="rounded-2xl border border-slate-600 py-1 px-3 text-slate-600 font-normal text-sm cursor-pointer">${selectedCategory.title} </span>
          <span class="border-2 border-slate-300 rounded-full w-5 h-5 flex items-center justify-center bg-slate-600 text-slate-300 font-medium text-sm">${item.quantity} </span>
          <button class="text-slate-300 text-sm font-medium data-id=${item.id}">delete</button>
        </div>
      </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
  }
  searchProducts(e){
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(value));
    this.createProductsList(filteredProducts);
  }
  sortProduct(e){
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
}

export default new ProductView();
