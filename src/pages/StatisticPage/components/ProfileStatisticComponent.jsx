import useGetProfileStatistics from '../hooks/useGetProfileStatistics';

const ProfileStatisticComponent = ({userConfig}) => {

    const profileStatisticConfig = useGetProfileStatistics({ userConfig });
    return (

        <div className="flex mt-[11px] flex-col gap-[7px] w-[100%] text-[#84898f]">
        <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
          Профиль
        </p>
            <div className="flex flex-col rounded-[12px] bg-[#20303f]">
                {profileStatisticConfig.map((e, i) => (
                        <div className={`flex cursor-pointer flex-col  pt-[8px] `}>
                            <div className='flex items-center justify-center'>
                                    <p className="font-sf-pro-display-400 ml-[19px] tracking-[.015em]  text-[17px] text-white">{e.title}</p>
                                    <p className='font-sf-pro-display-400 text-[17px] mr-[19px] ml-auto  text-white'>{e.text}</p>
                            </div>
                            <div className={`${i !== profileStatisticConfig.length-1 ? 'opacity-1' : 'opacity-0'} w-[calc(100%-19px)] mt-[8px] h-[0.5px] ml-auto bg-[#384656]`}></div>
                        </div>
                ))}
            </div>

      </div>
    );
};

export default ProfileStatisticComponent;