import React from 'react'
import { FaTimes } from 'react-icons/fa';


const ToDo = ({ todo, deleteTask, completeTask }) => {
    return (
        <div  className="flex justify-between items-center  px-6 h-[70px] mb-3 text-[24px] border-b border-black/[8%] cursor-pointer    "> 
            <div className={todo.complete ? 'strike' : " "} >
                {todo.task}
            </div>
            <p className='text-[#ef4444] text-[18px] font-thin'> <FaTimes onClick={() => deleteTask(todo.id)} className=' cursor-pointer  '  /></p>
        </div>

    );
}

export default ToDo;