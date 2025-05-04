import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import "../../styles/left-right.css"
import NewCardsPage from './NewCardsPage';

const CssTransitionedNewCardsPages = ({isOpened, setCardPageOpen, userInfo, setCardId}) => {
    return (
        <CSSTransition in = {isOpened} unmountOnExit mountOnEnter classNames={"left-right1"} timeout={{enter : 0, exit : 300}}>
            <NewCardsPage  setCardPageOpen = {setCardPageOpen} setCardId = {setCardId} userInfo = {userInfo}  />
        </CSSTransition>
    );
};

export default memo(CssTransitionedNewCardsPages);