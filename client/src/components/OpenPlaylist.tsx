import { extractColors } from "extract-colors";
import { useState, useLayoutEffect } from "react";
import OpenPlaylistRow from "./OpenPlaylistRow";

function OpenPlaylist() {
  const [color, setColor] = useState("");

  const changeColor = (color: string): void => {
    setColor(color);
  };

  const options = {
    distance: 0.3,
  };

  const getColor = (image: HTMLImageElement) => {
    extractColors(image, options)
      .then((result) => {
        const extractedColor = result[0]?.hex;
        changeColor(extractedColor);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useLayoutEffect(() => {
    const img = document.createElement("img");
    img.src = "http://localhost:5173/imageToTest6.png";
    getColor(img);
  }, []);

  return (
    <>
      <div className={"relative h-full w-full rounded-lg bg-backBase"}>
        <div className="absolute bottom-0 left-0 right-0 mx-auto flex h-full w-full flex-1 flex-col flex-nowrap gap-7 overflow-y-auto">
          <div className="playlistGradient absolute left-0 top-0 z-20 h-80 w-full"></div>
          <div className="playlistGradient2 absolute left-0 top-80 z-20 h-60 w-full"></div>
          <div
            className="absolute left-0 top-0 flex h-80 w-full items-center rounded-ss-sm pl-8"
            style={{ backgroundColor: color }}
          >
            <div className="z-50 flex items-end gap-8">
              <div className="z-50 h-56 min-h-40 w-56 min-w-40 rounded-lg bg-[url(http://localhost:5173/imageToTest6.png)]"></div>
              <div className="flex h-full flex-col justify-end gap-2">
                <p className="text-sm text-textBase">Playlist</p>
                <p className="text-8xl font-bold text-textBase">to have</p>
                <p className="text-sm text-textSubdued">
                  Songs that i want to sav
                </p>
                <p className="text-sm font-bold text-textBase">Zhivko</p>
              </div>
            </div>
          </div>
          <div
            className="underHeaderGradient absolute left-0 top-80 flex h-60 w-full bg-gradient-to-b to-backBase"
            style={{
              background: `linear-gradient(to bottom, ${color} 0%, var(--backBase) 100%)`,
            }}
          ></div>
          <div className="absolute top-80 z-50 flex w-full flex-col gap-y-8 p-8">
            <div className="flex h-14 items-center gap-x-8">
              <button
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accentColorSubdued transition-all duration-300 hover:scale-105 hover:bg-accentColor"
                onClick={(e) => {
                  e.preventDefault();
                  alert("asdf");
                }}
              >
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                </svg>
              </button>
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-8 w-8 cursor-pointer fill-textSubdued hover:fill-textBase"
              >
                <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
              </svg>
            </div>
            <div className="w-ful flex h-10 border-b-[1px] border-solid border-backgroundTintedBase px-5">
              <div className="flex w-full max-w-150 gap-3">
                <p className="text-base text-textSubdued">#</p>
                <p className="text-base text-textSubdued">Title</p>
              </div>

              <p className="w-3/5 pr-5 text-base text-textSubdued">Album</p>
              <p className="w-3/5 text-base text-textSubdued">Date added</p>
              <p className="text-base text-textSubdued">Duration</p>
            </div>
            <div className="flex flex-col">
              <OpenPlaylistRow />
              <OpenPlaylistRow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenPlaylist;
