import Link from "next/link";
import { useContext } from "react";
import { NotificationContext } from "context/ToastContext";
import { useRouter } from "next/router";
import Api from "api-calls/Api";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ISignUp {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

const signUpSchema = yup.object({
  email: yup.string().email().required("This is required field."),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters.")
    .matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required("This is required field."),
  repeatPassword: yup
    .string()
    .test("passwords-match", "Passwords must match.", function (value) {
      return this.parent.password === value;
    })
    .required("This is required field."),
  firstName: yup.string().required("This is required field."),
  lastName: yup.string().required("This is required field.")
});

export default function () {
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<ISignUp>({
    resolver: yupResolver(signUpSchema),
    mode: "all"
  });

  const { onError, onSuccess } = useContext(NotificationContext);
  const Router = useRouter();

  const register = () =>
    handleSubmit(async (payload: ISignUp) => {
      try {
        await Api.authControllerSignUp({
          ...payload
        });

        onSuccess(
          "Account is successfully created!",
          "Please check your email."
        );

        Router.replace("/");
      } catch (e) {
        onError(e.toString());
      }
    })();

  return (
    <div className="bg-primary flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-secondary flex-column mx-auto w-full max-w-md items-center justify-between space-y-8 rounded-3xl p-6 shadow-lg ring-1 ring-gray-900/5">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crate a new account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="mt-2">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                    placeholder="Email address"
                  />
                )}
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                      placeholder="Password"
                    />
                  )}
                />
                <div className="-mx-1 mt-2 flex">
                  {[1, 2, 3, 4].map(() => (
                    <div className="w-1/4 px-1">
                      <div className="h-2 rounded-xl bg-green-400"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Repeat password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Controller
                name="repeatPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="repeat-password"
                    type="password"
                    required
                    className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                    placeholder="Repeat password"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="first-name"
                    type="text"
                    required
                    className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                    placeholder="First name"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="last-name"
                    type="text"
                    required
                    className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                    placeholder="Last name"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center justify-start">
          <div className="text-sm">
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:text-indigo-500"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        <div
          onClick={register}
          className="bg-primary group relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white outline-none hover:bg-indigo-500"
        >
          Sign up
        </div>
      </div>
    </div>
  );
}
