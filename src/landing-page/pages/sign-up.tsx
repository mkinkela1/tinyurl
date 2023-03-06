import Link from "next/link";

export default function () {
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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="mt-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                placeholder="Email address"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Repeat password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="repeat-password"
                  name="repeat-password"
                  type="password"
                  required
                  className="relative block w-full rounded-md outline-none focus:border-gray-500 focus:outline-none focus:ring-[0px]"
                  placeholder="Repeat password"
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

          <div>
            <button
              type="submit"
              className="bg-primary group relative flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-white outline-none hover:bg-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
