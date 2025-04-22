import React, { useEffect, useState } from 'react'
import { fetchMenu } from '../services/OrderService'
import { deleteProduct } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'

const OwnerComponent = () => {

  const [menu, setMenu] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      fetchMenu().then(response => {
        setMenu(response.data)
    }).catch(error => console.log(error))
  
  },[])

  const deleteItem = (id) => {
        deleteProduct(id).then(response =>{
          alert("Item Deleted Successfully")
          window.location.reload(false)
        }).catch(error => console.log(error))
  }
  
  
  return (
    <div className='container'>
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

export default OwnerComponent