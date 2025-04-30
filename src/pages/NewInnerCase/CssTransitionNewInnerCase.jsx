import React from 'react';
import NewInnerCase from './NewInnerCase';
import { CSSTransition } from 'react-transition-group';

const CssTransitionNewInnerCase = ({isOpened, card, userInfo}) => {
    return (
        <CSSTransition in = {isOpened} unmountOnExit mountOnEnter classNames={"left-right"} timeout={{enter : 0, exit : 300}}>
            <NewInnerCase userInfo={userInfo} casePar={card}  />
        </CSSTransition>
    );
};

export default CssTransitionNewInnerCase;