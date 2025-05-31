
const Profession = ({professtion}) => {
  console.log(professtion);
    return (
        <div className={`py-[3px] px-[9px] rounded-[7px] bg-[#FFD60A1A] w-fit`}>
        <p style={{
          color : professtion.color
        }} className="font-sf-pro-display tracking-wide text-[14px]">
          {professtion?.profession ?? "Не указана профессия"}
        </p>
      </div>
    );
};

export default Profession;