import lines from "../../assets/images/pattern-lines.svg";
const Lines = () => {
  return (
    <>
      <div
        className="z-0"
        style={{
          backgroundImage: `url(${lines})`,
          backgroundRepeat: "repeat",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      />
    </>
  );
};

export default Lines;
