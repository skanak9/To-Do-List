import React, { useRef, useState,useEffect } from 'react'
import todo from '../assets/todo.png'
import ToDoitems from './ToDoitems'


const App = () => {

const inputRef = useRef()


const[todoList,setToDoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);


const add = () =>{
    const inputText = inputRef.current.value.trim();

    if (inputText==""){
        return null;
    }

    const newTodo ={
        id: Date.now(),
        text: inputText,
        isComplete: false,

    }
    setToDoList((prev)=> [...prev,newTodo]);
    inputRef.current.value="";
}

const deleteTodo = (id) =>{
    setToDoList((prvTodos) =>{
        return prvTodos.filter((todo) => todo.id !== id)
    })
}

const toggle = (id) =>{
    setToDoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
            if(todo.id === id){
                return{...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}

useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList));
},[todoList])



  return (
    
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-8 min-h-[550px] rounded-xl">
        
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-10' src={todo} alt=''/>
            <h1 className='text-3xl font-semibold'>To-Do List</h1>

        </div>

          {/* input */}

        <div className='flex items-center my-7 bg-pink-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task'/>
            <button onClick={add} className='border-none rounded-full bg-pink-600 w-32 h-14 text-white text-lg font-medium cursor-pointer' >Add +</button>
        </div>
        
        
        {/* todo list  */}
        <div>
            {todoList.map((item, index) =>{
                return <ToDoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle = {toggle}/> 
            })}
        </div >

        </div>
        )
    }

export default App