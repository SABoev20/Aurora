interface Props {
  handleMouseEnter: (img: string) => void;
  handleMouseLeave: () => void;
  image: string;
  albumName: string;
}

function MiniPlaylist({
  handleMouseEnter,
  handleMouseLeave,
  image,
  albumName,
}: Props) {
  return (
    <div
      className={
        "flex w-full max-w-[340px] cursor-pointer items-center rounded-l-[4px] bg-backgroundTintedBase hover:bg-backgroundTintedHighlighted"
      }
      onMouseEnter={() => handleMouseEnter(image)}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt="playlist image"
        className="h-16 w-16 rounded-l-[4px] object-cover"
      />
      <p className="pl-4 text-lg font-bold">{albumName}</p>
    </div>
  );
}

export default MiniPlaylist;
