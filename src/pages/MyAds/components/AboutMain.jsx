import React from "react";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";

const AboutMain = ({aboutU , aboutReaction}) => {
  return (
    <div className="aboutMain">
      <div className="aboutMeTitle">
        <p>О себе</p>
      </div>
      <TextAboutMe aboutU={aboutU} />
      <TextAboutMe aboutU={aboutReaction} darkSide={true} style = {{
        marginTop : '22px'
      }}  />
      {/* <div className="TextContainer">
        <div className="background"></div>
        <textarea className="about-reaction-textarea" value={aboutReaction} />
        <div className="also">
          <p>Читать полностью</p>
        </div>
      </div> */}
    </div>
  );
};

export default AboutMain;
