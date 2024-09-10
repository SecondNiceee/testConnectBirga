import React, { memo, useCallback, useState } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import CreateButton from '../../../Profile/components/CreateButton/CreateButton';
import TextAlertBlock from '../TextAlertBlock/TextAlertBlock';
import cl from "./One.module.scss"
import { CSSTransition } from 'react-transition-group';
import MyLoader from '../../../../components/UI/MyLoader/MyLoader';


async function copyTextToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard...')
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
  
const One = ({keys, className}) => {
    
        const [copyState, setCopyState] = useState(false)

        const clickHandler = useCallback( () => {
            if (keys){
            copyTextToClipboard(keys.join(' '))
            setCopyState((value) => (!value))
            }
        } , [keys] )
  
  return (
        <div
          className={className ? [cl.container, className].join(" ") : cl.container}
        >
          {keys ? (
            <>
              <h2 className={cl.title}>Ваша секретная фраза</h2>

              <p className={cl.topText}>
                Эта фраза — очень важное сочетание слов, которое поможет вам
                восстановить кошелек, если вы выйдете из системы или потеряете
                устройство.
              </p>

              <ListContainer keys={keys} />

              <CreateButton onClick={clickHandler} className={cl.createButton}>
                <p>Скопировать</p>
              </CreateButton>

              <TextAlertBlock />

              <CSSTransition in={copyState} timeout={2000} classNames={"modal-copy"}>
                <p className={cl.copyText}>Скопировано!</p>
              </CSSTransition>
            </>
          )
          :
          <MyLoader style = {{
            width : "100vw",
            transform : "-16px"
          }} />
        }
        </div>
    );
};

export default memo(One);