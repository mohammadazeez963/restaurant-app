import React, { useEffect, useState } from 'react'
import { fetchMenu } from '../services/OrderService'
import { useNavigate, useParams } from 'react-router-dom'
import { addProduct, fetchProductById, updateProduct } from '../services/ProductService'

const ItemComponent = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()
  const {id} = useParams()
  const loggedInUserRole = sessionStorage.getItem('role')

  useEffect(() => {
        fetchMenu().then(response => {
            const items = response.data
            const itemCategories = items.map(item => item.itemCategory)
            const filteredCategories = itemCategories.filter((category, index) => itemCategories.indexOf(category) == index)

            setCategories(filteredCategories)
        }).catch(error => console.log(error))

        if(id){
            fetchProductById(id).then(response =>{
                const item = response.data
                setName(item.itemName)
                setCategory(item.itemCategory)
                setPrice(item.itemPrice)
                setImage(item.itemImage)
            }
            ).catch(error => console.log(error))
        }
        
  },[])

  function addItem(e){
        e.preventDefault();

        if(category == '' || name == '' || price == 0 || image == ''){
            alert("Please fill all mandatory fields")
            return
        } 
        const item = {"itemName": name, "itemImage": image, "itemCategory": category, "itemPrice": price}
        // console.log(item)

        addProduct(item).then(response =>{
            alert("Item Added Successfully")
            navigate(`/${loggedInUserRole.toLowerCase()}`)
        }).catch(error => console.log(error))
  }

  function updateItem(e){
        e.preventDefault();

        if(category == '' || name == '' || price == 0 || image == ''){
            alert("Please fill all mandatory fields")
            return
        } 
        const item = {"id" : id, "itemName": name, "itemImage": image, "itemCategory": category, "itemPrice": price}
        // console.log(item)

        updateProduct(item, id).then(response => {
            alert("Item Updated Successfully")
            navigate(`/${loggedInUserRole.toLowerCase()}`)
        }).catch(error => console.log(error))
  }

  return (
    <div className='container'>

            {
                id ?  <h1 className='m-5 text-center'>Update Item</h1> : <h1 className='m-5 text-center'>Add Item</h1>
            }
            
            <form className='col-md-6 offset-md-3'>
                        <div className="form-group">
                            <label htmlFor="itemName" className='form-label'> Item Name</label>
                            <input 
                                type="text" 
                                id="itemName"
                                className='form-control'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="itemPrice" className='form-label'> Item Price</label>
                            <input 
                                type="number" 
                                id="itemPrice"
                                className='form-control'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="itemImage" className='form-label'> Item Image Link</label>
                            <input 
                                type="text" 
                                id="itemImage"
                                className='form-control'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="itemCategory" className='form-label'>Item Category</label>
                            <select 
                                id='itemCategory'
                                className="form-select" 
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value=''>--Select--</option>
                                {
                                    categories.map((category, index) =>(
                                        <option value= {category} key={index}>{category}</option>
                                    ))
                                }
                                
                            </select>
                        </div>
                        <br/>
                        
                        {
                            id ? 

                            <div className='form-group mb-3'> 
                                <button className='btn btn-primary' onClick={(e) => updateItem(e)}>Update Item</button>
                            </div> :

                            <div className='form-group mb-3'> 
                                <button className='btn btn-primary' onClick={(e) => addItem(e)}>Add Item</button>
                            </div>
                        }
                        
            </form>
    </div>
  )
}

export default ItemComponent