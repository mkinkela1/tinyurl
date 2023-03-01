import { useContext } from "react";
import {
  INotification,
  NotificationContext,
  NotificationType
} from "context/ToastContext";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function () {
  const { notifications, removeNotification } = useContext(NotificationContext);

  const getIconByType = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return (
          <CheckCircleIcon
            className="mr-3 h-6 w-6 text-green-500"
            aria-hidden="true"
          />
        );
      case NotificationType.ERROR:
        return (
          <ExclamationTriangleIcon
            className="mr-3 h-6 w-6 text-red-500"
            aria-hidden="true"
          />
        );
      case NotificationType.INFO:
        return (
          <InformationCircleIcon
            className="mr-3 h-6 w-6 text-blue-500"
            aria-hidden="true"
          />
        );
      default:
        return (
          <InformationCircleIcon
            className="mr-3 h-6 w-6 text-blue-500"
            aria-hidden="true"
          />
        );
    }
  };

  return (
    <div className="fixed right-0 top-[90px]">
      {notifications?.map(
        ({ id, headline, description, type }: INotification) => (
          <div
            className="bg-secondary text-warning-700 pointer-events-auto z-20 mx-auto mb-4 hidden w-96 max-w-full rounded-lg rounded-3xl bg-clip-padding text-sm shadow-lg shadow-lg shadow-black/5 ring-1 ring-gray-900/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
            id="static-example"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-te-autohide="false"
            data-te-toast-init
            data-te-toast-show
          >
            <div className="border-warning-200 text-warning-700 flex items-center justify-between rounded-t-lg bg-clip-padding px-4 pt-2.5 pb-2">
              <p className="flex items-center font-bold text-gray-700">
                {getIconByType(type)}
                {headline}
              </p>
              <div className="flex items-center">
                <button onClick={() => removeNotification(id)}>
                  <XMarkIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            {description && (
              <div className="bg-warning-100 text-warning-700 break-words rounded-b-lg py-2 px-4">
                {description}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
