
const API_CONFIG = {
    mainUrl: "https://new-sport-store-production-2b2e.up.railway.app/",
    endpoints: {
        auth: {
            login: "auth/login",
            signup: "auth/signup",
            logout: "auth/logout",
            // forgetPassword: "auth/forgetPassword",
        },
        products:{
            allProducts:"products",
            productById:"product/:id",// + the id
            // createProduct:"product/createProduct",// type = formData
            // updateProduct:"product/updateProduct", // + the id  type = formData
            // latestProducts:"product/latestProducts"
        },
        brands:{
            allBrands:"brands/"
            // createBrand:"brand/createBrand",// type = formData
            // updateBrand:"brand/updateBrand",// + the id      type  = formData
        },
        categories:{
            allCategories:"categories/"
            // createCategory:"category/createCategory",
            // updateCategory:"category/updateCategory",//+ the id
        },
        users:{
            allUsers:"users/",
            // userById:"user/:id",
        }
    },
};

export default API_CONFIG;