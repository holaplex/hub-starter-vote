'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import {
  AssetType,
  Collection,
  CollectionMint,
  Purchase
} from '@/graphql.types';
import { shorten } from '../modules/wallet';
import { MintDrop } from '@/mutations/mint.graphql';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { GetCollectibles } from '@/queries/collectible.graphql';
import { GetCollectibleHistory } from '@/queries/collectible.graphql';

import Link from 'next/link';
import { isNil, not, pipe } from 'ramda';
import useMe from '@/hooks/useMe';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { PopoverBox } from '../components/Popover';
import { Icon } from '../components/Icon';
import { signOut } from 'next-auth/react';
import Copy from '../components/Copy';
import CryptoIcon from '../components/CryptoIcon';

interface MintData {
  mint: CollectionMint;
}

interface HomeProps {
  session?: Session | null;
}

export default function Home({ session }: HomeProps) {
  const me = useMe();
  const collectiblesQuery = useQuery(GetCollectibles);
  const collections = collectiblesQuery.data?.collectibles as [Collection];
  // const metadataJson = collection?.metadataJson;

  const mintHistoryQuery = useQuery(GetCollectibleHistory);
  const walletAddresses = me?.wallets?.map((wallet) => wallet?.address);

  const purchase = useMemo(() => {
    return mintHistoryQuery.data?.collectible.mintHistory?.find(
      (purchase: Purchase) => walletAddresses?.includes(purchase.wallet)
    );
  }, [mintHistoryQuery.data?.collectible.mintHistory, walletAddresses]);

  const purchased = pipe(isNil, not)(purchase);
  const [mint, { loading }] = useMutation<MintData>(MintDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetCollectibles
      },
      {
        query: GetCollectibleHistory
      }
    ]
  });

  const onMint = () => {
    mint({
      onCompleted: (data: MintData) => {
        toast.success('Mint successful');
      },
      onError: (error: ApolloError) => {
        toast.error(
          'Unable to mint. Please try again or reach out to support.'
        );
      }
    });
  };

  const loadingQueries = collectiblesQuery.loading || mintHistoryQuery.loading;

  return (
    <>
      <header className='flex w-full justify-between items-center py-4'>
        <Image src='/img/logo.png' alt='site logo' width={199} height={18} />
        {!me ? (
          <>
            <div className='flex gap-1 md:gap-4 items-center'>
              <Link
                href='/login'
                className='text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6'
              >
                Log in
              </Link>
              <span className='text-gray-300 font-medium md:hidden'>or</span>
              <Link
                href='/login'
                className='text-cta font-medium md:text-backdrop md:bg-cta md:rounded-full md:font-bold md:py-3 md:px-6'
              >
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <PopoverBox
            triggerButton={
              <button className='text-cta font-bold border-2 rounded-full border-cta py-3 px-6 flex gap-2 items-center'>
                <img
                  className='w-6 h-6 rounded-full'
                  src={me?.image as string}
                />
                <span>{me?.name}</span>
                <Icon.ChevronDown className='stroke-cta' />
              </button>
            }
          >
            <div className='rounded-lg bg-contrast p-6 flex flex-col items-center mt-4'>
              <span className='text-xs text-gray-300 underline'>
                Wallet addresses
              </span>

              <div className='flex flex-col gap-2 mt-4 items-center'>
                {me?.wallets?.map((wallet) => {
                  return (
                    <div
                      key={wallet?.address}
                      className='flex gap-2 items-center'
                    >
                      <div className='flex items-center'>
                        <CryptoIcon type={wallet?.assetId as AssetType} />
                        <span className='text-xs'>
                          {shorten(wallet?.address as string)}
                        </span>
                      </div>
                      <Copy copyString={wallet?.address as string} />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => signOut()}
                className='text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6 mt-6'
              >
                Log out
              </button>
            </div>
          </PopoverBox>
        )}
      </header>
      <main className='w-full h-full my-auto'>
        {loadingQueries ? (
          <>
            <div className='rounded-full bg-contrast w-60 h-6 animate-pulse' />
            <div className='flex flex-col gap-2 w-full mt-6 md:mt-3'>
              <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
              <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center'>
            <span className='text-neautraltext'>
              🎉 To celebrate & showcase HUB’s multi-chain support Holaplex
              presents…. 🎉
            </span>
            <span className='text-white text-6xl font-extrabold mt-3'>
              BLOCKCHAIN BATTLE!
            </span>

            <div className='flex gap-8 items-center mt-6'>
              <div>
                <div className='bg-cta max-w-fit py-2 px-2 font-extrabold text-xl text-backdrop flex gap-2 items-center -rotate-12 -translate-x-4 translate-y-10'>
                  TEAM <CryptoIcon type={collections.at(0)!.blockchain} />
                  {collections.at(0)!.blockchain}
                </div>
                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={collections.at(0)!.metadataJson?.image as string}
                    alt={collections.at(0)!.metadataJson?.name as string}
                    className='w-full object-cover aspect-square rounded-lg'
                  />
                </div>
              </div>

              <span className='text-white text-2xl font-extrabold'>VS</span>
              <div>
                <div className='bg-cta max-w-fit py-2 px-2 font-extrabold text-xl text-backdrop flex gap-2 items-center justify-end rotate-12 translate-x-4 translate-y-10'>
                  TEAM <CryptoIcon type={collections.at(1)!.blockchain} />
                  {collections.at(0)!.blockchain}
                </div>

                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={collections.at(1)!.metadataJson?.image as string}
                    alt={collections.at(1)!.metadataJson?.name as string}
                    className='w-full object-cover aspect-square rounded-lg'
                  />
                </div>
              </div>
            </div>

            <span className='text-white text-2xl font-semibold mt-12'>
              Mint your raffle ticket to make your vote
            </span>
            <span className='text-cta text-xs font-medium mt-2'>
              View official rules
            </span>

            <div className='flex gap-6 mt-6'>
              <button
                className='font-bold rounded-full text-contrast py-3 px-6 transition hover:opacity-80 flex gap-2 items-center
                bg-gradient-to-r from-[#71EA9F] via-[#8AA7CC] to-[#A16AF6]'
                onClick={onMint}
                disabled={loading}
              >
                <CryptoIcon type={collections.at(0)!.blockchain} />
                {`Mint ticket on ${collections.at(0)!.blockchain}`}
              </button>
              <button
                className='font-bold rounded-full text-contrast py-3 px-6 transition hover:opacity-80 flex gap-2 items-center 
                bg-gradient-to-r from-[#8A46FF] to-[#6E38CC]'
                onClick={onMint}
                disabled={loading}
              >
                <CryptoIcon type={collections.at(1)!.blockchain} />
                {`Mint ticket on ${collections.at(1)!.blockchain}`}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
