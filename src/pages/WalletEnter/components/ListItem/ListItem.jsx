import React, { memo } from 'react';
import cl from "./ListItem.module.scss"
const ListItem = ({number, name}) => {
    return (
      <div className={cl.listItem}>
        <p>{number}.</p>
        <p>{name}</p>
      </div>
    );
};

export default memo(ListItem);