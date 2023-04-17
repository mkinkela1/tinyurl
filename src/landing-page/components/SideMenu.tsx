import {
  ChartBarIcon,
  ChartPieIcon,
  CogIcon,
  CreditCardIcon,
  LinkIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ComponentProps, ComponentType } from "react";
import { useRouter } from "next/router";

interface INav {
  id: string;
  label: string;
  href: string;
  Icon: ComponentType<ComponentProps<"svg">>;
}

const navigation: INav[] = [
  { id: "overview", label: "Overview", href: "", Icon: ChartPieIcon },
  { id: "short-urls", label: "Short URLs", href: "short-urls", Icon: LinkIcon },
  {
    id: "analytics",
    label: "Analytics",
    href: "analytics",
    Icon: ChartBarIcon
  },
  {
    id: "integration",
    label: "Integration",
    href: "integration",
    Icon: PuzzlePieceIcon
  },
  { id: "billing", label: "Billing", href: "billing", Icon: CreditCardIcon },
  { id: "users", label: "Users", href: "users", Icon: UsersIcon },
  {
    id: "account-settings",
    label: "Account settings",
    href: "account-settings",
    Icon: CogIcon
  },
  { id: "help", label: "Help", href: "help", Icon: QuestionMarkCircleIcon }
];

export default function () {
  const { pathname } = useRouter();

  const location = pathname.slice("/dashboard".length);

  return (
    <menu className="h-screen w-64">
      <div className="bg-tertiary h-full overflow-y-auto py-5 px-3 pt-16">
        <ul className="space-y-2">
          {navigation.map(({ id, label, href, Icon }) => (
            <li
              key={id}
              className={`${
                (href == "" && location == "") ||
                (href != "" && location.includes(href))
                  ? "text-primary-500"
                  : "text-quaternary"
              } hover:text-primary-500 group flex items-center rounded-lg p-2 text-base font-normal`}
            >
              <Icon className="h-6 w-6" />
              <Link href={`/dashboard/${href}`} className="ml-3">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </menu>
  );
}
