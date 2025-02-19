const product = [
    {
        id: 1,
        title: 'React.js',
        category: 'frontend',
        updated: '2021-09-01',
    },
    {
        id: 2,
        title: 'next.js',
        category: 'frontend',
        updated: '2021-10-01',
    },
    {
        id: 3,
        title: 'HTML',
        category: 'frontend',
        updated: '2021-11-01',
    },
];

const categories = [
    {
        id: 1,
        title: 'frontend',
        description: 'frontend development',
        createdAt: '2021-12-01',
    },
    {
        id: 2,
        title: 'backend',
        description: 'backend development',
        createdAt: '2022-12-01',
    },

];

export default class Storage {
    //  getAllcategories دسته بندی های ایجاد شده را به کاربر نمایش می دهد

    static getAllcategories() {
        const saveCategories = JSON.parse(localStorage.getItem('category')) || [];
        // sort => به صورت نزولی دسته بندی ها را مرتب می کند => desending
        const sorteDCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sorteDCategories;
    }
    static saveCategory(categoryToSave) {
        const savedCategories = Storage.getAllcategories();
        // edit=> ... save
        // new => create
        const existedItem = savedCategories.find((item) => item.id === categoryToSave.id);
        if (existedIteem) {
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
}
