import React from 'react'

function Order({ele, onDelClick, onBuyNowClick}) {
  return (
    <div className='bg-light border border-light border-3 m-5  rounded-5 p-4' style={{width:'300px'}}>
      <h4 className='fst-italic fs-5 p-2 text-warning shadow-lg'>{ele?.product?.productName}</h4>
      <h5>QUANTITY = {ele.quantity} </h5>
      <p className="lead">Price = Rs {ele?.product?.price}</p>


{
  ele.isPaymentCompleted===true ?
  ''
  :
  <div className='p-2 d-flex justify-content-between align-items-center'>
  <button className='btn btn-outline-success'
  onClick={()=>onBuyNowClick(ele?.id, ele?.userId, ele?.productId, ele?.quantity)}
  >BUY NOW</button>
  <button 
  className='btn btn-outline-danger'
  onClick={()=> onDelClick(ele?.id)}
  >REMOVE</button>
</div>
}

    </div>
  )
}

export default React.memo(Order)