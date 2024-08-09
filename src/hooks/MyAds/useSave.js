import { useCallback } from "react";
import { putMyTask } from "../../store/information";

export const useSave = ({detailsVar, myAdsArray, secondPage, checkMistakes, sortFiles, dispatch, setDetails, details }) =>{
    const save = useCallback( () => {
        if (details.task !== myAdsArray[secondPage.index] ) {
          window.Telegram.WebApp
            .showPopup({
              title: "Сохранить?",
              message: "Сохранить изменения перед выходом?",
              buttons: [
                { id: "save", type: "default", text: "Да" },
                { id: "delete", type: "destructive", text: "Нет" },
              ],
            } , (buttonId) => {
    
              if (buttonId === "delete" || buttonId === null) {
                setDetails((value) => ({...value , isActive : false}))
              }
              if (buttonId === "save") {
                console.log(details.task)
              if (checkMistakes(details.task)){
              let myFormData = new FormData();
              myFormData.append('title' , detailsVar.task.taskName)
              myFormData.append('description' , detailsVar.task.taskDescription)
              myFormData.append("deadline" , 1)
              myFormData.append("price" , detailsVar.task.tonValue )
              myFormData.append("startTime" , detailsVar.task.time.start)
              myFormData.append("endTime" , detailsVar.task.time.end)
    
              let files = sortFiles(details.task.photosNames ,  details.task.photos)
              console.warn(files)
              
              console.log(files)
                for (let i = 0; i <  files.removedArr.length; i++){
                  myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
                }
                for (let i = 0; i < files.addedArr.length ; i++){
                  myFormData.append(`addFiles` , files.addedArr[i] )
                }
    
              dispatch(putMyTask([myFormData, details.task.id , details.task]))
    
              
              setDetails((value) => ({...value , isActive : false}))
              }
              else{
                window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
              }
    
            }
            } )
            
        } else {
          setDetails((value) => ({...value , isActive : false}))
        }
         // eslint-disable-next-line
      }, [details , dispatch , myAdsArray , setDetails , secondPage.index, checkMistakes  ] ) 

      return save
}