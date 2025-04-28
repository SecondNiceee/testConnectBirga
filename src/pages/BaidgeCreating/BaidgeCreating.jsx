import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions } from "../../store/profession";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeCreaitingOne from "./BaidgeCreaitingOne";
import BaidgeCreatingTwo from "./BaidgeCreatingTwo";
import { useNavigate } from "react-router";
import BaidgeButtonConroller from "./hooks/BaidgeButton.conroller";
import MainButton from "../../constants/MainButton";
import BackButton from "../../constants/BackButton";
import menuController from "../../functions/menuController";
import { fetchUserInfo, putUserInfo } from "../../store/telegramUserInfo";

const BaidgeCreating = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessions());
  }, [dispatch]);

  const categorys = useSelector((state) => state.categorys.category);

  const professions = useSelector((state) => state.profession.professions);

  console.log(professions);

  const [description, setDescription] = useState("");

  const taskInformation = {
    category: categorys[0],
    subCategory: { subCategory: "Привет" },
  };

  const [taggsText, setTaggsText] = useState("");

  const [taggs, setTaggs] = useState([]);

  const [links, setLinks] = useState([""]);

  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const [isCategoryOpen, setCategoryOpen] = useState(false);

  const [isProfessionOpened, setProfessionOpened] = useState(false);

  const [categoryInformation, setCategoryInformation] = useState({
    category: categorys[0],
    profession: {},
  });

  const [errors, setErrors] = useState({
    descriptionError: false,
    taggsError: false,
    linksError: false,
  });

  useEffect(() => {
    BaidgeButtonConroller.controlText({ step });
  }, [step]);

  useEffect(() => {
    const notEmptyLinks = links.filter( (link) => link.length !== 0 )
    const notEmptyTaggs = taggs.filter( (tag) => tag.length !== 0 )
    const lErrors = {
      descriptionError: false,
      taggsError: false,
      linksError: false,
    };
    notEmptyLinks.forEach( (link, i) => {
      if (!link.includes("http")){
        lErrors.linksError = true
      }
    } )

    if (description.length > 500 || description.length < 5) {
      lErrors.descriptionError = true;
    }
    if (notEmptyLinks.length > 5 || notEmptyLinks.length === 0) {
      lErrors.linksError = true;
    }
    if (notEmptyTaggs.length > 5 || notEmptyTaggs.length === 0){
        lErrors.taggsError = true
    }
    setErrors(lErrors);
  }, [description, links, taggs]);

  useEffect(() => {
    BaidgeButtonConroller.controlVisability({ errors, isCategoryOpen, isProfessionOpened, step });
  }, [errors, isCategoryOpen, isProfessionOpened, step]);

  

  const postBaidge = async () => {
        await dispatch(putUserInfo([{
            links : links,
            taggs : taggs,
            profession : categoryInformation.profession.id,
            about : description
        }])  )
        await dispatch(fetchUserInfo())

        navigate("/Baidge")
        
  }

  const goFoward = BaidgeButtonConroller.forwardFunction({
    setStep,
    step,
    isCategoryOpen,
    isProfessionOpened,
    description,
    dispatch,
    links,
    professionId : categoryInformation.profession.id,
    taggs,
    postBaidge
  });
  useEffect(() => {
    const goBack = BaidgeButtonConroller.backFunction({
      navigate,
      step,
      setStep,
      isCategoryOpen,
      isProfessionOpened,
    });
    MainButton.onClick(goFoward);
    BackButton.onClick(goBack);
    return () => {
      MainButton.offClick(goFoward);
      BackButton.offClick(goBack);
    };
  }, [step, navigate, setStep, isCategoryOpen, isProfessionOpened, description, links, taggs, dispatch, categoryInformation.profession.id]);

  useEffect(() => {
    MainButton.show();
    BackButton.show();
    return () => {
      MainButton.hide();
      BackButton.hide();
    };
  }, []);

  useEffect(() => {
    menuController.lowerMenu();
  }, []);

  if (categorys.length === 0 || professions.length === 0) {
    return <MyLoader />;
  }
  return (
    <div
      className={`flex min-w-[200vw] transition-transform duration-300 ${
        step === 0 ? "translate-x-0" : "-translate-x-[100vw]"
      }`}
    >
      <button className="fixed left-[100vw]" onClick={goFoward}>ГО</button>
      <button className="fixed left-[0vw]" onClick={goFoward}>ГО</button>
      <BaidgeCreaitingOne
    
        categoryInformation={categoryInformation}
        isCategoryOpen={isCategoryOpen}
        isProfessionOpened={isProfessionOpened}
        setCategoryInformation={setCategoryInformation}
        setCategoryOpen={setCategoryOpen}
        setProfessionOpened={setProfessionOpened}
        description={description}
        setDescription={setDescription}
        taskInformation={taskInformation}
      />
      <BaidgeCreatingTwo
        links={links}
        setLinks={setLinks}
        setTaggs={setTaggs}
        setTaggsText={setTaggsText}
        taggs={taggs}
        taggsText={taggsText}
      />
    </div>
  );
};

export default BaidgeCreating;
