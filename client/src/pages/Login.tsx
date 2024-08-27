import SocialMediaLoginAndRegisterButton from "../components/buttons/SocialMediaLoginAndRegisterButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import loginService from "../services/loginService";

const loginSer = new loginService();

type FormFields = {
  email: string;
  password: string;
};

function Login() {
  // Set page title
  document.title = "Login - Aurora";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      try {
        const loginRequest = await loginSer.login(data.email, data.password);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError("root", { message: e.message });
        } else {
          // Handle the case where `e` is not an `Error`
          setError("root", { message: "An unknown error occurred" });
        }
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
    <>
      <div className="flex h-screen min-h-[1000px] w-full flex-row justify-center bg-slate-50 pb-7 pt-7 dark:bg-transparent dark:bg-gradient-to-b dark:from-[#ffffff1a] dark:to-[#000000]">
        <div className="w-full max-w-181 rounded-lg bg-backBase">
          <div className="flex w-full justify-center">
            <Link to="/" className="cursor-default">
              <img
                src="https://placehold.co/36x36.png"
                alt="Aurora logo"
                className="rounded-full pb-6 pt-8"
              />
            </Link>
          </div>
          <h1 className="pb-8 text-center text-4xl font-bold tracking-tight">
            Log in to Aurora
          </h1>
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
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <Link to="/" className="flex w-[90%] justify-center">
              <SocialMediaLoginAndRegisterButton
                text="Continue with Google"
                icon={
                  <svg
                    viewBox="-3 0 262 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    className="h-6 w-6 rounded-full fill-textBase"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                      <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                      <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                      <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                    </g>
                  </svg>
                }
              />
            </Link>
            <Link to="/" className="flex w-[90%] justify-center">
              <SocialMediaLoginAndRegisterButton
                text="Continue with Github"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 rounded-full fill-textBase"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
              />
            </Link>
            <Link to="/" className="flex w-[90%] justify-center">
              <SocialMediaLoginAndRegisterButton
                text="Continue with Discord"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 rounded-full fill-textBase"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M18.8944 4.34399C17.5184 3.71467 16.057 3.256 14.5317 3C14.3397 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14394 4.13067C8.9946 3.77866 8.77059 3.33067 8.58925 3C7.05328 3.256 5.59194 3.71467 4.22555 4.34399C1.46289 8.41865 0.716219 12.3973 1.08955 16.3226C2.92421 17.6559 4.6949 18.4666 6.43463 19C6.86129 18.424 7.2453 17.8053 7.57597 17.1546C6.94663 16.92 6.3493 16.632 5.7733 16.2906C5.92263 16.184 6.07197 16.0667 6.21064 15.9493C9.68796 17.5387 13.4544 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5237 17.1546C15.8543 17.8053 16.2384 18.424 16.665 19C18.4037 18.4666 20.185 17.6559 22.0101 16.3226C22.4687 11.7787 21.2837 7.83202 18.8944 4.34399ZM8.05596 13.9013C7.01061 13.9013 6.15728 12.952 6.15728 11.7893C6.15728 10.6267 6.98928 9.67731 8.05596 9.67731C9.11194 9.67731 9.97591 10.6267 9.95457 11.7893C9.95457 12.952 9.11194 13.9013 8.05596 13.9013ZM15.065 13.9013C14.0197 13.9013 13.1653 12.952 13.1653 11.7893C13.1653 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9637 11.7893C16.9637 12.952 16.1317 13.9013 15.065 13.9013Z"></path>
                    </g>
                  </svg>
                }
              />
            </Link>
          </div>
          <div className="m-auto mb-8 mt-8 h-[1px] w-[90%] max-w-131 bg-[#292929]"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="m-auto flex w-[90%] max-w-80 flex-col items-center gap-6"
          >
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
            <div className="flex w-full flex-col gap-2">
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
                  placeholder="Password"
                  id="password"
                  className="w-full max-w-80 rounded-md bg-transparent px-4 py-3 shadow-[inset_0_0_0_1px_var(--textSubdued)] outline-none duration-75 hover:shadow-[inset_0_0_0_1px_var(--textBase)] focus:shadow-[inset_0_0_0_3px_var(--textBase)]"
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Password cannot be longer than 50 characters",
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="text mt-6 w-full rounded-3xl bg-accentColorSubdued px-5 py-3 text-base font-bold text-[#FFFFFF] hover:scale-105 hover:bg-accentColor"
            >
              {isSubmitting ? "Loading..." : "Log in"}
            </button>
          </form>
          <Link to="#">
            <p className="mt-8 text-center text-base text-textBase underline hover:text-accentColor">
              Forgot your password?
            </p>
          </Link>
          <div className="m-auto mb-8 mt-8 h-[1px] w-[90%] max-w-131 bg-[#292929]"></div>
          <p className="mt-16 text-center text-base text-textSubdued">
            Don't have an account?
            <Link to="/signup">
              <span className="pl-2 text-textBase underline hover:text-accentColor">
                Sign up for Aurora
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
