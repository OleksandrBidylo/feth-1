const Hero = ({ submited, formData }) => {
  return (
    <div className="justify-center flex flex-col items-center gap-5 mt-16 text-center">
      {submited === false && (
        <h1 className="text-5xl text-wrap max-w-xl font-extrabold">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
      )}
      {submited === true && (
        <p className="text-5xl  text-wrap max-w-2xl font-extrabold">
          Congrats,{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(245,116,99,1) 50%, rgba(255,255,255,1) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {formData.name}
          </span>
          ! Your ticket is ready.
        </p>
      )}
      {submited === false && (
        <p className="text-xl">
          Secure your spot at next year’s biggest coding conference.
        </p>
      )}

      {submited === true && (
        <p className="text-xl text-wrap max-w-md">
          We've emailed your ticket to{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(245,116,99,1) 50%, rgba(255,255,255,1) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {formData.email}
          </span>{" "}
          and will send updates in the run up to the event.
        </p>
      )}
    </div>
  );
};

export default Hero;
