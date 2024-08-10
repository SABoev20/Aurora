import PlaylistCard from "./PlaylistCard";
import { IsLoggedContext } from "../pages";
import { useContext } from "react";

function Playlists() {
  const isLog = useContext(IsLoggedContext);

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-[calc(100%-16px)] flex-1 flex-col flex-nowrap gap-7 overflow-y-auto">
        {isLog ? (
          <PlaylistCard
            heading={"Create your first playlist"}
            text={"It's easy, we'll help you"}
            buttonText={"Create playlist"}
            buttonEvent={() => alert("Now it should create playlist")}
          />
        ) : (
          <>
            <PlaylistCard
              heading={"Create your first playlist"}
              text={"It's easy, we'll help you"}
              buttonText={"Create playlist"}
            />
            <PlaylistCard
              heading={"Let's find some music to listen"}
              text={"We will keep you updated on the new songs"}
              buttonText={"Browse songs"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Playlists;
