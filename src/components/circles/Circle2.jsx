import circle from "../../assets/images/pattern-circle.svg";

const Circle2 = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 right-0">
        <img
          className="w-56 z-0"
          src={circle}
          alt="Half circle"
          style={{
            objectPosition: "top",
            position: "absolute",
            top: "350px",
            right: "500px",
          }}
        />
      </div>
    </div>
  );
};

export default Circle2;
