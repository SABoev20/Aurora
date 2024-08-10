function StandardButton({
  text,
  buttonEvent = () => alert("Default"),
  fontSize = "text-sm",
  big = false,
}) {
  return (
    <button
      className={
        "rounded-3xl bg-textBase px-4 py-1.5 font-bold text-backFiller hover:scale-105 " +
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
