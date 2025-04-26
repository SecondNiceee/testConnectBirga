import {configureStore} from '@reduxjs/toolkit'
import information from './information';
import ton from './ton';
import menuSlice from './menuSlice'
import telegramUserInfo from './telegramUserInfo';
import categorys from './categorys';
import shablon from './shablon';
import  watchedAds  from './watchedAds';
import saves from './saves';
import responses from './responses';
import balance from './balance';
import profession from "./profession";

export default configureStore( {
    reducer : {
        information : information,
        ton : ton,
        menuSlice : menuSlice,
        telegramUserInfo : telegramUserInfo,
        categorys : categorys,
        shablon : shablon,
        watchedAds : watchedAds,
        saves : saves,
        responses : responses,
        balance : balance,
        profession : profession
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),

});

