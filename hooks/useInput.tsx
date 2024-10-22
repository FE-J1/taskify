import React, { useState } from "react";

interface InputProps<T> {
  defaultValue: T;
  additioanlValue?: string;
  hasError: (value: T, ...args: any[]) => boolean;
}

const useInput = <T,>({
  defaultValue,
  hasError,
  additioanlValue,
}: InputProps<T>) => {
  const [enteredValue, setEnteredValue] = useState<T>(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value as unknown as T);
    setDidEdit(false);
  };

  const handleBlurChange = () => {
    setDidEdit(true);
  };

  console.log(enteredValue);
  const error = hasError
    ? didEdit && !hasError(enteredValue, additioanlValue)
    : false;

  return {
    enteredValue,
    setEnteredValue,
    handleInputChange,
    handleBlurChange,
    setDidEdit,
    error,
  };
};

export default useInput;
