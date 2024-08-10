import React, { memo } from "react";
import Case from "../../../../components/UI/Case/Case";

const CardsArray = ({deleteFunction , cards ,setChangeActive  , setIndex }) => {
  return (
    <>
      {cards.length !== 0 ? (
        cards.map((e, i) => {
          return (
            <Case
              deleteFunction={() => {
                deleteFunction(i, e);

                // index = i
                // setAboutU({...aboutULocal , cards : [...aboutU.cards.filter((e , i) => {
                //   return i !== index
                // })]})
                // dispatch(deleteCard(index))
                // dispatch(deleteServerCard(e.id))
              }}
              changeFunction={() => {
                // document.documentElement.style.overflow = "hidden";
                setChangeActive(true);
                setIndex(i);
              }}
              card={e}
              key={i}
              className={"profile-case"}
              title={e.title}
              description={e.description}
              photos={e.photos}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(CardsArray);
