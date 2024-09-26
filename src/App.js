import React, { useState } from 'react';
import data from './data/data.json'
import { KindeProvider, useKindeAuth } from '@kinde-oss/kinde-auth-react';
import './App.css';

import Header from './Header';
import TodoList from './Todo-list';
import Output from './Output';
import Footer from './Footer';



function App() {

  const [toDoList, setToDoList] = useState(data);
  const { isAuthenticated } = useKindeAuth();
  // Header calculate for Totals

  const totalTodos = toDoList.tasks.length;
  const CompletedTodos = toDoList.tasks.filter(todo => todo.complete).length
  console.log('todo is complete', CompletedTodos)

  // header to update Task

  const completeTask = (id) => {
    console.log(`Complete task click: ${id}`)
    const completedTask = toDoList.tasks.find(task => task.id === id);
    const completedTaskload = { ...completedTask, complete: !completedTask.complete };

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completedTaskload),
    })
      .then(response => response.json())
      .then(updatedTask => {
        let completedList = toDoList.tasks.map(task =>
          task.id === id ? updatedTask : task
        );
        setToDoList({ tasks: completedList });
      })
      .catch(error => console.error('Error updating task:', error));
  };




  const handleToggle = (id) => {
    let mapped = toDoList.tasks.map(task => {
      return task.id === id ? { ...task, complete: !task.complete } : { ...task };
    });
    setToDoList(mapped)
  }
  // Delete Toggle

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setToDoList(prevList => ({
          tasks: prevList.tasks.filter(task => task.id !== id)
        }))
      })
      .catch(error => console.error('Error deleting task:', error));

  };
  // Add Toggle

  const addTask = (userInput) => {
    const newPost = { id: String(toDoList.tasks.length + 1), task: userInput, complete: false }
    if(toDoList.tasks.length >= 3 && !isAuthenticated) {
      alert('You must Login') 
      return;
    }

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(addedTask => {
        console.log(`newPost${newPost}, stringfiedPost${JSON.stringify(newPost)}`)
        setToDoList(prevList => ({
          tasks: [...prevList.tasks, addedTask]
        }));
      
        
        
      })
      .catch(error => console.error('Error adding task:', error));
  };

 
  return (
    <KindeProvider
    clientId="fd75712e756443048b9ecdfaba93d2a6"
    domain="https://jessiejay.kinde.com"
    redirectUri="http://localhost:3000"
    logoutUri="http://localhost:3000"
    >
      <div className="root  ">
        {/* outter container */}
        <h1 class="font-extrabold text-[140px] sm:text-[120px] text-black/5 left-1/2 
       -translate-x-1/2 uppercase top-[-5%] absolute tracking-[0.4em]">TodoApp
        </h1>
        <div className="App flex flex-col justify-center items-center h-screen bg-gradient-to-b from-[#f1d4b3] to-pink-200">
          {/* inner container */}
          <div className=" overflow-hidden relative z-1 w-3/4 h-[50rem] mb-6 bg-white 
         border rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.07)] ">
            <div className=' ' >
              <Header totalTodos={totalTodos}
                CompletedTodos={CompletedTodos}
              />
            </div>

            <div className="h-[150%] grid grid-cols-[7fr_4fr] rows-[70px_1fr] ">
              <div className="section-left text-[22px]  text-black border border-black/[0.08]  scroll-ml-6">
                <Output toDoList={toDoList} deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              </div>

              <div className="section-right #fffcf8 ">
                <TodoList addTask={addTask} />
              </div>

              <div className="todo">

              </div>

            </div>
          </div>


        </div>
        <div className='bg-pink-200 '>
          <Footer />
        </div>
      </div >
    </KindeProvider>
  );
}

export default App;
