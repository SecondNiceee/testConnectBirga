import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useGetOptionsConfig = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo); 

    const navigate = useNavigate();
    
    return (
        [
            {
                imgPath : "/images/newProfile/baidge-icon.svg",
                text : "Бэйдж исполнителя",
                isNeededFill : true,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    if (userInfo.profession){
                        navigate("/Baidge")
                    }
                    else{
                        navigate("/BaidgeCreating")
                    }
                },
                numberNearToArrow : null
            },
            {
                imgPath : "/images/newProfile/example-of-works-icon.svg",
                text : "Примеры работ",
                isNeededFill : true,
                isNeededActiveTitle : false,
                clickFunc : () => {},
                numberNearToArrow : null
            },
            {
                imgPath : "/images/newProfile/template-of-responses-icon.svg",
                text : "Шаблоны откликов",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {},
                numberNearToArrow : null
            }
        ]
    );
};

export default useGetOptionsConfig;