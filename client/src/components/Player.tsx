import StandardButton from "./buttons/StandardButton.js";
import { Link } from "react-router-dom";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Music from "./../assets/Music.mp3";

function Player() {
  const { isLogged } = useContext(LoggedUserContext);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [inputGradient, setInoutGradient] = useState(0);
  const [volume, setVolume] = useState(5);
  const [inputVolumeGradient, setInputVolumeGradient] = useState(50);

  if (audioRef.current) {
    audioRef.current.volume = volume / 10;
  }

  const changeVolume = (newValue: number): void => {
    setVolume(newValue);
  };

  const changeInputVolumeGradient = (newValue: number): void => {
    setInputVolumeGradient(newValue);
  };

  const changeInputGradient = (newValue: number): void => {
    setInoutGradient(newValue);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const changeTheVolume = (e: any) => {
    if (audioRef.current) {
      const newVolume = e.target.value;
      changeVolume(newVolume);
      audioRef.current.volume = newVolume / 10;

      const gradientValue = (newVolume / 10) * 100;
      changeInputVolumeGradient(gradientValue);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const inputGradient = (currentTime / duration) * 100;

      if (currentTime < 100) {
        changeInputGradient(Math.ceil(inputGradient));
      } else {
        changeInputGradient(Math.floor(inputGradient));
      }

      setCurrentTime(currentTime);
      setDuration(duration);
    }
  };
  const handleSeek = (e: any) => {
    if (audioRef.current) {
      const newTime = e.target.value;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);

      const inputGradient = (newTime / duration) * 100;
      changeInputGradient(inputGradient);
    }
  };

  function formatDuration(durationSeconds: any) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        if (audioRef.current)
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const guestPlayer = (
    <Link to="/Signup" className="cursor-pointer">
      <div className="flex h-16 w-full items-center justify-between bg-gradient-to-r from-[#af2896] to-[#509bf5] p-4">
        <div className="flex flex-col">
          <p className="text-sm font-extrabold">Preview of Aurora</p>
          <p className="text-base">
            Sign up to listen music from the best app. No credit card needed.
          </p>
        </div>
        <StandardButton
          text={"Sign up free"}
          buttonEvent={() => {}}
          fontSize="text-base"
          big={true}
        />
      </div>
    </Link>
  );

  const userPlayer = (
    <div className="flex h-20 w-full justify-between bg-backFiller pl-2 pr-2">
      <div className="flex items-center gap-2">
        <img
          src="https://placehold.co/56x56"
          alt="playlist image"
          className="rounded-[4px]"
        />
        <div>
          <p className="text-sm text-textBase">K.O.</p>
          <p className="text-sm text-textSubdued">LAVINIA, Ely Onuks</p>
        </div>
      </div>
      <div className="flex h-full w-2/5 max-w-181 flex-col justify-center gap-2">
        <div className="flex w-full items-center justify-center gap-6">
          <svg
            className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
            <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
          </svg>
          <svg
            className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
          </svg>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-textBase"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <svg
                data-encore-id="icon"
                className="h-4 w-4 fill-backFiller"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            ) : (
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4 fill-backFiller"
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            )}
          </button>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
          >
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
          </svg>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
          </svg>
        </div>
        <div className="flex w-full items-center gap-2">
          <audio ref={audioRef} src={Music} />
          <p className="pl-4 text-sm text-textSubdued">
            {formatDuration(currentTime)}
          </p>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className={"h-1 w-full cursor-pointer rounded-md"}
            style={{
              background: `linear-gradient(to right, var(--accentColorSubdued) ${inputGradient}%, var(--textSubdued) ${inputGradient}%)`,
            }}
          />
          <p className="pr-4 text-sm text-textSubdued">
            {formatDuration(duration)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
        >
          <path d="M11.196 8 6 5v6l5.196-3z"></path>
          <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"></path>
        </svg>
        <svg
          data-encore-id="icon"
          className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path>
        </svg>
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
        >
          <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
        </svg>
        <svg
          className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M2 3.75C2 2.784 2.784 2 3.75 2h8.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 12.25 12h-8.5A1.75 1.75 0 0 1 2 10.25v-6.5zm1.75-.25a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25h-8.5zM.25 15.25A.75.75 0 0 1 1 14.5h14a.75.75 0 0 1 0 1.5H1a.75.75 0 0 1-.75-.75z"></path>
        </svg>
        <div className="flex items-center">
          <svg
            className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
            data-encore-id="icon"
            role="presentation"
            aria-label="Volume medium"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
          </svg>
          <input
            type="range"
            min="0"
            max="10"
            value={volume}
            onChange={changeTheVolume}
            className={"h-1 w-24 cursor-pointer rounded-md"}
            style={{
              background: `linear-gradient(to right, var(--accentColorSubdued) ${inputVolumeGradient}%, var(--textSubdued) ${inputVolumeGradient}%)`,
            }}
          />
        </div>

        <svg
          className="h-4 w-4 cursor-pointer fill-textSubdued hover:fill-textBase"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"></path>
        </svg>
      </div>
    </div>
  );

  return isLogged ? userPlayer : guestPlayer;
}
export default Player;
