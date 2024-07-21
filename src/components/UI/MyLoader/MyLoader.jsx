import { Triangle } from "react-loader-spinner";
import cl from "./MyLoader.module.css"
import { forwardRef } from "react";
const MyLoader = forwardRef(({...props}, ref) => {
    return (
      <div
      ref={ref}
       {...props}
        className={cl.main}
      >
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="white"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  } );
  export default MyLoader