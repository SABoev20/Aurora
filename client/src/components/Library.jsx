import Playlists from "./Playlists";

function Library() {
  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-backBase">
      <header className="flex h-20 min-h-20 w-full items-center justify-between pb-6">
        <div className="group flex cursor-pointer gap-3 pl-6">
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
          <p className="font-bold text-textSubdued transition duration-[400ms] hover:text-textBase">
            Your Library
          </p>
        </div>
        <span className="group mr-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-backElevatedBase">
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
      <Playlists />
    </div>
  );
}

export default Library;
