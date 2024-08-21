import ArtistOrPlaylist from "./ArtistOrPlaylist";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";
import { useState } from "react";
import { FastAverageColor } from "fast-average-color";
import img from "./../assets/imageToTest.png";
import img2 from "./../assets/imageToTest2.png";

const fac = new FastAverageColor();
const root = document.documentElement;

function HomeContent() {
  // Set page title
  document.title = "Aurora - Web player: Music for everyone";

  const [isHoveredEffect, setIsHoveredEffect] = useState(false);

  const handleMouseEnter = (image: string) => {
    setIsHoveredEffect(true);
    fac
      .getColorAsync(image, {
        algorithm: "simple",

        mode: "precision",
        ignoredColor: [
          [255, 255, 255, 255], // white
          [0, 0, 0, 255], // black
        ],
      })
      .then((color) => {
        console.log("Average color", color.hex);
        root.style.setProperty("--headerBackgroundGradient", color.hex);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleMouseLeave = () => {
    setIsHoveredEffect(false);
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
          <div
            className={
              "bg-backgroundTintedBase flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]" +
              (isHoveredEffect ? " bg-backgroundTintedHighlighted" : "")
            }
            onMouseEnter={() =>
              handleMouseEnter(
                "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
              alt="playlist image"
              className="h-16 w-16 rounded-l-[4px] object-cover"
            />
          </div>
          <div
            className={
              "bg-backgroundTintedBase flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]" +
              (isHoveredEffect ? " bg-backgroundTintedHighlighted" : "")
            }
            onMouseEnter={() =>
              handleMouseEnter(
                "https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-powder-smoke-colorful-background-image_2164096.jpg",
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-powder-smoke-colorful-background-image_2164096.jpg"
              alt="playlist image"
              className="h-16 w-16 rounded-l-[4px] object-cover"
            />
          </div>
          <div
            className={
              "bg-backgroundTintedBase flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]" +
              (isHoveredEffect ? " bg-backgroundTintedHighlighted" : "")
            }
            onMouseEnter={() => handleMouseEnter(img)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={img}
              alt="playlist image"
              className="h-16 w-16 rounded-l-[4px] object-cover"
            />
          </div>
          <div
            className={
              "bg-backgroundTintedBase flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]" +
              (isHoveredEffect ? " bg-backgroundTintedHighlighted" : "")
            }
            onMouseEnter={() => handleMouseEnter(img2)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={img2}
              alt="playlist image"
              className="h-16 w-16 rounded-l-[4px] object-cover"
            />
          </div>
        </div>
        <div className="flex w-full gap-x-4">
          <div className="bg-backgroundTintedBase hover:bg-backgroundTintedHighlighted flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]">
            <img
              src="https://placehold.co/64x64"
              alt="playlist image"
              className="rounded-l-[4px]"
            />
          </div>
          <div className="bg-backgroundTintedBase hover:bg-backgroundTintedHighlighted flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]">
            <img
              src="https://placehold.co/64x64"
              alt="playlist image"
              className="rounded-l-[4px]"
            />
          </div>
          <div className="bg-backgroundTintedBase hover:bg-backgroundTintedHighlighted flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]">
            <img
              src="https://placehold.co/64x64"
              alt="playlist image"
              className="rounded-l-[4px]"
            />
          </div>
          <div className="bg-backgroundTintedBase hover:bg-backgroundTintedHighlighted flex w-full max-w-[340px] cursor-pointer rounded-l-[4px]">
            <img
              src="https://placehold.co/64x64"
              alt="playlist image"
              className="rounded-l-[4px]"
            />
          </div>
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
