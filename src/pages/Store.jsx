import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { BrandsService, CategoryService, ProductService } from '../utils/utils';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Product from '../components/Product';

function Store() {

  let [brands, setBrands] = useState([])
  let [category, setCategory] = useState([])
  let [ product,setProduct] = useState([])
  let [prodToShow, setProdToShow] = useState([])
  let [txt,setxt] = useState('')

let{user:{userData}} = useAuth()
console.log(userData);

//-------------------------------------------

useEffect(()=>{
// (()=>{})() // self invoking func
(async()=>{
  document.title= 'STORE'
// get brands
let resBrand = await BrandsService.fetchBrands()
let resBrandBody = await resBrand.json()
console.log(resBrandBody);
resBrandBody.forEach(ele=>{
  ele.isChecked = true
})
setBrands(resBrandBody)
// get categories
let resCategory = await CategoryService.fetchCategories()
let resCategoryBody = await resCategory.json()
console.log(resCategoryBody);
resCategoryBody.forEach(ele=>{
  ele.isChecked = true
})
setCategory(resCategoryBody)

//getProduct
let resProduct = await fetch(`http://localhost:4000/products?productName_like=${txt}`,{method:'GET'})
if(resProduct.ok){
  let resProductBody = await resProduct.json()

  resProductBody.forEach(prod=>{
      // set band in product
    prod.brand = BrandsService.getBrandByBrandId( resBrandBody, prod.brandId )
      // set category in product
    prod.category = CategoryService.getCategoryByCategoryId(resCategoryBody, prod.categoryId)
    // set default isOdered to false
    prod.isOrdered=false
  })

 
  // console.log(resProductBody);
  setProduct(resProductBody)
  updateProdToShow()
  setProdToShow(resProductBody)
}

})()

},[userData?.id, txt])

//-------------------------------------------

// update brand check
let updateBrandIsChecked = (para)=>{
  // console.log(para);
  // this will return us an array
let brandData = brands.map(ele=>{
  if(ele.id == para) ele.isChecked = !ele.isChecked
  return ele
})
// console.log(brandData);
setBrands(brandData)
updateProdToShow()
}

// update category check
let updateCategoryIsChecked = (para)=>{
  // console.log(para);
  let categorydata = category.map(ele=>{
    if(ele.id==para) ele.isChecked = !ele.isChecked
    return ele
  })
  setCategory(categorydata)
  updateProdToShow()
}

// updateProdToShow
let updateProdToShow = () =>{
  setProdToShow(
    product
    .filter((prod)=>{
      return category.filter(cat=>cat.id==prod.categoryId && cat.isChecked).length > 0
    })
    .filter((prod)=>{
      return brands.filter(ele=>ele.id==prod.brandId && ele.isChecked).length > 0
    })
  )
}

// addtoCartButton
let onAddToCart = useCallback(async(prod)=>{

let newOrder = {
  userId:userData?.id,
  productId:prod?.id,
  quantity:1,
  isPaymentCompleted:false
}
let postOrder = await fetch(`http://localhost:4000/orders`,{method:'POST',body:JSON.stringify(newOrder),headers:{"Content-type":"application/json"}})
if(postOrder.ok){
  let postOrderBody = await postOrder.json()
  // console.log(postOrderBody);

  let prods = product.map(p=>{
    if(p.id==prod.id) p.isOrdered = true
    return p
  })
  console.log(prods);
  
  setProduct(prods)
  
}

},[userData?.id, product])


  return (
    <div className='p-3'>
      <h2 className="display-3 shadow-lg p-3">STORE</h2>
      {/* search PRODUCTS */}
      <Form.Control type="text" placeholder="SEARCH PRODUCTS"
      className='w-75 m-auto my-3 p-2' value={txt} onChange={(e)=>setxt(e.target.value)}
      />
        {/* search PRODUCTS */}
        <div className="row g-4">
          <div className="col-4 p-3 offset-4 offset-sm-0 bg-info-subtle">
{/* filter options */}
{/* brands */}
<h5 className='my-2'>BRANDS</h5>
<ListGroup>
    {
      brands && brands.map(ele=>{
    return  <ListGroup.Item>
      {ele?.brandName}
      <Form.Check type="checkbox" label="" className='d-inline-block ms-3' checked={ele?.isChecked}
      onChange={()=>updateBrandIsChecked(ele.id)}
      />
    </ListGroup.Item>
      })
    }
    </ListGroup>
{/* brands */}
{/* category */}
<h5 className='my-2'>CATEGORIES</h5>
<ListGroup>
    {
      category && category.map(ele=>{
    return  <ListGroup.Item>
      {ele?.categoryName}
      <Form.Check type="checkbox" label="" className='d-inline-block ms-3' checked={ele?.isChecked}
        onChange={()=>updateCategoryIsChecked(ele.id)}
      />
    </ListGroup.Item>
      })
    }
    </ListGroup>
{/* category */}

    {/* filter options */}
          </div>
          <div className="col-12 col-sm-8 bg-danger-subtle d-flex justify-content-evenly align-items-center flex-wrap">
         {
          prodToShow && prodToShow.map((ele,index)=>{
            return <Product key={ele.id} ele={ele} onAddToCart={onAddToCart}/>
          })
         }
          </div>
        </div>
    </div>
  )
}

export default Store