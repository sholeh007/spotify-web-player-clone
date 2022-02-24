import { getProviders, signIn } from "next-auth/react";
import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import Image from "next/image";

const Login: NextPage = ({ providers }: any) => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 w-full min-h-screen">
      <div className="mb-4 w-32 h-32 md:w-44 md:h-44">
        <Image
          src={"/img/spotify.svg"}
          width={180}
          height={180}
          alt="logo"
          placeholder="blur"
          blurDataURL="/img/spotify.svg"
        />
      </div>
      {Object.values(providers).map((provider: any, i) => (
        <Fragment key={i}>
          <button
            className="bg-green-500 inline-block p-5 rounded-full text-gray-800 font-semibold text-sm md:text-base"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login {provider.name}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
