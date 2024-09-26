import React from 'react';

import ToDo from './ToDo';





const Output = ({ toDoList, deleteTask, completeTask }) => {




    return (
        <div className='w-full h-full flex justify-start items-start ms-3 mt-8  '>
            <ul className='pt-[17px]'>
                {console.log("list", toDoList)}
                {toDoList.tasks.length === 0 && (<li className='flex justify-center items-center w-[270px] lg:items-center font-semibold  h-full mt-[220px] mx-[80px] '> Start by adding a todo...</li>)}
            </ul>



            <ul  className='w-5/6 ms-0'>

                {toDoList.tasks.map((todo) => (

                        <li key={todo.id} onClick={() => completeTask(todo.id)} ><ToDo todo={todo} deleteTask={deleteTask} 
                         />  </li>

                    )
                    )
                }
            </ul>


        </div>
    );
}

export default Output;