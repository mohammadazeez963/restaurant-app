import React, { useEffect, useState } from 'react'
import { addNewUser, deleteUser, fetchUsers } from '../services/AuthService'

const WorkersComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [users, setUsers] = useState([])

  const loggedInUserRole = sessionStorage.getItem("role");

  useEffect(() => {
        fetchUsers().then(response => {
            const usersList = response.data

            let filteredList = []
            if(loggedInUserRole == 'OWNER'){
                filteredList = usersList.filter(user => user.role != 'OWNER')
            }else{
                filteredList = usersList.filter(user => user.role != 'OWNER' && user.role != 'MANAGER')
            }
            // console.log(loggedInUserRole)
            // console.log(filteredList)
            setUsers(filteredList)
        }).catch(error => console.log(error))
  },[])

  const addUser = (e) => {
        e.preventDefault()
        
        if(username == '' || password == '' || role == ''){
            alert("Please fill all mandatory fields")
            return
        }
        
        addNewUser({username,password,["role"] : role.toUpperCase()}).then(response => {
            alert("User added succesfully")
            window.location.reload(false)
        }).catch(error => console.log(error))
  }

  const deleteUserDetails = (id) => {
        deleteUser(id).then(response => {
            alert("User Deleted Succesfully")
            window.location.reload(false)
        }).catch(error => console.log(error))
  }

  return (
    <div className='container'>
            <div className='row'>
                    <h2 className='text-center mt-5'>Add User</h2>
                    <form className='col-md-6 offset-md-3'>
                            <div className="form-group">
                                <label htmlFor="username" className='form-label'> User Name</label>
                                <input 
                                    type="text" 
                                    id="username"
                                    className='form-control'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="password" className='form-label'> Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="role" className='form-label'> Role</label>
                                <select 
                                    id='role'
                                    className="form-select" 
                                    aria-label="select role"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value=''>--Select--</option>
                                    {
                                       loggedInUserRole  == 'OWNER' && <option value="manager">Manager</option>
                                    }
                                    <option value="waiter">Waiter</option>
                                    <option value="chef">Chef</option>
                                </select>
                            </div>

                            <br/>
                            
                            <div className='form-group mb-3'> 
                                <button className='btn btn-primary' onClick={(e) => addUser(e)}>Add User</button>
                            </div>
                    </form>
            </div>

            <div className='row'>
                    <center>
                        <h2 className='m-5'>Users List</h2>
                        <table className="table table-md mb-5" style={{width: '80%', verticalAlign:"middle", textAlign:'center'}}>
                            <thead>
                              <tr className='table-dark'>
                                <th scope="col">Sl.no.</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                  users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 == 0 ? 'table-primary' : 'table-light'}>
                                      <th scope="row">{index + 1}</th>
                                      <td>{user.username}</td>
                                      <td>{user.role}</td>
                                      <td>
                                          <div className='form-group mb-3'> 
                                            <button className='btn btn-danger m-2' onClick={(e) => deleteUserDetails(user.id)}>Delete</button>
                                          </div>  
                                      </td>
                                    </tr>
                                  ))
                                }

                            
                            </tbody>
                        </table>
                    </center>
            </div>
    </div>
  )
}

export default WorkersComponent