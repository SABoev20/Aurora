import { Link } from "react-router-dom";

interface Props {
  image: string;
  albumName: string;
  author: string;
  link: string;
}

function LibraryPlaylist({ image, albumName, author, link }: Props) {
  return (
    <Link
      to={link}
      state={{ image: image, albumName: albumName, author: author }}
    >
      <div className="flex w-full cursor-pointer rounded-[4px] bg-transparent p-3 hover:bg-backHighlight">
        <img
          src={image}
          alt="playlist image"
          className="h-14 w-14 rounded-[4px] object-cover"
        />
        <div className="flex h-full flex-col justify-center pl-4">
          <p className="text-base font-bold text-textBase">{albumName}</p>
          <p className="text-sm text-textSubdued">{author}</p>
        </div>
      </div>
    </Link>
  );
}

export default LibraryPlaylist;
