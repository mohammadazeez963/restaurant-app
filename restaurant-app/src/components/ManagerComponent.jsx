import React, { useEffect, useState } from 'react'
import { fetchSpecificRoles } from '../services/AuthService'
import { assignTablesToWaiterAPI, fecthOpenTables } from '../services/OrderService'
import { useNavigate } from 'react-router-dom'

const ManagerComponent = () => {
  
  const activeBtn = 'btn btn-outline-primary m-2 active'
  const inactiveBtn = 'btn btn-outline-primary m-2'

  const [numbers, setNumbers] = useState([])
  const [tables, setTables] = useState([])
  const [waiter, setWaiter] = useState(0)
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

    </div>
  )
}

export default ManagerComponent