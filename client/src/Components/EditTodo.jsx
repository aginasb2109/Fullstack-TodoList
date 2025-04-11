import React, { Fragment,useState } from "react";

function EditTodo(props) {


    const[description, setDescription]=useState(props.todo.description);

    async function updateDescription(event){
        event.preventDefault();
        try {
            const body={description};
            const response=await fetch(`http://localhost:3000/todo/${props.todo.id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            window.location="/";
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <Fragment>
      
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.todo.id}`}
      >
        Edit
      </button>

      
      <div className="modal fade" id={`id${props.todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>setDescription(props.todo.description)}
              ></button>
            </div>

            <div className="modal-body">
              <input type="text" placeholder="Enter you Todo...." className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            </div>

            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={updateDescription}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={()=>setDescription(props.todo.description)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodo;
