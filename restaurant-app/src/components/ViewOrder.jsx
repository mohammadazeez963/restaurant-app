import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOrderById } from '../services/OrderService'

const ViewOrder = () => {
  const {id} = useParams()

  const [order, setOrder] = useState({})

  useEffect(() => {
      if(id){
        fetchOrderById(id).then(response => {
          setOrder(response.data)
        })
      }
  },[])

  function caluculateTotalAmount(){
    if(JSON.stringify(order) !== '{}' && order.items.length > 0) {
        return order.items.map(item => parseInt(item.quantity * item.price)).reduce((a,b) => a + b)
    }
    else{
      return 0
    }
  }

  return (
    <div className='container'>
          <center>
            <h1 className='m-5'>Order Details</h1>
            <h5>Total Amount : {caluculateTotalAmount()}</h5>
            <h6>Order Status : <span className= {order.status === 'PENDING' ? 'text-warning' : 'text-success'}>{order.status}</span></h6>
           

            <table className="table table-md m-5" style={{width:'80%'}}>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">Sl.no.</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                  {
                    JSON.stringify(order) !== '{}' && order.items.map((item, index) => (
                      <tr key={index} className={index % 2 == 0 ? 'table-primary' : 'table-light'}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))
                  }
                      
                
              </tbody>
            </table>
          </center>
          
    </div>
  )
}

export default ViewOrder