import ArtistOrPlaylist from "./ArtistOrPlaylist";

function HomeContent() {
  // Set page title
  document.title = "Aurora - Web player: Music for everyone";

  return (
    <>
      <div className="h-8 w-full flex-shrink-0 bg-backBase"></div>
      <div className="absolute -top-16 -z-10 h-80 w-full bg-[#535353] bg-gradient-to-b from-[#00000099] to-backBase"></div>
      <div className="flex w-full flex-shrink-0 flex-col flex-wrap items-start justify-start gap-2 py-10 pl-6">
        <div className="flex w-full justify-between">
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
        <div className="flex w-full justify-between">
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
      <div className="m-auto mt-8 h-[1px] w-[95%] flex-shrink-0 bg-[#292929]"></div>
      <p className="pb-7 pl-10 text-sm text-textSubdued">© 2024 Aurora AB</p>
    </>
  );
}

export default HomeContent;
