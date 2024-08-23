function OpenPlaylistRow() {
  return (
    <div className="flex w-full cursor-pointer items-center px-5 py-2 hover:bg-backHighlight">
      <div className="flex w-full max-w-150 items-center gap-3">
        <p className="text-base text-textSubdued">1</p>
        <img src="https://placehold.co/40x40" alt="playlist image" />
      </div>
      <p className="w-3/5 text-base text-textSubdued">Pressure</p>
      <p className="w-3/5 text-base text-textSubdued">Jul 16,2023</p>
      <p className="text-base text-textSubdued">3:03</p>
    </div>
  );
}
export default OpenPlaylistRow;
