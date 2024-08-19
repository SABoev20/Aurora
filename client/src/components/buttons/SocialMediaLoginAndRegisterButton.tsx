interface Props {
  text: string;
  icon: string;
  buttonEvent?:() => void;
}

function SocialMediaLoginAndRegisterButton({
  text,
  icon,
  buttonEvent,
}: Props) {
  return (
    <button
      onClick={buttonEvent}
      className="flex h-12 w-[90%] max-w-80 items-center rounded-3xl border-[1px] border-solid border-textSubdued px-7 text-center text-base font-bold text-textBase hover:border-textBase"
    >
      <img
        src={icon}
        alt="social media icon"
        className="h-6 w-6 rounded-full"
      />
      <span className="m-auto">{text}</span>
    </button>
  );
}

export default SocialMediaLoginAndRegisterButton;
