import React from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form";

// Props for a standard text input
interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>; // ensures only valid field names are allowed
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

// Props for the textarea
interface TextareaProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

// The reusable Input component
export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  ...rest
}: InputProps<T>) => (
  <div className="relative">
    <input
      id={name}
      className="peer w-full bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder-transparent focus:outline-none focus:border-foreground transition-colors"
      placeholder={label}
      {...register(name)}
      {...rest}
    />
    <label
      htmlFor={name}
      className="absolute left-0 -top-5 text-sm text-foreground/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/60 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-foreground/60"
    >
      {label}
    </label>
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

// The reusable Textarea component
export const Textarea = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  ...rest
}: TextareaProps<T>) => (
  <div className="relative">
    <textarea
      id={name}
      rows={4}
      className="peer w-full resize-none bg-transparent border-b border-foreground/30 py-3 text-foreground placeholder-transparent focus:outline-none focus:border-foreground transition-colors"
      placeholder={label}
      {...register(name)}
      {...rest}
    />
    <label
      htmlFor={name}
      className="absolute left-0 -top-5 text-sm text-foreground/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/60 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-foreground/60"
    >
      {label}
    </label>
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);