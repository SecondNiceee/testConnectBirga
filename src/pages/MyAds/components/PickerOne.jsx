import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import MyAnimation from './MyAnimation';
import MyResponses from './MyResponses';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import { useDispatch, useSelector } from 'react-redux';
import { clearResponses, fetchResponses } from '../../../store/responses';

const PickerOne = forwardRef(({responsesArr, buttonFunction, nowValue} , ref) => {


    const me = useSelector(state => state.telegramUserInfo)

    const interRef = useRef(null)
    console.log(interRef)

    const dispatch = useDispatch()
  
    const [page, setPage] = useState(2)
  
    // useEffect( () => {
    //   if (nowValue === "freelancer" ){
    //     dispatch(fetchResponses(me))
    //   }
    // } , [nowValue] )
  
  
    const responsesStatus = useSelector(state => state.responses.status)
  
  
    useEffect( () => {
      if (nowValue === "freelancer"){
        dispatch(clearResponses())
        dispatch(fetchResponses([me,1]))
      }
    } , [nowValue] )
  
    const  getMore = useCallback( async () => {
      dispatch(fetchResponses([me,page]))
      setPage(page + 1)
  }, [page, setPage , dispatch] )
  
  const onIntersaction = useCallback( (entries) => {
      const firtEntry = entries[0]
      if (firtEntry.isIntersecting && responsesStatus !== 'all' && responsesStatus !== 'pending'){
        getMore()
      } 
  }, [responsesStatus, getMore] )
  
  
  
    useEffect( () => {
      const observer = new IntersectionObserver(onIntersaction)
      if (observer && interRef.current){
        observer.observe(interRef.current)
      }
      return () => {
        observer.disconnect()
      }
    } , [responsesArr])
  

    return (

        <>
        {responsesStatus === "pending" && responsesArr.length === 0 ? 
        <MyLoader />
        :

        <div style={{
            alignSelf : "flex-start"
        }} className="picker__block">
            {responsesArr.length === 0 ? 
                <MyAnimation/> 
            :
                <MyResponses  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />
             }
             <div ref={interRef} className="intersection-block">

             </div>
      </div>
        }
        </>
    );
} );

export default PickerOne;