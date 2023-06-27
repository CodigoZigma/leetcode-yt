"use client";
import TopBar from "@/app/componentes/TopBar/TopBar";
import { firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

type AgregarProblemasProps = {};

const Page: React.FC<AgregarProblemasProps> = () => {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const problema = { ...inputs, order: Number(inputs.order) };
    await setDoc(doc(firestore, "problems", inputs.id), problema);
    toast.info("Guardado a la BD", {
      position: "top-center",
      toastId: "loadingToast",
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <TopBar />
      <form
        className="p-6 flex flex-col max-w-sm gap-3"
        onSubmit={handleSubmit}
      >
        <input placeholder="id" onChange={handleChange} type="text" name="id" />
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          onChange={handleChange}
          type="text"
          name="difficulty"
          placeholder="difficulty"
        />
        <input
          onChange={handleChange}
          type="text"
          name="category"
          placeholder="category"
        />
        <input
          onChange={handleChange}
          type="text"
          name="order"
          placeholder="order"
        />
        <input
          onChange={handleChange}
          type="text"
          name="videoId"
          placeholder="videoId?"
        />
        <input
          onChange={handleChange}
          type="text"
          name="link"
          placeholder="link?"
        />

        <button className="bg-white">Guardar a la BD</button>
      </form>
    </div>
  );
};
export default Page;
