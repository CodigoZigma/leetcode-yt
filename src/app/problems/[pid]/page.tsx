"use client";

import Topbar from "@/app/componentes/TopBar/TopBar";
import { Problem } from "@/utils/tipos/problemas";
import { problemas } from "@/utils/problemas/problemas";
import React from "react";
import Workspace from "@/app/componentes/Workspace/Workspace";

type ProblemPageProps = {
  params: { pid: string };
  problem: Problem;
};

const Page: React.FC<ProblemPageProps> = ({ params }) => {
  return (
    <div>
      <Topbar problemPage problem={problemas[params.pid]} />
      <Workspace problem={problemas[params.pid]} pid={params.pid} />
    </div>
  );
};
export default Page;

export async function getStaticPaths() {
  const paths = Object.keys(problemas).map((key) => ({
    params: { pid: key },
  }));

  return {
    paths,
    fallback: false,
  };
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problemas[pid];

  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
