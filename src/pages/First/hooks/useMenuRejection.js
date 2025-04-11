import { useEffect } from "react";
import { useSelector } from "react-redux";

const useMenuRejection = ({setCardOpen, setCategoryOpen, setDetailsActive, setProfile, setResponce, setStep, setSubCategory  }) => {
    const changer = useSelector( state => state.menuSlice.changer )
    useEffect( () => {
      setCardOpen((value) => ({...value , isOpen : false}))
      setCategoryOpen(false)
      setDetailsActive((value) => ({...value , isOpen : false}))
      setProfile(false)
      setResponce((value) => ({...value , isShablon : false , isShablonModalActive: false, shablonMaker : false}))
      setStep(0)
      setSubCategory(false)
    } , [changer] )
};

export default useMenuRejection;