"use client";
import { useQuery } from "@apollo/client";
import { AssetType, CollectionMint, Maybe, Me } from "../../graphql.types";
import { GetMeCollectiblesPage } from "@/queries/me.graphql";
import { shorten } from "../../modules/wallet";
import Copy from "../../components/Copy";
import { signOut } from "next-auth/react";
import useMe from "../../hooks/useMe";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import CryptoIcon from "../../components/CryptoIcon";

interface GetUserCollectiblesData {
  me: Maybe<Me>;
}

export default function Collectibles() {
  const me = useMe();
  const userCollectiblesQuery = useQuery<GetUserCollectiblesData>(
    GetMeCollectiblesPage
  );

  return (
    <>
      <div className="flex w-full justify-between items-center py-4">
        <Link href="/">
          <ArrowLeftIcon className="w-8 h-8 cursor-pointe hover:opacity-80" />
        </Link>
        <button
          onClick={() => signOut()}
          className="text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6"
        >
          Log out
        </button>
      </div>
      <div className="flex flex-col md:flex-row mt-10 md:mt-16 gap-7 md:gap-28  w-full items-center md:justify-start md:items-start">
        <div className="flex flex-col gap-1 items-center">
          <img className="w-20 h-20 rounded-full" src={me?.image as string} />
          <div className="flex flex-col mt-6">
            <span className="text-white text-2xl font-bold">{me?.name}</span>
            <span className="text-xs text-neautraltext mt-2">Wallets</span>
            <div className="flex flex-col gap-2 mt-4 items-start">
              {me?.wallets?.map((wallet) => {
                return (
                  <div
                    key={wallet?.address}
                    className="flex gap-2 items-center"
                  >
                    <div className="flex items-center gap-1">
                      <CryptoIcon
                        type={wallet?.assetId as AssetType}
                        stroke="white"
                        width={12}
                        height={12}
                      />
                      <span className="text-xs">
                        {shorten(wallet?.address as string)}
                      </span>
                    </div>
                    <Copy copyString={wallet?.address as string} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center md:items-start">
          <span className="text-2xl font-semibold">Your collectibles</span>
          <div className="flex flex-wrap gap-6 justify-start mt-4 mb-10">
            {userCollectiblesQuery.loading ? (
              <>
                {Array.from(Array(6)).map((_, index) => (
                  <div key={index}>
                    <div className="w-52 h-52 rounded-lg bg-gray-600 animate-pulse" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {(userCollectiblesQuery.data?.me?.collectibles || []).map(
                  (mint: Maybe<CollectionMint>) => (
                    <div
                      key={mint?.id}
                      className="flex flex-col bg-contrast rounded-lg p-4"
                    >
                      <img
                        className="w-40 h-40 rounded-lg object-contain"
                        src={mint?.metadataJson?.image as string}
                      />
                      <span className="font-bold mt-2">
                        {mint?.metadataJson?.name}
                      </span>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
