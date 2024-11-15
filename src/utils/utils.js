export const ProductService ={
    fetchProducts(){
        return fetch(`http://localhost:4000/products`,{method:'GET'})
    },
    getProductByProductId(prodArr, prodId){
        return prodArr.find((prod)=>{
            return prod.id == prodId
        })
    }
}

export const OrderService = {
    getPrevOrders(ordArr){
        return ordArr.filter((ele)=>ele.isPaymentCompleted===true)
    },
    getCart(ordArr){
        return ordArr.filter((ele)=>ele.isPaymentCompleted===false)
    }
}

export const BrandsService = {
    fetchBrands(){
        return fetch(`http://localhost:4000/brands`,{method:'GET'})
    },
    getBrandByBrandId(brandArray, brandId){
        return brandArray.find(ele=>{
            return ele.id==brandId
        })
    }
}

export const CategoryService = {
    fetchCategories(){
        return fetch(`http://localhost:4000/categories`,{method:'GET'})
    },
    getCategoryByCategoryId(catArray, catId){
        return catArray.find(ele=>{
            return ele.id == catId
        })
    }
}