import React, { memo, useCallback, useState } from "react";
import GreyText from "../../../components/UI/GreyText/GreyText";
import cl from "../index.module.scss";
import WithdrawalCap from "./WithdrawalCap";
import CreateInput from "../../../components/UI/CreateInput/CreateInput";
import Compact from "./Compact";
const WithdrawalPage = () => {
  const [myValues, setMyValues] = useState({
    address: "",
    summ: 0,
  });
  const valuesChanger = useCallback((e) => {
    setMyValues((value) => ({ ...value, address: e }));
  }, []);
  const summChange = useCallback((e) => {
    setMyValues((value) => ({ ...value, summ: Number(e) }));
  }, []);
  return (
    <div className={cl.withDrawal}>
      <WithdrawalCap />

      <Compact
        greyText={"Адрес"}
        inputPlaceholder={"Введите адрес кошелька"}
        inputType={"text"}
        inputValue={myValues.address}
        onChange={valuesChanger}
      />

     <div className={cl.informationBlock}>
        <p>
          Убедитесь, что вы выводите свои токены на правильный адрес и в
          правильную сеть (TON)
        </p>
      </div>

      <Compact
        greyText={"Сумма"}
        inputPlaceholder={"Введите сумму (минимум 0.05)"}
        inputType={"number"}
        inputValue={String(myValues.summ)}
        onChange={summChange}
        className={cl.summBlock}
      />


    </div>
  );
};

export default memo(WithdrawalPage);
