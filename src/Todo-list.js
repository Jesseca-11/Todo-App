import React, { useState } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';






const TodoList = ({ addTask }) => {
    const [userInput, setUserInput] = useState('');
    const { login, register,logout, isAuthenticated, isLoading, user } = useKindeAuth();
    console.log('this is authenticated', isAuthenticated)
    

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput(" ");
        
    }


    return (
        <div className='flex-col col-[2/3] row[2/3] w-full h-[210px]  
            border-1 border-black/[0.08] pt-[18px] pb-[20px] px-[25px] justify-content-end '>
            <form onSubmit={handleSubmit} >

                <h2 className='font-medium text-[20px]'>Add a todo</h2>
                <input type="text" value={userInput} onChange={handleChange} placeholder='Enter task...' className='caret-gray-600 h-[50px] my-[10px]  text-[14px] rounded-[10px] px-[18px] border border-black/[15%] block text-[20px] block w-full' />
                <button className='w-full text-white h-[50px] my-[10px] px-[10px] mb-[350px] rounded-[10px] bg-[#473a2b] outline hover:outline-gray-400/40'>Add To List</button>
            </form>

            <div className='mt-auto space-y-2'>
            {
                isLoading ? null: isAuthenticated ? (
                    <>
                    <p className='text-sm'> LoggedIn as {user ?.email}</p>
                    <button onClick={logout} buttonType="secondary" className='rounded-md border-inherit bg-indigo-500 p-3 w-full text-bold text-white h-[50px] my-[10px] px-[10px]  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-700 duration-200'>Logout</button>
                    </>
                ) : (
                    <>
                    <button onClick={login} className='w-full text-bold text-white h-[50px] my-[10px] px-[10px] rounded-[10px] bg-[#473a2b]  outline hover:outline-gray-400/40'>Login</button>
                    <button onClick={register} className='w-full text-white h-[50px] my-[10px] px-[10px] rounded-[10px] bg-[#473a2b] cursor-pointer outline hover:outline-gray-400/40'>Register</button>
                 </>
                )
            }
            </div>
            
            


        </div>


    );
}

export default TodoList;