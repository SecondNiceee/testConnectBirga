import React from 'react';
import balanceIcon from "../../../../images/profileIcons/balance.svg";
import notificationIcon from "../../../../images/profileIcons/notifications.svg";
import shablonsIcon from "../../../../images/profileIcons/shablons.svg";
import subsctibeIcon from "../../../../images/profileIcons/subscribe.svg";
import tarifIconIcon from "../../../../images/profileIcons/tarif.svg";
import Dimond from "../../../../images/icons/Dimond.svg";
import ArrowRight from "../../../../images/icons/rightArrow.svg";
// import Pencel from "../../components/UI/Pencel/Pencel";
import { Link } from 'react-router-dom';
const Options = () => {
    return (
        <div className="profile__options">
        {/* <Link to="/Balance" className="option__balance">
          <div className="option__left">
            <img src={balanceIcon} className="orangeWallet" alt="" />
            <p>Баланс</p>
          </div>

          <div className="option__balance-block">
            <p className="tonPrice">1 TON</p>
            <img className="Dymond" src={Dimond} alt="" />
            <div className="option__money">
              <p>~</p>
              <p>250₽</p>
            </div>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </Link>
        <div className="option">
          <div className="option__left">
            <img src={tarifIconIcon} className="orangeWallet" alt="" />
            <p>Тарифы</p>
          </div>
          <img src={ArrowRight} className="arrowRight" alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={notificationIcon} className="orangeWallet" alt="" />
            <p>Уведомления</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div>
        <div className="option">
          <div className="option__left">
            <img src={subsctibeIcon} className="orangeWallet" alt="" />
            <p>Подписка за задания</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </div> */}
        <Link style={{
          borderRadius : "9.6px"
        }} to = {"/AllShablons"} className="option">
          <div className="option__left">
            <img src={shablonsIcon} className="orangeWallet" alt="" />
            <p>Шаблоны откликов</p>
          </div>
          <img className="arrowRight" src={ArrowRight} alt="" />
        </Link>
      </div>

    );
};

export default Options;