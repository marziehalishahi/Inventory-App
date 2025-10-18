const products = [
    {
      id: 1,
      title: "React.js",
      category: "frontend",
      createdAt: "2021-10-31T15:02:00.411Z",
    },
    {
      id: 2,
      title: "Node.js",
      category: "backend",
      createdAt: "2021-10-31T15:03:23.556Z",
    },
    {
      id: 3,
      title: "Vue.js",
      category: "frontend",
      createdAt: "2021-11-01T10:47:26.889Z",
    },
  ];
  
  const categories = [
    {
      id: 1,
      title: "frontend",
      description: "frontend of applications",
      createdAt: "2021-11-01T10:47:26.889Z",
    },
    {
      id: 2,
      title: "backend",
      description: "the backend of the applications",
      createdAt: "2021-10-01T10:47:26.889Z",
    },
  ];

export default class Storage {
    //  getAllcategories دسته بندی های ایجاد شده را به کاربر نمایش می دهد

    static getAllcategories() {
        const savedCategories = JSON.parse(localStorage.getItem('category')) || [];
        // sort => به صورت نزولی دسته بندی ها را مرتب می کند => desending
        const sortedCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    }
    static saveCategory(categoryToSave) {
        const savedCategories = Storage.getAllcategories();
        // edit=> ... save
        // new => create
        const existedItem = savedCategories.find((item) => item.id === categoryToSave.id);
        if (existedItem) {
            //    edit
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        } else {
            // new
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }
        localStorage.setItem('category', JSON.stringify(savedCategories));
    }
    static getAllProducts () {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        return savedProducts.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
    }
    static savedProducts (productToSave) {
       const savedProducts = Storage.getAllProducts();
        const existedItem = savedProducts.find((item) => item.id === productToSave.id);
        if (existedItem) {
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;
        } else {
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem('products', JSON.stringify(savedProducts));
    }
}
