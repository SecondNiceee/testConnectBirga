import React, { memo, useCallback, useEffect, useState } from "react";
import cl from "../index.module.scss";
import Buttons from "./Buttons";
import { Address, fromNano } from "ton-core";
import { TonClient } from "ton";
import { useSelector } from "react-redux";
import en from "../../../constants/language";
const MainPage = ({ setDepositShow, setWithDrawal, balance }) => {
  const address = useSelector((state) => state.telegramUserInfo.address);

  const value = useSelector((state) => state.ton.value);
  console.log(value);

  return (
    <div className={cl.wrapper}>
      <div className={cl.top}>
        <p>Кошелек</p>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.47315 8.24096C9.47315 7.88592 9.18534 7.5981 8.83029 7.5981C8.47525 7.5981 8.18744 7.88592 8.18744 8.24096H9.47315ZM8.18744 11.6113C8.18744 11.9664 8.47525 12.2542 8.83029 12.2542C9.18534 12.2542 9.47315 11.9664 9.47315 11.6113H8.18744ZM8.70067 5.51874V4.87588C8.34563 4.87588 8.05781 5.1637 8.05781 5.51874H8.70067ZM8.70067 5.77799H8.05781C8.05781 6.13303 8.34563 6.42085 8.70067 6.42085V5.77799ZM8.95992 5.77799V6.42085C9.31496 6.42085 9.60278 6.13303 9.60278 5.77799H8.95992ZM8.95992 5.51874H9.60278C9.60278 5.1637 9.31496 4.87588 8.95992 4.87588V5.51874ZM15.5763 8.50022C15.5763 12.2259 12.556 15.2462 8.83029 15.2462V16.532C13.2661 16.532 16.862 12.936 16.862 8.50022H15.5763ZM8.83029 15.2462C5.10456 15.2462 2.08426 12.2259 2.08426 8.50022H0.798549C0.798549 12.936 4.39448 16.532 8.83029 16.532V15.2462ZM2.08426 8.50022C2.08426 4.77449 5.10456 1.75419 8.83029 1.75419V0.468471C4.39448 0.468471 0.798549 4.06441 0.798549 8.50022H2.08426ZM8.83029 1.75419C12.556 1.75419 15.5763 4.77449 15.5763 8.50022H16.862C16.862 4.06441 13.2661 0.468471 8.83029 0.468471V1.75419ZM8.18744 8.24096V11.6113H9.47315V8.24096H8.18744ZM8.05781 5.51874V5.77799H9.34352V5.51874H8.05781ZM8.70067 6.42085H8.95992V5.13514H8.70067V6.42085ZM9.60278 5.77799V5.51874H8.31707V5.77799H9.60278ZM8.95992 4.87588H8.70067V6.16159H8.95992V4.87588Z"
            fill="#DAF5FE"
          />
        </svg>
      </div>
      {/* <p className={cl.priceText}>
          <span>≈T</span>{balance}
        </p> */}
      <p className={cl.priceText}>
        ~ {String(balance * value).slice(0, 5)}
        <span>{en ? "$" : "₽"}</span>
      </p>
      <Buttons setWithDrawal={setWithDrawal} setDepositShow={setDepositShow} />

      <div className={cl.monetka}>
        <div className={cl.left}>
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2409_16018)">
              <path
                d="M20.668 40.333C31.7137 40.333 40.668 31.3787 40.668 20.333C40.668 9.28729 31.7137 0.333008 20.668 0.333008C9.62225 0.333008 0.667969 9.28729 0.667969 20.333C0.667969 31.3787 9.62225 40.333 20.668 40.333Z"
                fill="#0098EA"
              />
              <path
                d="M27.4957 11.4961H13.8373C11.326 11.4961 9.73432 14.205 10.9978 16.395L19.4272 31.0055C19.9773 31.9595 21.3558 31.9595 21.9058 31.0055L30.337 16.395C31.5987 14.2085 30.007 11.4961 27.4974 11.4961H27.4957ZM19.4203 26.624L17.5845 23.0711L13.155 15.1487C12.8628 14.6417 13.2237 13.9919 13.8356 13.9919H19.4186V26.6257L19.4203 26.624ZM28.1746 15.147L23.7468 23.0728L21.911 26.624V13.9902H27.494C28.1059 13.9902 28.4668 14.64 28.1746 15.147Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2409_16018">
                <rect
                  width="40"
                  height="40"
                  fill="white"
                  transform="translate(0.667969 0.333008)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>TON</p>
        </div>
        <div className={cl.right}>
          <p>{balance}</p>
          <p>≈{balance * value}{en ? "$" : "₽"}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(MainPage);
