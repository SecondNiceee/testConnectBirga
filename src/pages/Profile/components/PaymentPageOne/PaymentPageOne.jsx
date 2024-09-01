import React from "react";
import cl from "./PaymentPageOne.module.scss";
import CreateButton from "../CreateButton/CreateButton";
const PaymentPageOne = ({ className }) => {
  return (
    <div
      className={className ? [cl.container, className].join(" ") : cl.container}
    >
      <h2 className={cl.title}>Ваша секретная фраза</h2>
      <p className={cl.topText}>
        Эта фраза — очень важное сочетание слов, которое поможет вам
        восстановить кошелек, если вы выйдете из системы или потеряете
        устройство.
      </p>
      <div className={cl.listContainer}>
        <div className={cl.list}>
          <div className={cl.listItem}>
            <p>1.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>2.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>3.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>4.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>5.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>6.</p>
            <p>Lantern</p>
          </div>
        </div>
        <div className={cl.list}>
          <div className={cl.listItem}>
            <p>1.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>2.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>3.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>4.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>5.</p>
            <p>Lantern</p>
          </div>
          <div className={cl.listItem}>
            <p>6.</p>
            <p>Lantern</p>
          </div>
        </div>
      </div>
      <CreateButton className={cl.createButton}>
        <p>Скопировать</p>
      </CreateButton>

      <div className={cl.textAlertBlock}>
        <p>Обратите внимание!</p>
        <p>
          Если вы потеряете свою сид-фразу, вы не сможете восстановить кошелёк!
          Скопируйте сид-фразу и сохраните ее в безопасном месте
        </p>
      </div>
    </div>
  );
};

export default PaymentPageOne;
