
import Storage from "./Storage.js";

const categoryTitle = document.querySelector('#category-title');
const categoryDescription = document.querySelector('#category-description');
const addNewCategoryBtn = document.querySelector('#add-new-category');

class Categoryviwe {
    constructor() {
        addNewCategoryBtn.addEventListener( "click" , (e) => this.addNewCategory(e));
        this.categories = [];
    }

    addNewCategory(e) {
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if(!title || !description) return;
        Storage.saveCategory({title, description});
        this.categories = Storage.getAllcategories();
        this.createCategoriesList();
        categoryTitle.value = "";
        categoryDescription.value = "";
    }
    setApp () {
        this.categories = Storage.getAllcategories();
    }
    createCategoriesList(){
        let result = `<option class="bg-slate-500 text-slate-300 text-sm font-light" value="">select a category</option>`
        this.categories.forEach(element => {
           result += `<option class="bg-slate-500 text-slate-300 text-sm font-light" value=${element.id}>${element.title}</option>` 
        });

        const categoryDOM= document.getElementById("product-category");
        categoryDOM.innerHTML = result;
    }
}

export default new Categoryviwe();
