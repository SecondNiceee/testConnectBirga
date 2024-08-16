import React from "react";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import Text from "../../../components/Text/Text";

const AboutMain = ({aboutU , aboutReaction}) => {
  return (
    <div className="aboutMain">
      <div className="aboutMeTitle">
        <Text>О себе</Text>
      </div>
      <TextAboutMe aboutU={aboutU} />
      {/* <TextAboutMe aboutU={aboutReaction} darkSide={true} style = {{
        marginTop : '22px'
      }}  /> */}
      {/* <div className="TextContainer">
        <div className="background"></div>
        <textarea className="about-reaction-textarea" value={aboutReaction} />
        <div className="also">
          <Text>Читать полностью</Text>
        </div>
      </div> */}
    </div>
  );
};

export default AboutMain;
