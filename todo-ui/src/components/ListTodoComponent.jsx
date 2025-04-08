import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService';

const ListTodoComponent = () => {
  
    const[todos, setTodos] = useState([]);
    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(() => {
        listofTodos()
    }, [])

    function listofTodos(){
        getAllTodos().then((response) => {
            setTodos(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function addTodo(){
        navigate("/add-todo")
    }

    function updateTodo(id){
        console.log(id)
        navigate(`/update-todo/${id}`)
    }

    function removeTodo(id){
        deleteTodo(id).then(response => {
            listofTodos()
        }).catch(error => console.error(error))
    }

    function markCompleteTodo(id){
        completeTodo(id).then(response => {
            listofTodos()
        }).catch(error => console.error(error))
    }

    function markInCompleteTodo(id){
        inCompleteTodo(id).then(response => {
            listofTodos()
        }).catch(error => console.error(error))
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Todo Management</h2>
        {isAdmin && <button className='btn btn-primary mb-2' onClick={addTodo}>Add Todo</button>}
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo title</th>
                        <th>Todo description</th>
                        <th>Todo completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'YES' : 'NO'}</td>
                                <td>
                                    {isAdmin && 
                                        <>
                                            <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginLeft : "10px"}}>Delete</button>
                                        </>
                                    }
                                    
                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{marginLeft : "10px"}}>Complete</button>
                                    <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={{marginLeft : "10px"}}>In Complete</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListTodoComponent