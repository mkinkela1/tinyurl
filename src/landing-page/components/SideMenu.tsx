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
import { Badge } from "components/Badge";
import { OVERVIEW, SHORT_URLS } from "constants/Routes";

interface INav {
  id: string;
  label: string;
  href: string;
  Icon: ComponentType<ComponentProps<"svg">>;
  comingSoon?: boolean;
}

const navigation: INav[] = [
  { id: "overview", label: "Overview", href: OVERVIEW, Icon: ChartPieIcon },
  { id: "short-urls", label: "Short URLs", href: SHORT_URLS, Icon: LinkIcon },
  {
    id: "analytics",
    label: "Analytics",
    href: "analytics",
    Icon: ChartBarIcon,
    comingSoon: true
  },
  {
    id: "integration",
    label: "Integration",
    href: "integration",
    Icon: PuzzlePieceIcon,
    comingSoon: true
  },
  {
    id: "billing",
    label: "Billing",
    href: "billing",
    Icon: CreditCardIcon,
    comingSoon: true
  },
  {
    id: "users",
    label: "Users",
    href: "users",
    Icon: UsersIcon,
    comingSoon: true
  },
  {
    id: "settings",
    label: "Settings",
    href: "settings",
    Icon: CogIcon,
    comingSoon: true
  },
  {
    id: "help",
    label: "Help",
    href: "help",
    Icon: QuestionMarkCircleIcon,
    comingSoon: true
  }
];

export default function () {
  const { pathname } = useRouter();

  const location = pathname.slice("/dashboard".length);

  return (
    <menu className="top-0 h-screen w-64">
      <div className="bg-tertiary h-full overflow-y-auto py-5 px-3 pt-16">
        <ul className="space-y-2">
          {navigation.map(({ id, label, href, Icon, comingSoon }) => (
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
              <Link
                href={comingSoon ? "" : `/dashboard/${href}`}
                className="ml-3"
              >
                {label}
              </Link>
              {comingSoon && <Badge label="Coming soon!" />}
            </li>
          ))}
        </ul>
      </div>
    </menu>
  );
}
