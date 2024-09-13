import React from 'react';
import cl from "./ListContainer.module.scss"
import ItemInput from '../ListItem/ItemInput';

const arr1 = [1, 2,3, 4,5,6]
const arr2 = [7,8,9,10,11,12]
const ListInput = () => {
    return (
    <div className={cl.listContainer}>
        <div className={cl.list}>
            {arr1.map(e => 
                <ItemInput number={e} />
            )}
        </div>
        <div className={cl.list}>
            {arr2.map(e => 
                    <ItemInput number={e} />
                )}
        </div>
      </div>
    );
};

export default ListInput;