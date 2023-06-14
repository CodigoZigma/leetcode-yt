"use client";

import React from "react";
import NavBar from "@/app/componentes/NavBar/NavBar";
import Image from "next/image";
import LayoutAuth from "../componentes/modelos/layoutauth";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authAtoms";
import { RecoilRoot } from "recoil";

type AuthProps = {};

const Page: React.FC<AuthProps> = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src="/hero.png" alt="Hero img" width={700} height={700} />
        </div>
        {authModal.isOpen && <LayoutAuth />}
      </div>
    </div>
  );
};
export default Page;
