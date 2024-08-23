import ArtistOrPlaylist from "./ArtistOrPlaylist";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";
import MiniPlaylist from "./MiniPlaylist.js";
import { extractColors } from "extract-colors";

const root = document.documentElement;

function HomeContent() {
  document.title = "Aurora - Web player: Music for everyone";

  const options = {
    distance: 0.3,
  };
  const handleMouseEnter = (image: HTMLImageElement) => {
    extractColors(image, options)
      .then((result) => {
        root.style.setProperty("--headerBackgroundGradient", result[0].hex);
      })
      .catch((error) => {
        console.error(error); // Logs any errors that occurred
      });
  };

  const handleMouseLeave = () => {
    root.style.setProperty("--headerBackgroundGradient", "#535353");
  };

  const guest = (
    <>
      <div className="flex w-full flex-shrink-0 flex-col flex-wrap items-start justify-start gap-2 py-10 pl-6">
        <div className="flex w-full justify-between gap-y-4">
          <p className="cursor-pointer pl-3 text-2xl font-bold text-textBase">
            Popular artists
          </p>
          <p className="cursor-pointer pr-6 text-sm font-bold text-textSubdued">
            Show all
          </p>
        </div>
        <div className="flex w-full flex-wrap items-start justify-start">
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
          />
        </div>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col flex-wrap items-start justify-start gap-2 py-10 pl-6">
        <div className="flex w-full justify-between gap-y-4">
          <p className="cursor-pointer pl-3 text-2xl font-bold text-textBase">
            Popular albums
          </p>
          <p className="cursor-pointer pr-6 text-sm font-bold text-textSubdued">
            Show all
          </p>
        </div>

        <div className="flex w-full flex-wrap items-start justify-start">
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
          <ArtistOrPlaylist
            image="https://placehold.co/215x215"
            author="Galena"
            albumName="GALENAXX"
          />
        </div>
      </div>
    </>
  );

  const loggedUser = (
    <div className="flex w-full flex-shrink-0 flex-col flex-wrap items-start justify-start gap-2 py-10 pl-6">
      <div className="flex w-full flex-col gap-4 pb-10 pr-6">
        <div className="flex w-full gap-x-4">
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image="http://localhost:5173/imageToTest3.png"
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image={"http://localhost:5173/imageToTest.png"}
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image={"http://localhost:5173/imageToTest2.png"}
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image="http://localhost:5173/imageToTest4.png"
            albumName="to have"
          />
        </div>
        <div className="flex w-full gap-x-4">
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image="http://localhost:5173/imageToTest5.png"
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image={"http://localhost:5173/imageToTest6.png"}
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image={"http://localhost:5173/imageToTest7.png"}
            albumName="to have"
          />
          <MiniPlaylist
            handleMouseLeave={handleMouseLeave}
            handleMouseEnter={handleMouseEnter}
            image="http://localhost:5173/imageToTest8.png"
            albumName="to have"
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap items-start justify-start gap-y-4">
        <div className="flex w-full justify-between">
          <p className="cursor-pointer pl-3 text-2xl font-bold text-textBase">
            Made for you
          </p>
          <p className="cursor-pointer pr-6 text-sm font-bold text-textSubdued">
            Show all
          </p>
        </div>
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Neshto"
          albumName="SI"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="aa"
          albumName="bb"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="MN shukar"
          albumName="Best song"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Az sum som"
          albumName="Alo da"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Text"
          albumName="Lorem ipsum"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Ma"
          albumName="asd"
        />
      </div>
      <div className="flex w-full flex-wrap items-start justify-start gap-y-4">
        <div className="flex w-full justify-between">
          <p className="cursor-pointer pl-3 text-2xl font-bold text-textBase">
            Made for you
          </p>
          <p className="cursor-pointer pr-6 text-sm font-bold text-textSubdued">
            Show all
          </p>
        </div>
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Neshto"
          albumName="SI"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="aa"
          albumName="bb"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="MN shukar"
          albumName="Best song"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Az sum som"
          albumName="Alo da"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Text"
          albumName="Lorem ipsum"
        />
        <ArtistOrPlaylist
          image="https://placehold.co/215x215"
          author="Ma"
          albumName="asd"
        />
      </div>
    </div>
  );

  const { isLogged } = useContext(LoggedUserContext);

  return (
    <>
      {isLogged ? loggedUser : guest}
      <div className="flex flex-col gap-8">
        <div className="m-auto mt-8 h-[1px] w-[95%] flex-shrink-0 bg-[#292929]"></div>
        <p className="pb-7 pl-10 text-sm text-textSubdued">© 2024 Aurora AB</p>
      </div>
    </>
  );
}

export default HomeContent;