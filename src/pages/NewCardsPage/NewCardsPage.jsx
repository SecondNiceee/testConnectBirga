import React, { useState } from "react";
import ModalChoicer from "../../components/UI/ModalChoicer/ModalChoicer";
import { CardsFilterEnum } from "./enums/CardsFilterEnum";
import { filterNames } from "./constants/filterNames";
import { filterValues } from "./constants/filterValues";
import Case from "../../components/UI/Case/Case";

const NewCardsPage = ({ userInfo, setCard }) => {

  const [filter, setFilterBy] = useState(CardsFilterEnum.WATCHES);


  const cards = userInfo.profile.cards;

  return (
    <div className="pt-[16px] left-right z-20 fixed left-0 top-0 w-screen h-screen overflow-y-auto px-[16px] bg-[#18222d] flex flex-col pb-[100px]">
      <h2 className="pl-4 font-semibold font-sf-pro-display-600 text-white text-[20px]">
        Портфолио
      </h2>

      <div className="flex justify-between pl-4 pr-4 items-center mt-[12px]">
        <p className="font-sf-pro-display-400  font-normal text-[13px] text-[#84898F] uppercase leading-[15.6px]">
          Сортировка
        </p>
        <ModalChoicer
          setValue={(value) => {
            setFilterBy(value);
          }}
          className={"MyAds-choicer"}
          values={filterValues}
          names={filterNames}
          defaultValue={filterValues[0]}
        />
      </div>

      <div className="flex flex-col gap-2 w-full mt-2">
        {cards.map((card, i) => (
          <Case
            createdAt={card.createdAt}
            photos={card.photos}
            title={card.title}
            description={card.description}
            card={card}
            openFunc={() => {
                setCard(card)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCardsPage;
