import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { API } from "../../../services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputButton from "@/components/atoms/InputButton";
import SubmitButton from "@/components/atoms/SubmitButton";

//TODO: Learn Creating Protected route
const validationSchema = z.object({
  username: z.string().min(4, { message: "invalid username" }),
  password: z.string().min(8, { message: "invalid password" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const loginUser = async (data: ValidationSchema) => {
    //TODO: Learn API Learn API Data validation
    const response = await API.post("/users/login", data);
    if (response.status === 200) {
      alert("User logged in successfully");
    }
    return response?.data;
  };
  const onSubmit = handleSubmit((data: ValidationSchema) => {
    mutation.mutate(data);
  });

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      alert("Login Success");
    },
  });

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 h-full">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src="/images/writing-note.jpg"
              alt="picture of a book and pen"
            />
          </div>
        </div>
        <div className="h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Sign up
              </a>
            </p>
            <form action="#" method="POST" className="mt-8" onSubmit={onSubmit}>
              <div className="space-y-5">
                {/* <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      {...register("username", {
                        // required: true,
                        // minLength: 4,
                      })}
                    />
                    {errors.username && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errors.username?.message}
                      </p>
                    )}
                  </div>
                </div> */}
                <InputButton
                  type="text"
                  label="Username"
                  fieldName="username"
                  register={register}
                  placeholder="Username"
                  errorMsg={errors.username?.message}
                />
                <InputButton
                  type="password"
                  label="Password"
                  fieldName="password"
                  register={register}
                  placeholder="Password"
                  errorMsg={errors.password?.message}
                />
                {/* <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        // required: true,
                        // minLength: 8,
                      })}
                    />
                    {errors.password && (
                      <p className="text-xs italic text-red-500 mt-2">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                </div> */}
                <SubmitButton label="Log in" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
