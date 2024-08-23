import { Link } from "react-router-dom";
import SocialMediaLoginAndRegisterButton from "../components/buttons/SocialMediaLoginAndRegisterButton";
import google from "./../assets/icons/google.png";
import facebook from "./../assets/icons/facebook.png";
import apple from "./../assets/icons/apple.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import registerService from "../services/registerService";
import { LoggedUserContext } from "../contexts/LoggedUserProvider";
import { useContext } from "react";

type FormFields = {
  email: string;
  password: string;
  username: string;
  day: number;
  month: string;
  year: number;
};

function Signup() {
  // Set page title
  document.title = "Signup - Aurora";

  const registerSer = new registerService();

  const [registerStep, setRegisterStrep] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const goBackOneStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setRegisterStrep(registerStep - 1);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (registerStep == 3) {
        const dateOFBirth = data.year + "-" + data.month + "-" + data.day;
        try {
          const registerRequest = await registerSer.register(
            data.email,
            data.password,
            data.username,
            dateOFBirth,
          );
        } catch (e: unknown) {
          if (e instanceof Error) {
            setError("root", { message: e.message });
          } else {
            // Handle the case where `e` is not an `Error`
            setError("root", { message: "An unknown error occurred" });
          }
        }
      } else {
        setRegisterStrep((prev) => prev + 1);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        // Now TypeScript knows `e` is an `Error`
        setError("root", { message: e.message });
      } else {
        // Handle the case where `e` is not an `Error`
        setError("root", { message: "An unknown error occurred" });
      }
    }
  };
  // For the password to be visible
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex h-screen min-h-175 w-full flex-row justify-center bg-backBase pb-7 pt-3">
      <div className="w-full max-w-80 rounded-lg bg-backBase">
        <div className="flex w-full justify-center">
          <Link to="/" className="cursor-default">
            <img
              src="https://placehold.co/36x36.png"
              alt="Aurora logo"
              className="rounded-full pb-6 pt-8"
            />
          </Link>
        </div>

        {(() => {
          if (registerStep == 0) {
            return (
              <h1 className="pb-8 text-center text-5xl font-bold leading-tight tracking-tight">
                Sign up to start listening
              </h1>
            );
          }
        })()}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto flex w-[90%] max-w-80 flex-col items-center gap-6"
        >
          {(() => {
            if (registerStep == 0) {
              return (
                <div className="flex w-full flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-textBase"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="w-full max-w-80 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                    {...register("email", {
                      required: "Please enter your Aurora email.",
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:
                          "This email is invalid. Make sure it's written like example@email.com",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="flex gap-2">
                      <svg
                        className="h-5 w-4 fill-errorColor"
                        data-encore-id="icon"
                        role="img"
                        aria-label="Error:"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                        <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                      </svg>
                      <p className="text-sm">{errors.email?.message}</p>
                    </div>
                  )}
                </div>
              );
            } else if (registerStep == 1) {
              return (
                <div className="w-106">
                  <div className="h-[2px] w-full rounded-full bg-textSubdued">
                    <div className="h-full w-2/6 rounded-full bg-accentColor"></div>
                  </div>
                  <div className="relative pl-12">
                    <div className="flex h-20 w-full max-w-80 items-center">
                      <button
                        className="absolute left-0 top-7"
                        onClick={goBackOneStep}
                      >
                        <svg
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          className="h-6 w-6 cursor-pointer fill-textSubdued hover:fill-textBase"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"></path>
                        </svg>
                      </button>
                      <div>
                        <p className="text-base text-textSubdued">
                          Step 1 of 3
                        </p>
                        <p className="text-base font-bold text-textBase">
                          Create a password
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full max-w-80 flex-col gap-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-bold text-textBase"
                      >
                        Password
                      </label>
                      <div className="relative flex">
                        <button
                          className="absolute bottom-0 right-4 top-0 m-auto h-7 w-7"
                          onClick={(e) => {
                            e.preventDefault();
                            setVisible(!visible);
                          }}
                        >
                          {visible ? (
                            <svg
                              data-encore-id="icon"
                              role="img"
                              aria-hidden="true"
                              className="h-6 w-6 fill-textSubdued"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6.703 7.382A6.073 6.073 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6 3.273 0 5.886-2.708 5.886-6 0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204zM12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4zm0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6z"></path>
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 fill-textSubdued"
                              data-encore-id="icon"
                              role="img"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"></path>
                              <path d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24l5.24-5.24z"></path>
                            </svg>
                          )}
                        </button>
                        <input
                          type={visible ? "text" : "password"}
                          id="password"
                          className="w-full max-w-80 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                          {...register("password", {
                            required: "Please enter your password",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Password cannot be longer than 50 characters",
                            },
                          })}
                        />
                      </div>

                      {errors.password && (
                        <div className="flex gap-2">
                          <svg
                            className="h-5 w-4 fill-errorColor"
                            data-encore-id="icon"
                            role="img"
                            aria-label="Error:"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                          </svg>
                          <p className="text-sm">{errors.password?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            } else if (registerStep == 2) {
              return (
                <div className="w-106">
                  <div className="h-[2px] w-full rounded-full bg-textSubdued">
                    <div className="h-full w-4/6 rounded-full bg-accentColor"></div>
                  </div>
                  <div className="relative pl-12">
                    <div className="flex h-20 w-full max-w-80 items-center">
                      <button
                        className="absolute left-0 top-7"
                        onClick={goBackOneStep}
                      >
                        <svg
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          className="h-6 w-6 cursor-pointer fill-textSubdued hover:fill-textBase"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"></path>
                        </svg>
                      </button>
                      <div>
                        <p className="text-base text-textSubdued">
                          Step 2 of 3
                        </p>
                        <p className="text-base font-bold text-textBase">
                          Think of a name
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-2 pt-4">
                      <label
                        htmlFor="username"
                        className="text-sm font-bold text-textBase"
                      >
                        Name
                        <p className="text-sm font-normal text-textSubdued">
                          This name will appear on your profile
                        </p>
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full max-w-80 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                        {...register("username", {
                          required: "Please enter your username.",
                          minLength: {
                            value: 3,
                            message:
                              "Username must be at least 3 characters long",
                          },
                          maxLength: {
                            value: 30,
                            message:
                              "Username cannot be longer than 30 characters",
                          },
                        })}
                      />
                      {errors.username && (
                        <div className="flex gap-2">
                          <svg
                            className="h-5 w-4 fill-errorColor"
                            data-encore-id="icon"
                            role="img"
                            aria-label="Error:"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                          </svg>
                          <p className="text-sm">{errors.username?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex w-full flex-col gap-2 pt-5">
                      <label
                        htmlFor="dateOFBirth"
                        className="text-sm font-bold text-textBase"
                      >
                        Date of birth
                      </label>
                      <div className="flex w-full max-w-80 justify-between gap-2">
                        <input
                          type="text"
                          minLength={2}
                          maxLength={2}
                          placeholder="dd"
                          id="dateOFBirth"
                          className="w-full max-w-16 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                          {...register("day", {
                            required: "Please enter your day of birth.",
                            pattern: {
                              value: /^(0|[0-9]\d*)(\.\d+)?$/,
                              message: "Please use only numbers",
                            },
                            min: {
                              value: "0",
                              message: "It should be between 0 and 31",
                            },
                            max: {
                              value: "31",
                              message: "It should be between 0 and 31",
                            },
                          })}
                        />
                        <div className="relative flex w-full items-center bg-transparent">
                          <select
                            {...register("month", {
                              required: "Please enter your month of birth.",
                            })}
                            id="month"
                            name="month"
                            className="h-12 w-full appearance-none rounded-md bg-backBase px-4 py-3 text-textBase shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                          >
                            <option value="" disabled={undefined} hidden>
                              Month
                            </option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                          <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            className="pointer-events-none absolute right-4 h-4 w-4 fill-textSubdued"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z"></path>
                          </svg>
                        </div>

                        <input
                          type="text"
                          minLength={4}
                          maxLength={4}
                          placeholder="yyyy"
                          id="dateOFBirth"
                          className="w-full max-w-24 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                          {...register("year", {
                            required: "Please enter your year of birth.",
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "Please use only numbers",
                            },
                            max: {
                              value: new Date().getFullYear(),
                              message: "You can be that young.",
                            },
                            min: {
                              value: "1930",
                              message: "You can be that old.",
                            },
                          })}
                        />
                      </div>
                      {errors.day && (
                        <div className="flex gap-2">
                          <svg
                            className="h-5 w-4 fill-errorColor"
                            data-encore-id="icon"
                            role="img"
                            aria-label="Error:"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                          </svg>
                          <p className="text-sm">{errors.day?.message}</p>
                        </div>
                      )}
                      {errors.year && (
                        <div className="flex gap-2">
                          <svg
                            className="h-5 w-4 fill-errorColor"
                            data-encore-id="icon"
                            role="img"
                            aria-label="Error:"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                          </svg>
                          <p className="text-sm">{errors.year?.message}</p>
                        </div>
                      )}
                      {errors.month && (
                        <div className="flex gap-2">
                          <svg
                            className="h-5 w-4 fill-errorColor"
                            data-encore-id="icon"
                            role="img"
                            aria-label="Error:"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                            <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                          </svg>
                          <p className="text-sm">{errors.month?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            } else if (registerStep == 3) {
              return (
                <div className="w-106">
                  {errors.root && (
                    <div className="m-auto mb-5 flex w-[90%] items-center gap-2 bg-errorColorEssential px-6 py-3">
                      <svg
                        className="h-6 w-6 fill-textBase"
                        data-encore-id="icon"
                        role="img"
                        aria-label="Error:"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                        <path d="M7.25 9V4h1.5v5h-1.5zm0 3.026v-1.5h1.5v1.5h-1.5z"></path>
                      </svg>
                      <p className="text-sm">{errors.root?.message}</p>
                    </div>
                  )}
                  <div className="h-[2px] w-full rounded-full bg-textSubdued">
                    <div className="w-6/6 h-full rounded-full bg-accentColor"></div>
                  </div>

                  <div className="relative pl-12">
                    <div className="flex h-20 w-full max-w-80 items-center">
                      <button
                        className="absolute left-0 top-7"
                        onClick={goBackOneStep}
                      >
                        <svg
                          data-encore-id="icon"
                          role="img"
                          aria-hidden="true"
                          className="h-6 w-6 cursor-pointer fill-textSubdued hover:fill-textBase"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z"></path>
                        </svg>
                      </button>
                      <div>
                        <p className="text-base text-textSubdued">
                          Step 3 of 3
                        </p>
                        <p className="text-base font-bold text-textBase">
                          Tell us more about yourself
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })()}

          <button
            disabled={isSubmitting}
            type="submit"
            className="text mt-6 w-full rounded-3xl bg-accentColorSubdued px-5 py-3 text-base font-bold text-[#FFFFFF] hover:scale-105 hover:bg-accentColor"
          >
            {isSubmitting ? "Loading..." : "Sign up"}
          </button>
        </form>
        {(() => {
          if (registerStep == 0) {
            return (
              <>
                <div className="m-auto mb-8 mt-8 flex max-w-80 flex-row items-center justify-between">
                  <div className="h-[1px] w-[43%] bg-[#727272]"></div>
                  <p className="text-sm">or</p>
                  <div className="h-[1px] w-[43%] bg-[#727272]"></div>
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                  <SocialMediaLoginAndRegisterButton
                    text="Continue with Google"
                    icon={google}
                  />
                  <SocialMediaLoginAndRegisterButton
                    text="Continue with Facebook"
                    icon={facebook}
                  />
                  <SocialMediaLoginAndRegisterButton
                    text="Continue with Apple"
                    icon={apple}
                  />
                </div>
                <div className="m-auto mb-8 mt-8 h-[1px] w-full min-w-[90%] bg-[#292929]"></div>
                <p className="mt-16 text-center text-base text-textSubdued">
                  Already have an account?
                  <Link to="/login">
                    <span className="pl-2 text-textBase underline hover:text-accentColor">
                      Log in here.
                    </span>
                  </Link>
                </p>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default Signup;
