import React, { useEffect, useState } from 'react'
import { fetchAssignedTablesofWaiter, fetchCurrentOrderByTableId, fetchMenu, fetchOrders, placeOrder, updateOrder, updateTable } from '../services/OrderService'
import { useNavigate } from 'react-router-dom'

const WaiterComponent = () => {
  
  const [tables, setTables] = useState([])
  const [tablesData, setTablesData] = useState([])
  const [number, setNumber] = useState(0)
  const [products, setProducts] = useState([])
  const [orderedProducts, setOrderedProducts] = useState({})
  const [orderPendingTables, setOrderPendingTables] = useState([])
  const [orderCompletedTables, setOrderCompletedTables] = useState([])
  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  const itemCategories = products.map(product => product.itemCategory)

  useEffect(() => {
      var userId = sessionStorage.getItem("userId")

      fetchAssignedTablesofWaiter(userId).then(response => {
          setTablesData(response.data)
          setTables(response.data.map(table => table.id))
      }).catch(error => console.log(error))

      fetchOrders().then(response => {
          setOrders(response.data)
          setOrderPendingTables(response.data.filter(order => order.status == "PENDING").map(order => order.tableId))
          setOrderCompletedTables(response.data.filter(order => order.status == "COMPLETED").map(order => order.tableId))
      }).catch(error => console.log(error))

      fetchMenu().then(response => {
        // console.log(response.data)
          setProducts(response.data)
      }).catch(error => console.log(error))
      
  },[])

  function decreaseQuantity(id){
    var element = document.getElementById("quantity-" + id)
    if(element.innerText > 1){
      element.innerHTML = element.innerText - 1
      enableAddButton(id)
    }
  }

  function getTableButton(num){

    let buttonStyle = ""

    if(orderPendingTables.indexOf(num) >= 0){
      buttonStyle = 'btn btn-outline-warning m-2'
    }
    else if(orderCompletedTables.indexOf(num) >= 0){
      buttonStyle = 'btn btn-outline-success m-2'
    }
    else{
      buttonStyle = 'btn btn-outline-primary m-2'
    }

    if(number == num){
      buttonStyle += " active"
    }

    return buttonStyle
  }

  function enableAddButton(id){
    document.getElementById("button-"+id).removeAttribute("disabled")
    document.getElementById("button-"+id).innerHTML = "Add"
  }

  function increaseQuantity(id){
    var element = document.getElementById("quantity-" + id)
    element.innerHTML = parseInt(element.innerText) + 1
    enableAddButton(id)
  }

  function AddToProducts(id){
      setOrderedProducts({...orderedProducts, [id]:{
          id : id,
          name : document.getElementById("name-" + id).innerText,
          price : parseInt(document.getElementById("price-"+id).innerText.slice(13)),
          quantity : parseInt(document.getElementById("quantity-" + id).innerText)
      }})

      document.getElementById("button-"+id).innerHTML = "Added"
      document.getElementById("button-"+id).setAttribute("disabled",true)
  }

  function OrderProducts(){

    if(number && JSON.stringify(orderedProducts) !== '{}'){
      const order = {
        items : Object.values(orderedProducts),
        tableId : number,
        status : "PENDING",
        time : new Date()
      }

      fetchCurrentOrderByTableId(number).then(response => {
        const currentOrderArray = response.data

        if(currentOrderArray.length > 0){
            const currentOrder = currentOrderArray[0]
            const orderStatus = currentOrder.status
            if(orderStatus === 'COMPLETED'){

                currentOrder.status = 'CLOSED'
                updateOrderItems(currentOrder)


                orderItems(order)

                alert("Previous Order closed and new order placed")
                window.location.reload(false);
            }
            else{
                const currentOrderItems = currentOrder.items
                currentOrder.items = [...currentOrderItems].concat(Object.values(orderedProducts))
                updateOrderItems(currentOrder)
                alert("Order updated Succesfully")
            }
        }else{
            orderItems(order)
            alert("Order placed Succesfully")
        }

      })

    }else if (JSON.stringify(orderedProducts) === '{}'){
      alert("Please add atleast one item")
    }else{
      alert("Please select a table")
    }
      
  }

  const orderItems = (order) => {
    placeOrder(order).then(response => {
      window.location.reload(false);
    }).catch(error => console.log(error))
  }

  const updateOrderItems = (currentOrder) => {
    updateOrder(currentOrder,currentOrder.id).then(response => {
      window.location.reload(false);
    }).catch(error => console.log(error))
  }

  const viewOrderDetails = () => {
    if(number == 0){
      alert("Please select the table")
    }else{
        if(orders.length > 0 && returnOrderId(number) > 0){
          navigate(`/view-order/${returnOrderId(number)}`)
        }else{
          alert("No Order details found")
        }
    }
  
  }

  
  function returnOrderId(num){
    const orderDetails = orders.filter(order => order.tableId == num).filter(order => order.status == 'COMPLETED' || order.status == 'PENDING')
    if(orderDetails.length > 0){
      return orderDetails[0].id
    }else{
      return 0
    }
  }

  const makeTableAvailable = () => {
    if(number == 0){
      alert("Please select the table")
    }else{

      fetchCurrentOrderByTableId(number).then(response => {

        const currentOrderArray = response.data

        if(currentOrderArray.length > 0){
          const currentOrder = currentOrderArray[0]
          console.log(currentOrder.status)
          currentOrder.status == 'COMPLETED' ?  currentOrder.status = 'CLOSED' : currentOrder.status = 'CANCELLED'
          updateOrder(currentOrder, currentOrder.id)
        }

      }).catch(error => console.log(error))


      const tableObject = tablesData.filter(table => table.id == number)[0]

      tableObject.status = 'OPEN'
      tableObject.waiterId = 0

      updateTable(tableObject, tableObject.id)
      alert ("Table is updated as OPEN")
      window.location.reload(false);
    } 

  }

  return (
    <div className='container'>
        <center style={{marginTop:'20px'}}>
                <h3>Assigned Tables</h3>
                {
                  tables.map((num, index) => (
                    <div style={{display:'inline'}} key={index}>
                        <button 
                          className = {getTableButton(num)}
                          onClick = {() => setNumber(num)}
                        >
                          {num}
                        </button>
                    </div>
                  ))
                }

                <div className='form-group mt-3'> 
                      <button className='btn btn-primary m-2' onClick={(e) => OrderProducts(e)}>Order</button>
                      <button className='btn btn-info m-2' onClick={(e) => viewOrderDetails(e)}>View Order</button>
                      <button className='btn btn-secondary m-2' onClick={(e) => makeTableAvailable(e)}>Make Available</button>
                </div>

                

                
        </center>
        <div style={{marginTop:"50px"}}>
              <h1 style={{textAlign:"center"}} className='m-5'>Menu Items</h1>
              {
                itemCategories.filter((category, index) => itemCategories.indexOf(category) == index).map((category, index) => (
                    <div key={index} className='row mb-5'>
                         <h2>{category}</h2>
                         {
                            products.filter((product) => product.itemCategory == category).map((product,index2) => (
                              <div key={index2} className="col-md-3 p-3">
                                <img className="card-img-top" src={product.itemImage} alt={product.itemName} style={{width:"100%",height:"250px"}}/>
                                <div className="card-body">
                                    <center className='mt-3'>
                                        <h4 className="card-title" id = {"name-" + product.id}>{product.itemName}</h4>
                                        <p className="card-text mt-2" id = {"price-" + product.id}>{"Item Price : " + product.itemPrice}</p>
                                        <div style={{display:"inline"}}>
                                              <button className='btn btn-sm btn-outline-dark' onClick={() => decreaseQuantity(product.id)}>-</button>
                                              <span className='m-2' id = {"quantity-" + product.id      }>1</span>
                                              <button className='btn btn-sm btn-outline-dark' onClick={() => increaseQuantity(product.id)}>+</button>
                                        </div>
                                        <div className='form-group mt-3'> 
                                           <button className='btn btn-dark' id = {"button-" + product.id} onClick={(e) => AddToProducts(product.id)}>Add</button>
                                        </div>
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