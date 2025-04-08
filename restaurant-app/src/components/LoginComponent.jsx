import React, { useState } from 'react'
import { fetchSpecificUser, isUserLoggedIn, saveLoggedInUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    function handleLoginForm(e){

        e.preventDefault();

        if(username === '' || password === ''){
            alert('Please enter the mandatory fields')
        }
        else if(role === ''){
            alert('Please select a Role')
        }
        else{
            
            fetchSpecificUser(username,password,role).then(response => {
                if(response.data.length){
                    const user = response.data[0]
                    saveLoggedInUser(username,user.role,user.id);
                    navigate(`/${user.role.toLowerCase()}`)
                    window.location.reload(false);
                }else{
                    alert("User with given details was not found")
                    navigate("/")
                }
            })
        }
    }
    

    return(
        <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h1 className='text-center'>Login</h1>
                    </div>
                    <div className='card-body'>
                        <form>
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
                                >
                                    <option value=''>--Select--</option>
                                    <option value= "owner">Owner</option>
                                    <option value="manager">Manager</option>
                                    <option value="waiter">Waiter</option>
                                    <option value="chef">Chef</option>
                                    <option value="host">Host</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <br/>
                            
                            <div className='form-group mb-3'> 
                                <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default LoginComponent