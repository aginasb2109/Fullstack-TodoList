import React,{Fragment} from "react";
import InputTodo from "./Components/InputTodo";
import ListTodo from "./Components/ListTodo";
import './App.css';

function App() {
  return (
    <Fragment>
    <InputTodo />
    <ListTodo />
    </Fragment>
    
  );
}

export default App;
