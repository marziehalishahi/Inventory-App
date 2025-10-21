
import CategoryViwe from "./CategoryViwe.js";
import ProductView from "./ProductView.js";

document.addEventListener('DOMContentLoaded', ()=>{
    CategoryViwe.setApp();
    ProductView.setApp();
    CategoryViwe.createCategoriesList();
    ProductView.createProductsList(ProductView.products);
});
