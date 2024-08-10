import StandardButton from "./buttons/StandardButton";

function PlaylistCard({
  heading = "Default heading",
  text = "Default text",
  buttonEvent = () => alert("Default"),
  buttonText = "Default button text",
}) {
  return (
    <div className="flex min-h-32 w-full flex-shrink-0 flex-col items-start gap-5 rounded-lg bg-backElevatedBase p-4">
      <div className="flex flex-col gap-2">
        <p className="font-bold">{heading}</p>
        <p className="text-sm">{text}</p>
      </div>
      <StandardButton text={buttonText} buttonEvent={buttonEvent} />
    </div>
  );
}

export default PlaylistCard;
