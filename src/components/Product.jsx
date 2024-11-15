import React from 'react'
import { Button } from 'react-bootstrap'
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

function Product({ele, onAddToCart}) {
  return (
    <div className='p-3 border border-success border-3 rounded-4 bg-warning-subtle my-3' style={{height:'320px',width:'300px'}}>
      <h4 className='shadow-lg fw-bolder text-danger text-center'>{ele?.productName}</h4>
<h2 className='fw-light'>PRICE = Rs {ele?.price}</h2>
<div className="d-flex justify-content-between align-items-center my-3">
  <p className='lead fw-bold'>#{ele.brand?.brandName}</p>
  <p className='lead fw-bold'>#{ele.category?.categoryName}</p>
</div>

<div className="ratings  p-3 my-3">
{
  [...Array(ele.rating).keys()].map(ele=>{
    return <FaStar size={'25px'} color='gold'/>
  })
}
{
  [...Array(5 - ele.rating).keys()].map(ele=>{
    return <CiStar  size={'25px'} />
  })
}
</div>

{
  ele?.isOrdered===false ? 
  <Button variant='success' onClick={()=>onAddToCart(ele)}>ADD TO CART</Button>
  :
  <p className="text-success fst-italic fw-bolder">ADDED TO CART</p>
}
    </div>
  )
}

export default Product