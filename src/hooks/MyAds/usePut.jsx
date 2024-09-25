import React, { useCallback } from 'react';
import { putMyTask } from '../../store/information';
import sortFiles from '../../functions/sortFiles';

const usePut = ({details, setSecondPage, setDetails, dispatch}) => {
    const putTask = useCallback( () => {
        console.log(details.task)
        let myFormData = new FormData();
        myFormData.append('title' , String(details.task.taskName))
        myFormData.append('description' , String(details.task.taskDescription))
        myFormData.append("deadline" , String(1))
        myFormData.append("price" , String(details.task.tonValue) )
        myFormData.append("startTime" , details.task.time.start)
        myFormData.append("endTime" , details.task.time.end)
  
        let files = sortFiles(details.task.photosNames ,  details.task.photos)
        
          for (let i = 0; i <  files.removedArr.length; i++){
            myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
          }
          for (let i = 0; i < files.addedArr.length ; i++){
            myFormData.append(`addFiles` , files.addedArr[i] )
          }
  
      dispatch(putMyTask([myFormData, details.task.id , details.task]))
  
      setSecondPage( (value) => ({...value , task : {...details.task}}) )
      setDetails((value) => ({...value , isActive : false}))
      
    } , [details, setSecondPage, setDetails, dispatch] ) 
    return putTask
};

export default usePut;