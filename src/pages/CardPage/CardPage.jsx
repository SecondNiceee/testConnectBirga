import React, { memo, useMemo } from "react";
import cl from "./CardPage.module.css";
import InnerCase from "../../components/CardPage/InnerCase/InnerCase";
import FullDescription from "../../components/First/FirstDetails/FullDescription";
import LinkComp from "../../components/CardPage/Link/LinkComp";
const CardPage = ({ card , ...props }) => {
    const linksComponents = useMemo( () => {
            return (
            <div  className={cl.cardsLinks}>
            {card.behanceLink.length > 0 ? 
                <LinkComp navigate={"behance"} link={card.behanceLink}  />
                :
                <></>
            }

            {card.dribbbleLink.length > 0 ? 
                <LinkComp navigate={"driple"} link={card.dribbbleLink}  />
                :
                <></>
            }

            {card.dropfileLink.length > 0 ? 
            <LinkComp navigate={"dropfile"} link={card.dropfileLink}  />
            :
            <></>
    }




            
            </div>
        )
    } , [card.dropfileLink, card.behanceLink , card.dribbbleLink] )

  return (
    <div {...props} className={cl.wrapper}>
      <InnerCase
        task={card}
        title={card.title}
        description={card.description}
        photos={card.photos}
      />
      <FullDescription style = {{
        marginTop : "8px"
      }}  fullDescription={card.description} />
      {card.dropfileLink.length > 0}
      {linksComponents}
      
    </div>
  );
};

export default memo(CardPage);
