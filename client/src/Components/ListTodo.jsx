import React, { Fragment,useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import "../App.css"

function ListTodo(){

    const[todos,setTodos]=useState([]);
    async function showTodo(){
        try {
            const response=await fetch("http://localhost:3000/todo",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                  }
            
            });
            const jsonData=await response.json();
            setTodos(jsonData);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async function deleteTodo(id){
      try {
        const response=await fetch(`http://localhost:3000/todo/${id}`,{
          method:"DELETE",
         
        })
        setTodos(todos.filter((todo)=>todo.id!==id));
        
      } catch (error) {
        console.log(error);
        
      }


    }

    useEffect(()=>{
        showTodo();
    },[]);

    return(
        <Fragment>
            <div className="container ListTodo">
            <table className="table mt-5 text-center tableList">
    <thead className="thead">
      <tr className="trTable">
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody className="custom-tbody">
    {todos.map((data) => {
    return (
    <tr key={data.id}>
      <td>{data.description}</td>
      <td><EditTodo todo={data}/></td>
      <td><button className="btn btn-danger" onClick={() => deleteTodo(data.id)}>Delete</button></td>
    </tr>
  );
})}

      
      
    </tbody>
  </table>

            </div>
        </Fragment>
    )

}
export default ListTodo;