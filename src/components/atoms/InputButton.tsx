import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

type TextInputProps = {
  type: string;
  label: string;
  placeholder: string;
  errorMsg: string | undefined;
  fieldName: string;
  register: UseFormRegister<any>;
};
//TODO: Implement React props validation

export default function InputButton({
  type,
  label,
  placeholder,
  errorMsg,
  register,
  fieldName,
  ...rest
}: TextInputProps) {
  return (
    <div>
      <label htmlFor="" className="text-base font-medium text-gray-900"></label>{" "}
      {`${label} `}
      <div className="mt-2">
        <input
          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type={type}
          placeholder={placeholder}
          {...register(fieldName)}
          {...rest}
        />
        {errorMsg && (
          <p className="text-xs italic text-red-500 mt-2">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
