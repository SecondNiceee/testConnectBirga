import { Triangle } from "react-loader-spinner";
import cl from "./MyLoader.module.css"
const MyLoader = ({...props}) => {
    return (
      <div
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
  };
  export default MyLoader