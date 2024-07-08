import { useCallback } from "react";

export const useSave = ({detailsVar, myAdsArray, secondPage, checkMistakes, sortFiles, dispatch, putMyTask, setDetails, details }) =>{
    const save = useCallback( () => {
        console.log(details.task)
        console.log(myAdsArray[secondPage.index])
        function checkOut(){
            if (JSON.stringify(details.task) === JSON.stringify(myAdsArray[secondPage.index])){
                if (JSON.stringify(details.task.time) === JSON.stringify(myAdsArray[secondPage.index].task.time)){
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }
        if (details.task !== myAdsArray[secondPage.index] && checkMistakes(detailsVar.task)) {
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
              let myFormData = new FormData();
              myFormData.append('title' , detailsVar.task.taskName)
              myFormData.append('description' , detailsVar.task.taskDescription)
              myFormData.append("deadline" , 1)
              myFormData.append("price" , detailsVar.task.tonValue )
              myFormData.append("startTime" , detailsVar.task.time.start)
              myFormData.append("endTime" , detailsVar.task.time.end)
    
              let files = sortFiles(detailsVar.task.photosNames ,  detailsVar.task.photos)
    
    
                for (let i = 0; i <  files.removedArr.length; i++){
                  myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
                }
                for (let i = 0; i < files.addedArr.length ; i++){
                  myFormData.append(`addFiles[${i}]` , files.addedArr[i] )
                }
    
              dispatch(putMyTask([myFormData, detailsVar.task.id , detailsVar.task]))
    
              
              setDetails((value) => ({...value , isActive : false}))
              }
    
    
            } )
            
        } else {
          setDetails((value) => ({...value , isActive : false}))
        }
      }, [details , dispatch , myAdsArray , setDetails , secondPage.index  ] ) 
      return save
}