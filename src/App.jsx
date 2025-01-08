import Header from "./components/header/Header";
import bgImgDesktop from "./assets/images/background-desktop.png";

import Circle1 from "./components/circles/Circle1";
import Lines from "./components/lines/Lines";
import Circle2 from "./components/circles/Circle2";
import Upload from "./components/upload/Upload";
import Hero from "./components/hero/Hero";
import { useState } from "react";

function App() {
  const [parentData, setParentData] = useState({
    submited: false,
    formData: null,
  });

  const handleDataFromChild = (data) => {
    setParentData(data);
  };
  return (
    <div
      className="bg-cover bg-center h-screen w-full z-0 font-custom text-white"
      style={{
        backgroundImage: `url(${bgImgDesktop})`,
      }}
    >
      <Header />
      <Circle1 />
      <Circle2 />
      <Hero submited={parentData.submited} formData={parentData.formData} />
      <Upload onSendData={handleDataFromChild} />
      <Lines />
    </div>
  );
}

export default App;
