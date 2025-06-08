const ProfilesCounterOfWatches = ({watchesCounter}) => {
    return (
        <div className="flex mt-[23px] flex-col !ml-[5px] mr-[3px] gap-[5px] my-auto">
        <h2 className="font-sf-pro-display-600 text-[17px] text-[#DAF5FE] leading-[18px]">
          {watchesCounter}
        </h2>
        <p className="font-sf-pro-display max-w-[70px] tracking-wide text-[13px] text-white leading-[16px]">
          просмотров профиля
        </p>
      </div>
    );
};

export default ProfilesCounterOfWatches;