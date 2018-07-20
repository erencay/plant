import React from "react";

import Header from "./header/header";
import Content from "./content/content";
import Input from "./input/input";
import Answer from "./answer/answer";
import RightBar from "./rightbar/rightbar";

const Home = (props) => {
  const url = props.match.params.id;
  return (
    <div>
      <Header kullanıcı_adı={props.kullanıcı_adı} email={props.email} />
      <div className="container">
        <Content url={url}/>
        <Input kullanıcı_adı={props.kullanıcı_adı} url={url} />
      </div>
      <Answer url={url} />
      {/*<LeftBar />*/}
      <RightBar />
    </div>
  );
};

export default Home;
