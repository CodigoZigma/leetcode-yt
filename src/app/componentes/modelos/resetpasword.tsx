import { auth } from "@/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type resetpasswordProps = {};

const ResetPassword: React.FC<resetpasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success(
        "El correo electrónico para reestablecer la contraseña fue enviado.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        }
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <h3 className="text-xl font-medium  text-white">Restaurar contraseña</h3>
      <p className="text-sm text-white ">
        ¿Olvidaste tu contraseña? Ingresa tu dirección de correo electrónico
        abajo, y nosotros te enviaremos un correo para que puedas restaurar tu
        contraseña.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Tu correo electrónico
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-brand-orange hover:bg-brand-orange-s `}
      >
        Restaurar contraseña
      </button>
    </form>
  );
};
export default ResetPassword;
