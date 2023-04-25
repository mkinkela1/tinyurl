import { useEffect, useState } from "react";

interface IProps<T> {
  value: T;
  delay: number;
}

export const useDebounce = <T>({ value, delay }: IProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [value, delay]);

  return debouncedValue;
};
