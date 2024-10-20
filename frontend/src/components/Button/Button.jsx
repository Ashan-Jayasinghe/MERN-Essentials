import React from "react";
import "./Button.css";


//using arrow function
const Button = props => {
    return(
        <button className="button" type={props.type}>
            {props.children}
        </button>
    )
}

//without arrow function
// function Button(props){
//     const {type, children} =props;
//     return(
//         <button className="button" type={type}>
//             {children}
//         </button>
//     );
// }
export default Button;