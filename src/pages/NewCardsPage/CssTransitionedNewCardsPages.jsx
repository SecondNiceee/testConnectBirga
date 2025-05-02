import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import "../../styles/left-right.css"
import NewCardsPage from './NewCardsPage';

const CssTransitionedNewCardsPages = ({isOpened, setCardPageOpen, userInfo, setCard}) => {
    return (
        <CSSTransition in = {isOpened} unmountOnExit mountOnEnter classNames={"left-right"} timeout={{enter : 0, exit : 300}}>
            <NewCardsPage  setCardPageOpen   = {setCardPageOpen} setCard = {setCard} userInfo = {userInfo}  />
        </CSSTransition>
    );
};

export default memo(CssTransitionedNewCardsPages);