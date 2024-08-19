import { Link, useNavigate } from "react-router-dom";
interface Props {
  image: string;
  author: string;
  albumName?: string;
  link?: string; // To be removed when implementing with back-end
}

function ArtistOrPlaylist({
  image,
  author,
  albumName,
  link = "/search",
}: Props) {
  const navigate = useNavigate();
  return (
    <Link to={link}>
      <div
        className={
          "group relative rounded-md bg-transparent px-3 pt-2 hover:bg-backHighlight" +
          (albumName ? " pb-8" : " pb-2")
        }
      >
        <img
          src={image}
          className={albumName ? "rounded-lg" : "rounded-full"}
          alt="artist"
        />
        {albumName ? (
          <>
            <p className="text-base text-textBase">{albumName}</p>
            <p className="text-sm text-textSubdued">{author}</p>
          </>
        ) : (
          <>
            <p className="text-base text-textBase">{author}</p>
            <p className="text-sm text-textSubdued">Artist</p>
          </>
        )}
        <button
          className="absolute right-5 z-20 flex h-12 w-12 -translate-y-24 items-center justify-center rounded-full bg-accentColorSubdued opacity-0 transition-all duration-300 hover:scale-105 hover:bg-accentColor group-hover:-translate-y-28 group-hover:opacity-100"
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
      </div>
    </Link>
  );
}

export default ArtistOrPlaylist;
