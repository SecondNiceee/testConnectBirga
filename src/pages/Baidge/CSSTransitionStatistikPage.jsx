import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Baidge from './Baidge';
import "../../styles/left-right.css"
import StatisticPage from '../StatisticPage/StatisticPage';

const CSSTransitionStatistikPage = ({isStatisticOpened, userConfig, cards}) => {
    return (
        <CSSTransition classNames={"left-right"} in = {isStatisticOpened} timeout={{enter : 0, exit : 300}} unmountOnExit mountOnEnter >
            <StatisticPage cards={cards} userConfig={userConfig}  />
        </CSSTransition>        
    );
};

export default CSSTransitionStatistikPage;