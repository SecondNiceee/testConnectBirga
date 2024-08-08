import React, { memo } from "react";
import Pallete from "../../UI/Pallete/Pallete";
import ShareIcon from "../../UI/ShareIcon/ShareIcon";

const FirstMainTop = ({isMyAds , category, isWatched, taskName, id, end}) => {
  return (
    <div
      className="FirstMain__top"
      style={isMyAds ? { marginTop: "13px" } : {}}
    >
      <Pallete category={category} />
      <p className={isWatched ? "watchedTask" : ""}>{taskName}</p>
      <ShareIcon
        onClick={() => {
          window.Telegram.WebApp.openTelegramLink(
            "https://t.me/share/url?text=привет" + "Задание<b>" + `${taskName}<b>наКоннектБирже` + "&url=https://t.me/ConnectexBot/task?startapp=" +
              String(id)
          );
        }}
        style={end ? { opacity: 0.5 } : {}}
        className="share__icon"
      />
    </div>
  );
};

export default memo(FirstMainTop);
