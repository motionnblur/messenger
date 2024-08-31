"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const loginUrl: string = "http://localhost:8080/login";
const signUp: string = "http://localhost:8080/signup";

export default function Page() {
  const { push } = useRouter();

  const [loginStr, setLoginStr] = useState<String>("Login");
  const [typePassword, setTypePassword] = useState<String>("password");
  const userNameRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const getPasswState = (): string => {
    if (typePassword === "password") return "text";
    return "password";
  };

  const loginFunc = (): void => {
    const userForm: ILoginForm = {
      name: userNameRef!.current?.value!,
      password: userPasswordRef!.current?.value!,
    };
    fetch(loginUrl, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    }).then((res) => {
      if (res.status == 200) {
        push("/messenger");
      }
    });
  };
  const signUpFunc = (): void => {
    const userForm: ILoginForm = {
      name: userNameRef!.current?.value!,
      password: userPasswordRef!.current?.value!,
    };
    fetch(signUp, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    }).then((res) => {
      if (res.status == 201) {
        setLoginStr("Login");
      }
    });
  };

  return (
    <main className="w-full h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-64 h-96 bg-slate-300 rounded-xl mb-14 flex flex-col p-6">
          <div className="w-full h-12 flex items-center justify-center text-black text-3xl">
            {loginStr}
          </div>
          <div className="w-full h-4/6 flex flex-col items-center justify-center gap-3">
            <input
              type="text"
              className="w-full h-10 rounded-md text-stone-900 p-2"
              placeholder=" Username"
              ref={userNameRef}
            />
            <input
              type={`${typePassword}`}
              className="w-full h-10 rounded-md text-stone-900 p-2"
              placeholder=" Password"
              ref={userPasswordRef}
            />
            <div className="w-full h-6 flex flex-row">
              <input
                type="checkbox"
                className="w-1/6 h-5 rounded-md cursor-pointer"
                onMouseUp={() => {
                  setTypePassword(getPasswState);
                }}
              />
              <div className="text-black text-sm ml-1">Show password</div>
            </div>
          </div>
          <div className="w-full h-32 flex justify-center items-center flex-col">
            <div
              className="w-full h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-sl cursor-pointer"
              onMouseUp={() => {
                loginStr === "Login" ? loginFunc() : signUpFunc();
                userNameRef.current!.value! = "";
                userPasswordRef.current!.value! = "";
              }}
            >
              {loginStr}
            </div>
            <div className="text-black text-sm flex flex-row gap-1 mt-2">
              {loginStr === "Login" ? "Forgot" : ""}
              <div className="text-sky-500 text-sm font-bold cursor-pointer">
                {loginStr === "Login" ? "password" : ""}
              </div>
              {loginStr === "Login" ? "?" : ""}
            </div>
            <div
              className="text-sky-500 text-sm font-bold cursor-pointer"
              onMouseUp={() => {
                loginStr === "Login"
                  ? setLoginStr("Sign up")
                  : setLoginStr("Login");

                userNameRef.current!.value! = "";
                userPasswordRef.current!.value! = "";
              }}
            >
              {loginStr === "Login" ? "Sign up" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
