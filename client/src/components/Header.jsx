import StandardButton from "./buttons/StandardButton";

function Header({ isScrolled }) {
  const guest = (
    <div
      className={
        "absolute left-0 top-0 z-30 flex h-16 w-full items-center rounded-t-lg transition" +
        (isScrolled
          ? " animate-transparentHeaderOnScroll"
          : " bg-[rgba(0,0,0,.5)]")
      }
    >
      <StandardButton
        text="Log in"
        fontSize="text-base"
        big={true}
        buttonEvent={() => {}}
      />
    </div>
  );

  return guest;
}

export default Header;
