import React, { memo } from "react";
import cl from "./PayTextContainer.module.scss"
const PayTextContainer = () => {
  return (
    <div className={cl.textContainer}>
      <p>
        Что такое <span>кошелек</span> и для чего он нужен?
      </p>
      <p>
        Уже есть кошелек? <span>Войти</span>
      </p>
    </div>
  );
};

export default memo(PayTextContainer);
