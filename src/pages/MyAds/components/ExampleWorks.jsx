import React, { memo } from "react";
import Case from "../../../components/UI/Case/Case";
import Text from "../../../components/Text/Text";

const ExampleWorks = ({
  cards,
  openFunc,
  userId,
  setPhotos,
  setSliderOpened,
  setPhotoIndex,
}) => {
  return (
    <div className="examplesWork">
      {cards.length === 0 ? (
        <Text className="exampleWork-text">Нет примеров работ</Text>
      ) : (
        <Text className="exampleWork-text">Примеры работ</Text>
      )}

      <div className="cards__wraaper">
        {cards.map((e, i) => {
          return (
            <Case
              key={i}
              setPhotos={setPhotos}
              setSliderOpened={setSliderOpened}
              setPhotoIndex={setPhotoIndex}
              userId={userId}
              card={e}
              openFunc={openFunc}
              task={e}
              title={e.title}
              description={e.description}
              photos={e.photos}
              watchOnly={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(ExampleWorks);
