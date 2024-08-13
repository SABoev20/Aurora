import StandardButton from "./buttons/StandardButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({ isScrolled }) {
  const navigate = useNavigate();

  function goBack() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  }

  function goForward() {
    navigate(1);
  }

  const guest = (
    <div
      className={
        "absolute left-0 top-0 z-30 flex h-16 w-full items-center justify-between rounded-t-lg transition " +
        (isScrolled
          ? " animate-transparentHeaderOnScroll"
          : " bg-headerColorForAnimation")
      }
    >
      <div className="flex h-full items-center gap-2 pl-6">
        <button
          onClick={goBack}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-backFiller"
        >
          <svg
            width="16"
            height="16  "
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            className="fill-textBase"
            viewBox="0 0 16 16"
          >
            <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
          </svg>
        </button>
        <button
          onClick={goForward}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-backFiller"
        >
          <svg
            width="16"
            height="16  "
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-textBase"
          >
            <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
          </svg>
        </button>
      </div>
      <div className="flex h-full items-center gap-6 pr-7">
        <Link to="/signup">
          <p className="cursor-pointer text-base font-bold text-textSubdued hover:scale-105 hover:text-textBase">
            Sign up
          </p>
        </Link>
        <Link to="/login">
          <StandardButton text="Log in" fontSize="text-base" big={true} />
        </Link>
      </div>
    </div>
  );

  return guest;
}

export default Header;
