/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { API } from "../../../services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputButton from "@/components/atoms/InputButton";
import SubmitButton from "@/components/atoms/SubmitButton";
import Head from "next/head";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const goToHome = useCallback(() => router.push("/"), [router]);

  const { isUserAuthenticated, setAuth } = useContext(
    AuthContext
  ) as AuthContextType;

  if (isUserAuthenticated) goToHome();

  const loginUser = async (data: ValidationSchema) => {
    //TODO: Learn API Learn API Data validation
    const response = await API.post("/users/login", data);
    if (response.status === 200) {
      const { jwt: token, user } = response.data;
      setAuth({ token, ...user });
    }
    return response?.data;
  };
  const onSubmit = handleSubmit((data: ValidationSchema) => {
    mutation.mutate(data);
  });

  const mutation = useMutation(loginUser, {
    onSuccess: goToHome,
  });

  return (
    <div>
      <Head>
        <title>Blogine: Login</title>
      </Head>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="relative hidden md:flex items-end px-4 pb-10 pt-60 lg:px-8 lg:pb-24 md:justify-center h-full">
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
              <form
                action="#"
                method="POST"
                className="mt-8"
                onSubmit={onSubmit}
              >
                <div className="space-y-5">
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
                  <SubmitButton label="Log in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
