import React, { useEffect } from 'react';
import menu from '../../../constants/menu';

const useMenu = () => {
    useEffect( () => {


        if (menu){
          menu.classList.add("disappearAnimation")
          menu.classList.remove("appearAnimation")
        }
    
      } , [] )
};

export default useMenu;