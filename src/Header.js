import React from "react";

const Header = ({totalTodos, CompletedTodos}) => {
    return (  
        <div className="header bg-[#fbf5ed] h-[10%] col-[1/3] row-[1/2] flex justify-between items-center px-3  border-b border-black/[0.08] py-8 ">
            <img alt="logo" src="https://bytegrad.com/course-assets/react-nextjs/dots.png"/>
            <p className="text-[25px] "><b>
                {CompletedTodos}
                </b> 
            / {totalTodos} todos completed</p>
        </div>
        
    );
}
 
export default Header;