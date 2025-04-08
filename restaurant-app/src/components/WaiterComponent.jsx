import React, { useEffect, useState } from 'react'
import { fetchAssignedTablesofWaiter, fetchMenu } from '../services/OrderService'

const WaiterComponent = () => {
  const activeBtn = 'btn btn-outline-primary m-2 active'
  const inactiveBtn = 'btn btn-outline-primary m-2'
  
  const [tables, setTables] = useState([])
  const [number, setNumber] = useState(0)
  const [products, setProducts] = useState([])

  const itemCategories = products.map(product => product.itemCategory)

  useEffect(() => {
      var userId = sessionStorage.getItem("userId")

      fetchAssignedTablesofWaiter(userId).then(response => {
          setTables(response.data.map(table => table.id))
      }).catch(error => console.log(error))

      fetchMenu().then(response => {
        console.log(response.data)
          setProducts(response.data)
      }).catch(error => console.log(error))
      
  },[])
  return (
    <div className='container'>
        <center style={{marginTop:'20px'}}>
                <h3>Assigned Tables</h3>
                {
                  tables.map((num, index) => (
                    <div style={{display:'inline'}} key={index}>
                        <button 
                          className = {number == num ? activeBtn : inactiveBtn}
                          onClick = {() => setNumber(num)}
                        >
                          {num}
                        </button>
                    </div>
                  ))
                }

                <div className='form-group mt-3'> 
                      <button className='btn btn-primary' onClick={(e) => OrderProducts(e)}>Order</button>
                </div>

                

                
        </center>
        <div style={{marginTop:"50px"}}>
              <h1 style={{textAlign:"center"}} className='m-5'>Menu Items</h1>
              {
                itemCategories.filter((category, index) => itemCategories.indexOf(category) == index).map((category, index) => (
                    <div key={index} className='row mb-5'>
                         <h2>{category}</h2>
                         {
                            products.filter(product => product.itemCategory == category).map(product => (
                              <div className="col-md-3 p-3">
                                <img className="card-img-top" src={product.itemImage} alt={product.itemName} style={{width:"100%",height:"250px"}}/>
                                <div className="card-body">
                                    <center className='mt-3'>
                                        <h4 className="card-title">{product.itemName}</h4>
                                        <p className="card-text">{"Item Price : " + product.itemPrice}</p>
                                    </center>
                                </div>
                              </div>
                            ))
                         }
                    </div>
                   
                ))
              }
        </div>
    </div>
  )
}

export default WaiterComponent