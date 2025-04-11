import React,{Fragment,useState} from "react";
import ListTodo from "./EditTodo";

function InputTodo(){

    const[description, setDescription]=useState("");

    async function Submitapplication(event){
        event.preventDefault();
        try {
            const body={description};
            const result=await fetch("http://localhost:3000/todo",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            window.location="/";
            
        } catch (error) {
            console.log(error);
            
        }
    }

    function addValue(event){
        setDescription(event.target.value);

    }
    return(
        <Fragment>
            <div className="container inputTodo">
                <h1 className="text-center mt-5">Todo List📃✏️</h1>
                <form className="formTodo mt-5" onSubmit={Submitapplication}>
                    <input type="text" className="form-control inputarea" value={description} onChange={addValue} placeholder="Add your Todo......"/>
                    <button type="submit" className="btn btn-success">Add</button>
                </form>
                </div>
        </Fragment>

    );
}

export default InputTodo;