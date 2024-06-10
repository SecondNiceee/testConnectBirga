import React, { useEffect, useState } from 'react';
import cl from './ShowComponents.module.css'
const ShowComponents = ({children}) => {
    const [documentWidth ,setWidthOfDocument] = useState(document.documentElement.clientWidth)
    useEffect( ()=>{
        function change(){
            setWidthOfDocument(document.documentElement.clientWidth)
        }
        window.addEventListener('resize' , change )
        return () => {
            window.removeEventListener('resize' , change)
        }
    } 
    , [])

    React.Children.map(children ,  child => {
        return <p>привет</p>
    }
)
    // useEffect(() => {
    //     function addKey(){
    //         React.Children.forEach(child => child.style.minWidth = (document.documentElement.clientWidth - 32).toString() + "px")
    //     }
    //     addKey()
    //     window.addEventListener("resize", addKey);
    //     return () => {
    //         window.removeEventListener("resize", addKey);
    //       };
    //   }, []);
    return (
        <div className={cl.moving}>
                {    React.Children.map(children ,  child => {
        let myChild = child
        myChild.props.style.minWidth =  (documentWidth - 32).toString() + "px"
        return child
    }
)}
        </div>
    );
};

export default ShowComponents;