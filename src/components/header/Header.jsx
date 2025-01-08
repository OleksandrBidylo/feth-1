import logo from "../../assets/images/logo-full.svg";

const Header = () => {
  return (
    <>
      <div className="flex justify-center">
        <img className="mt-10" src={logo} alt="Example Image" />
      </div>
    </>
  );
};

export default Header;
