import React, { useEffect, useState } from 'react'
import { fetchSpecificRoles } from '../services/AuthService'
import { assignTablesToWaiterAPI, fecthOpenTables, fetchMenu } from '../services/OrderService'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../services/ProductService'

const ManagerComponent = () => {
  
  const activeBtn = 'btn btn-outline-primary m-2 active'
  const inactiveBtn = 'btn btn-outline-primary m-2'

  const [numbers, setNumbers] = useState([])
  const [tables, setTables] = useState([])
  const [waiter, setWaiter] = useState(0)
  const [menu, setMenu] = useState([])
  const [waitersList, setWaitersList] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetchSpecificRoles("WAITER").then(response => {
        setWaitersList(response.data)
    }).catch(error => console.log(error))

    fecthOpenTables().then(response => {
        var tableNumbers = response.data.map(table => table.id).sort((a,b) => a-b);
        setNumbers(tableNumbers);
    }).catch(error => console.log(error))

    fetchMenu().then(response => {
      setMenu(response.data)
  }).catch(error => console.log(error))

  },[])

  function assignTablesToWaiter(e){
    e.preventDefault();

    if(tables.length === 0){
      alert("Please select atleast one table")
    }else if(waiter === 0){
      alert("Please select a waiter")
    }else{
        // console.log(tables + " : " + waiter)
        tables.forEach(table => {
            let body = {id: parseInt(table), status: "BOOKED", waiterId: parseInt(waiter)}
            assignTablesToWaiterAPI(parseInt(table), body)
        })
        alert(`tables ${tables} assigned succesfuly to waiter`)
        window.location.reload(false);
    }
  }

  const deleteItem = (id) => {
      deleteProduct(id).then(response =>{
        alert("Item Deleted Successfully")
        window.location.reload(false)
      }).catch(error => console.log(error))
  }
  return (
    <div className='container'>
            <center style={{marginTop:'20px'}}>
                <h3>Assign Available Tables</h3>
                {
                  numbers.map((num, index) => (
                    <div style={{display:'inline'}} key={index}>
                        <button 
                          className = {tables.indexOf(num) >= 0 ? activeBtn : inactiveBtn}
                          onClick = {() => setTables([...tables].concat([num]))}
                        >
                          {num}
                        </button>
                    </div>
                  ))
                }

                <div className='row' style={{marginTop:'20px'}}>
                    <div className='col-md-4 offset-md-4'>
                          <select 
                              className="form-select" 
                              onChange={(e) => setWaiter(e.target.value)}
                          >   
                              <option value=''>--Select--</option>
                              {
                                waitersList.map(waiter => (
                                  <option value={waiter.id} key={waiter.id}>{waiter.username}</option>
                                ))
                              }
                              
                          </select>
                    </div>
                </div>

                <div style={{marginTop:'20px'}}> 
                    <button className='btn btn-primary' onClick={(e) => assignTablesToWaiter(e)}>Assign</button>
                    <button className='btn btn-warning' style={{marginLeft:'10px'}} onClick={(e) => setTables([])}>Clear</button>
                </div>

            </center>


                <h2 className='m-5 text-center'>Menu Items</h2>
                <div className='form-group'> 
                    <button className='btn btn-primary mb-3' onClick={(e) => navigate('/item')}>Add New Item</button>
                </div>  
                

                <table className="table table-md mb-5" style={{width: '90%', verticalAlign:"middle"}}>
                    <thead>
                      <tr className='table-dark'>
                        <th scope="col">Sl.no.</th>
                        <th scope="col">Item image</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Item category</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          menu.map((item, index) => (
                            <tr key={item.id} className={index % 2 == 0 ? 'table-primary' : 'table-light'}>
                              <th scope="row">{index + 1}</th>
                              <td><img src={item.itemImage} alt={item.itemName} style={{width:"50%",height:"150px"}}/></td>
                              <td>{item.itemName}</td>
                              <td>{item.itemCategory}</td>
                              <td>{item.itemPrice}</td>
                              <td>
                                  <div className='form-group mb-3'> 
                                    <button className='btn btn-success' onClick={(e) => navigate('/item/' + item.id)}>Update</button>
                                    <button className='btn btn-danger m-2' onClick={(e) => deleteItem(item.id)}>Delete</button>
                                  </div>  
                              </td>
                            </tr>
                          ))
                        }

                      
                    </tbody>
                </table>
            

    </div>
  )
}

export default ManagerComponent