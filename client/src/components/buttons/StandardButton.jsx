function StandardButton({
  text,
  buttonEvent = () => {},
  fontSize = "text-sm",
  big = false,
}) {
  return (
    <button
      className={
        "flex items-center rounded-3xl bg-textBase px-4 py-1.5 font-bold text-backFiller hover:scale-105 hover:bg-[#F0F0F0] " +
        fontSize +
        (big ? " px-7 py-3" : "")
      }
      onClick={buttonEvent}
    >
      {text}
    </button>
  );
}

export default StandardButton;
