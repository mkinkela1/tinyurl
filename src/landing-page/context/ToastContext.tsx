import React, { createContext, useState } from "react";
import randomId from "utils/randomId";
import {
  NOTIFICATION_TIMEOUT,
  REMOVE_NOTIFICATION_TIMEOUT
} from "constants/TimeoutConstants";

export enum NotificationType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO"
}

export interface INotification {
  id: string;
  headline: string;
  description: string;
  type: NotificationType;
}

interface INotificationContextProviderProps {
  notifications: INotification[];
  onSuccess: (headline: string, decription?: string) => void;
  onError: (headline: string, decription?: string) => void;
  onInfo: (headline: string, decription?: string) => void;
  removeNotification: (removeId: string) => void;
  children: React.ReactNode;
}

export const NotificationContext = createContext<
  Partial<INotificationContextProviderProps>
>({ notifications: [] });

const NotificationContextProvider = ({
  children
}: Partial<INotificationContextProviderProps>) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (
    headline: string,
    description?: string,
    type: NotificationType = NotificationType.SUCCESS
  ) => {
    const id = randomId();
    const newNotification: INotification = {
      id,
      headline,
      description,
      type
    };

    setNotifications((prevNotifications: INotification[]) => [
      ...prevNotifications,
      newNotification
    ]);

    setTimeout(() => removeNotification(id), NOTIFICATION_TIMEOUT);
  };

  const onSuccess = (headline: string, description?: string) =>
    addNotification(headline, description);

  const onError = (headline: string, description?: string) =>
    addNotification(headline, description, NotificationType.ERROR);

  const onInfo = (headline: string, description?: string) =>
    addNotification(headline, description, NotificationType.INFO);

  const removeNotification = (removeId: string) => {
    setTimeout(
      () =>
        setNotifications((prevNotifications) =>
          prevNotifications.filter(({ id }: INotification) => id != removeId)
        ),
      REMOVE_NOTIFICATION_TIMEOUT
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        onSuccess,
        onError,
        onInfo,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
