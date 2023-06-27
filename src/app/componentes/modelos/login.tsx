import { authModalState } from "@/atoms/authAtoms";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";

type loginProps = {};

const Login: React.FC<loginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert("Por favor ingresa todos los campos");
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);
  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Entrar a LeetMath</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Tu correo electrónico
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="nombre@compañia.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Tu contraseña
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="*******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            "
      >
        {loading ? "cargando..." : "Entrar"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgotPassword")}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          ¿Olvisdate tu contraseña?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        ¿No estás registrado?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Crea una cuenta.
        </a>
      </div>
    </form>
  );
};
export default Login;
