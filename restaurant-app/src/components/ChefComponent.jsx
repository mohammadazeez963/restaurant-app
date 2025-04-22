import React, { useEffect, useState } from 'react'
import { fetchOrderById, fetchOrders, updateOrder } from '../services/OrderService'

const ChefComponent = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
      fetchOrders().then(response => {
          const ordersDetails = response.data
          const filteredOrders = ordersDetails.filter(order => order.status == 'PENDING')
          setOrders(filteredOrders)
      })
      
  },[])

  function caluculateTotalAmount(items){
        return items.map(item => parseInt(item.quantity * item.price)).reduce((a,b) => a + b)
  }

  function prioritizeOnFifo() {
    const sortedDates = orders.sort((a, b) => new Date(a.time) - new Date(b.time));
    setOrders([...sortedDates])
    
  }

  function prioritizeOnCost() {
    const sortedDates = orders.sort((a, b) => caluculateTotalAmount(b.items) - caluculateTotalAmount(a.items));
    setOrders([...sortedDates])
    
  }

  function completeOrder(order){
      fetchOrderById(order.id).then(response => {
          if(response.data){
            if(response.data.status === 'CANCELLED'){
              alert("Order has been cancelled by waiter")
              window.location.reload(false)
            }else{
              order.status = 'COMPLETED'
              updateOrder(order, order.id)
              alert("Order has marked as completed")
              window.location.reload(false)
            }
          }
      })
      
  }

  return (
    <div className='container'>
       
        <center>
          <h1 className='m-5'>Orders List</h1> 

          <div className='form-group mb-3'> 
              <button className='btn btn-info' style={{marginRight:'20px'}} onClick={(e) => prioritizeOnFifo(e)}>Prioritize on FIFO</button>
              <button className='btn btn-info' onClick={(e) => prioritizeOnCost(e)}>Prioritize on Cost</button>
          </div>
        

          <table className="table table-md m-5" style={{width:'80%', textAlign:"center", verticalAlign:'middle'}}>
                <thead>
                  <tr className='table-dark' >
                    <th scope="col">Sl.no.</th>
                    <th scope="col">Items</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Time</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      orders.map((order, index) => (
                        <tr key={index} className={index % 2 == 0 ? 'table-info' : 'table-light'}>
                          <th scope="row">{index + 1}</th>
                          {console.log(order)}
                          
                          <td style={{textAlign:'left'}}>
                              <ul style={{listStyleType:'none'}}>
                                  {
                                    order.items.map((item, index) => (
                                            <li key={index}>{item.name} &nbsp;-&nbsp;&nbsp;&nbsp;{item.quantity}</li>
                                    )) 
                                  }
                              </ul>
                          </td>
                          <td>{caluculateTotalAmount(order.items)}</td>
                          <td>{order.time}</td>
                          <td>
                            <div className='form-group mb-3'> 
                                <button className='btn btn-success' onClick={(e) => completeOrder(order)}>Complete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }

                  
                </tbody>
          </table>
        </center>
    </div>
  )
}

export default ChefComponent