import React, { useCallback, useEffect, useState } from 'react'
import { RiRefreshFill } from "react-icons/ri";
import { TbPackageImport } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import { OrderService, ProductService } from '../utils/utils';
import Order from '../components/Order';

function Dashboard() {

let [orders,setOrder] = useState([])

  let {user:{userData}} = useAuth()
  console.log(userData);

let  loadFromDb = useCallback(async()=>{

let orderReq = await fetch(`http://localhost:4000/orders?userId=${userData?.id}`,{method:'GET'})
if(orderReq.ok){
  let orderReqBody = await orderReq.json()
  // console.log(orderReqBody);
  // get all products
let reqProd = await ProductService.fetchProducts()
let reqProdBody = await reqProd.json()
// console.log(reqProdBody);
// merge product with reepective product id
orderReqBody.forEach(ele=>{
  ele.product = ProductService.getProductByProductId(reqProdBody, ele.productId)
})
setOrder(orderReqBody)
}

},[userData?.id])

useEffect(()=>{
  document.title='DASHBOARD'
  loadFromDb()
},[userData?.id, loadFromDb])


// onBuyNowClick

let onBuyNowClick = useCallback(async(orderId, userId, productId, quantity)=>{

console.log(orderId, userId, productId, quantity);

if(window.confirm('Wanna Buy !!')){
  let updateOrder = {
    id: orderId,
    userId: userId,
    productId : productId,
    quantity : quantity,
    isPaymentCompleted :true
  }
  let req = await fetch(`http://localhost:4000/orders/${orderId}`,{method:'PUT',body:JSON.stringify(updateOrder),headers:{"Content-type":"application/json"}})
let reqBoody = await req.json()
console.log(reqBoody);

loadFromDb()
}

},[loadFromDb])

// onDeleteClick

let onDelClick = useCallback(async(orderId)=>{
if(window.confirm('WANT TO REMOVE THE PRODUCT ?')){
let res = await fetch(`http://localhost:4000/orders/${orderId}`,{method:'DELETE'})
let resBody = await res.json()
console.log(resBody);

loadFromDb()
}
},[loadFromDb])

  return (
    <div className='p-3'>
    <div className="title d-flex justify-content-between align-items-center">
    <h2 className='display-5 border-bottom border-info p-3 w-50 fst-italic'>
        DASHBOARD
        </h2>
        <RiRefreshFill size={'50px'} onClick={loadFromDb} />
    </div>
    <div className="row g-2">
      {/* prevOrder */}
      <div className="prevOrder col-12 col-md-6 bg-info">
        <h5 className='text-light p-3'>
          PREVIOUS ORDER
          <TbPackageImport size={"50px"} className='m-2' />
          </h5>
          {
            OrderService.getPrevOrders(orders).map((ele,index)=>{
              return <Order 
              key={ele.id} 
              ele={ele}/>
            })
          }
      </div>
      {/* Mycart */}
      <div className="getcart col-12 col-md-6 bg-danger">
      <h5 className='text-light p-3'>
          MY CART
          <MdProductionQuantityLimits size={"50px"} className='m-2'  />
          </h5>
          {
            OrderService.getCart(orders).map((ele,index)=>{
              return <Order 
              key={ele.id} 
              ele={ele}
              onDelClick={onDelClick}
              onBuyNowClick={onBuyNowClick}
              />
            })
          }
      </div>
    </div>
    </div>
  )
}

export default Dashboard