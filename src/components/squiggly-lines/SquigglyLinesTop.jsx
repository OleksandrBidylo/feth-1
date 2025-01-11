import circle from "../../assets/images/pattern-squiggly-line-top.svg";

const SquigglyLinesTop = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0">
        <img
          className=" z-0"
          src={circle}
          alt="Half circle"
          style={{
            objectPosition: "top",
            position: "absolute",
            top: "76px",
            right: "0",
          }}
        />
      </div>
    </div>
  );
};

export default SquigglyLinesTop;
