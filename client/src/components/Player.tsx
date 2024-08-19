import StandardButton from "./buttons/StandardButton.js";
import { Link } from "react-router-dom";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";

function Player() {
  const { isLogged } = useContext(LoggedUserContext);

  const guest = (
    <Link to="/Signup" className="cursor-pointer">
      <div className="flex h-16 w-full items-center justify-between bg-gradient-to-r from-[#af2896] to-[#509bf5] p-4">
        <div className="flex flex-col">
          <p className="text-sm font-extrabold">Preview of Aurora</p>
          <p className="text-base">
            Sign up to listen music from the best app. No credit card needed.
          </p>
        </div>
        <StandardButton
          text={"Sign up free"}
          buttonEvent={() => {}}
          fontSize="text-base"
          big={true}
        />
      </div>
    </Link>
  );

  return isLogged ? <div className="h-20 w-full bg-backBase"></div> : guest;
}
export default Player;
