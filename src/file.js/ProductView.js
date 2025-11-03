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
    this.editingProductId = null; // ردیابی محصول در حال ویرایش
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  // ویرایش محصول
  editProduct(e) {
    const productId = e.target.getAttribute('edit-product-id');
    const product = this.products.find(p => p.id == productId);
    if (!product) return;

    // پر کردن فرم با اطلاعات محصول
    document.querySelector("#product-title").value = product.title;
    document.querySelector("#product-quantity").value = product.quantity;
    document.querySelector("#product-category").value = product.category;

    // تغییر دکمه به حالت ویرایش
    addNewProductBtn.textContent = "Change Product";
    this.editingProductId = product.id;

    // اسکرول به فرم (اختیاری)
    document.querySelector('#add-product-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  // افزودن یا ویرایش محصول
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value.trim();
    const quantity = document.querySelector("#product-quantity").value.trim();
    const category = document.querySelector("#product-category").value;

    if (!title || !quantity || !category) return;

    const productData = { title, quantity, category };

    if (this.editingProductId) {
      // حالت ویرایش
      productData.id = this.editingProductId;
      Storage.savedProducts(productData);

      // ریست فرم و دکمه
      addNewProductBtn.textContent = "Add New Product";
      this.editingProductId = null;
    } else {
      // حالت افزودن جدید
      Storage.savedProducts(productData);
    }

    // پاک کردن فرم
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
    document.querySelector("#product-category").value = "";

    // به‌روزرسانی لیست
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }

  // ایجاد لیست محصولات
  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllcategories().find(
        (c) => c.id == item.category
      );

      // تبدیل تاریخ به تقویم شمسی (fa-IR)
      const persianDate = new Date(item.createdAt).toLocaleDateString("fa-IR");

      result += `
        <div class="flex items-center justify-between mb-2">
          <div><span class="text-slate-300 text-sm font-medium">${item.title}</span></div>
          <div class="flex items-center justify-center gap-x-3">
            <span class="text-slate-300 text-sm font-medium">${persianDate}</span>
            <span class="rounded-2xl border border-slate-600 py-1 px-3 text-slate-600 font-semibold text-sm">${selectedCategory.title}</span>
            <span class="border-2 border-slate-300 rounded-full w-6 h-6 flex items-center justify-center bg-slate-600 text-slate-300 font-normal text-sm">${item.quantity}</span>
            <button class="edit-product text-center cursor-pointer text-yellow-400 text-sm font-medium rounded-full border-2 px-2 border-yellow-400" edit-product-id="${item.id}">edit</button>
            <button class="delete-product text-center cursor-pointer text-red-400 text-sm font-medium rounded-full border-2 px-2 border-red-400" data-product-id="${item.id}">delete</button>
          </div>
        </div>`;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    // اتصال دکمه‌های حذف
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });

    // اتصال دکمه‌های ویرایش
    const editBtns = [...document.querySelectorAll(".edit-product")];
    editBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.editProduct(e));
    });
  }

  // جستجو
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  // مرتب‌سازی
  sortProduct(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  // حذف محصول
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();