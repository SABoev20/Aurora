import LibraryCard from "./LibraryCard.js";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";
import { LibraryToggleContext } from "../contexts/LibraryToggleProvider.js";
import LibraryPlaylist from "./LibraryPlaylist.js";

function Library() {
  const { isLogged } = useContext(LoggedUserContext);
  const { toggle, changeToggle } = useContext(LibraryToggleContext);

  const guest = (
    <>
      <LibraryCard
        heading={"Create your first playlist"}
        text={"It's easy, we'll help you"}
        buttonText={"Create playlist"}
      />

      <LibraryCard
        heading={"Let's find some music to listen"}
        text={"We will keep you updated on the new songs"}
        buttonText={"Browse songs"}
      />
    </>
  );

  const user = (
    <LibraryPlaylist
      image="http://localhost:5173/imageToTest2.png"
      albumName="to have"
      author="Zhivko"
      link={`playlist/toHave`}
    />
  );

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-backBase">
      <header
        className={
          "flex h-20 min-h-20 w-full items-center justify-between pb-6" +
          (toggle ? " min-h-28 flex-col justify-center gap-5 pb-0 pt-5" : null)
        }
      >
        <button
          className={
            "group flex cursor-pointer gap-3 pl-0" +
            (toggle ? " gap-0 pl-0" : " pl-6")
          }
          onClick={() => {
            if (isLogged) {
              changeToggle();
            }
          }}
        >
          <span aria-hidden="true">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
              height="24"
            >
              <path
                className="fill-textSubdued transition duration-[400ms] group-hover:fill-textBase"
                d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
              ></path>
            </svg>
          </span>
          {toggle ? (
            ""
          ) : (
            <p className="font-bold text-textSubdued transition duration-[400ms] hover:text-textBase">
              Your Library
            </p>
          )}
        </button>
        <span
          className={
            "group flex min-h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-backElevatedBase" +
            (toggle ? " mr-0" : " mr-5")
          }
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            height="16"
            width="16"
          >
            <path
              className="fill-textSubdued transition duration-[400ms] group-hover:fill-textBase"
              d="M15.25 8a.75.75 0 0 
            1-.75.75H8.75v5.75a.75.75 0 
            0 1-1.5 0V8.75H1.5a.75.75 
            0 0 1 0-1.5h5.75V1.5a.75.75 
            0 0 1 1.5 0v5.75h5.75a.75.75 0 0 
            1 .75.75z"
            ></path>
          </svg>
        </span>
      </header>
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-[calc(100%-16px)] flex-1 flex-col flex-nowrap gap-7 overflow-y-auto">
          {isLogged ? (toggle ? "" : user) : guest}
        </div>
      </div>
    </div>
  );
}

export default Library;
