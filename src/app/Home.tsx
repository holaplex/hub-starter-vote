'use client';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AssetType,
  CollectionMint,
  Drop,
  MintHistories
} from '@/graphql.types';
import { shorten } from '../modules/wallet';
import { MintDrop } from '@/mutations/mint.graphql';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { GetDrops } from '@/queries/collectible.graphql';
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
import { GetUserCollectibles } from '@/queries/collectible.graphql';
import { useRouter } from 'next/navigation';
import { Modal } from '../components/Modal';

interface MintData {
  mint: CollectionMint;
}

interface MintVars {
  drop: String;
}

interface GetUserCollectiblesData {
  userCollectibles: [CollectionMint];
}

interface HomeProps {
  session?: Session | null;
}

export default function Home({ session }: HomeProps) {
  const me = useMe();
  const router = useRouter();
  const urlRef = useRef<string>('');

  const [shareTweet, setShareTweet] = useState<boolean>(false);

  const collectiblesQuery = useQuery(GetDrops);
  const drops = collectiblesQuery.data?.drops as [Drop];

  const walletAddresses = me?.wallets?.map((wallet) => wallet?.address);

  const collectionsQuery =
    useQuery<GetUserCollectiblesData>(GetUserCollectibles);

  const userVote = collectionsQuery.data?.userCollectibles?.filter(
    (mint) =>
      mint.collectionId === drops?.at(0)?.collection.id ||
      mint.collectionId === drops?.at(1)?.collection.id
  );

  const [mint, { loading }] = useMutation<MintData, MintVars>(MintDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetDrops
      },
      {
        query: GetUserCollectibles
      }
    ]
  });

  const onMint = (drop: String) => {
    if (!session) {
      router.push('/login');
      return;
    }
    mint({
      variables: {
        drop
      },
      onCompleted: (data: MintData) => {
        toast.success('Mint successful');
        setShareTweet(true);
      },
      onError: (error: ApolloError) => {
        toast.error(
          'Unable to mint. Please try again or reach out to support.'
        );
      }
    });
  };

  const loadingQueries = collectiblesQuery.loading || collectionsQuery.loading;

  useEffect(() => {
    urlRef.current = window.location.href;
  }, []);

  return (
    <>
      <header className='flex w-full justify-between items-center py-4'>
        <Image
          src='/img/logo.png'
          alt='site logo'
          width={199}
          height={18}
          className='py-3'
        />
        {me && (
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
              <Link
                href='/collectibles'
                className='text-sm text-white underline'
              >
                View collectibles
              </Link>
              <span className='text-sm text-neautraltext mt-4'>Wallets</span>

              <div className='flex flex-col gap-2 mt-2 items-center'>
                {me?.wallets?.map((wallet) => {
                  return (
                    <div
                      key={wallet?.address}
                      className='flex gap-2 items-center'
                    >
                      <div className='flex items-center gap-1'>
                        <CryptoIcon
                          type={wallet?.assetId as AssetType}
                          stroke='white'
                          width={12}
                          height={12}
                        />
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
                Logout
              </button>
            </div>
          </PopoverBox>
        )}
      </header>
      <main className='w-full h-full my-auto'>
        {loadingQueries ? (
          <>
            <div className='flex flex-col items-center'>
              <div className='rounded-full bg-contrast w-96 h-6 animate-pulse' />
              <div className='rounded-full bg-contrast w-64 h-12 animate-pulse mt-3' />

              <div className='flex gap-8 items-center mt-6'>
                <div className='w-[292px] h-[292px] bg-contrast animate-pulse rounded-lg' />
                <div className='rounded-full bg-contrast w-10 h-10 animate-pulse' />
                <div className='w-[292px] h-[292px] bg-contrast animate-pulse rounded-lg' />
              </div>

              <div className='rounded-full bg-contrast w-60 h-10 animate-pulse mt-12' />
              <div className='rounded-full bg-contrast w-24 h-4 animate-pulse mt-2' />

              <div className='flex gap-6 mt-6'>
                <div className='rounded-full bg-contrast w-36 h-10 animate-pulse' />
                <div className='rounded-full bg-contrast w-36 h-10 animate-pulse' />
              </div>
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
                  TEAM <CryptoIcon type={drops.at(0)!.collection.blockchain} />
                  {drops.at(0)!.collection.blockchain}
                </div>
                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={drops.at(0)!.collection.metadataJson?.image as string}
                    alt={drops.at(0)!.collection.metadataJson?.name as string}
                    className='w-full object-cover aspect-square rounded-lg'
                  />
                </div>
              </div>

              <span className='text-white text-2xl font-extrabold'>VS</span>
              <div>
                <div className='bg-cta max-w-fit py-2 px-2 font-extrabold text-xl text-backdrop flex gap-2 items-center justify-end rotate-12 translate-x-4 translate-y-10'>
                  TEAM <CryptoIcon type={drops.at(1)!.collection.blockchain} />
                  {drops.at(0)!.collection.blockchain}
                </div>

                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={drops.at(1)!.collection.metadataJson?.image as string}
                    alt={drops.at(1)!.collection.metadataJson?.name as string}
                    className='w-full object-cover aspect-square rounded-lg'
                  />
                </div>
              </div>
            </div>

            {userVote && userVote.length > 0 ? (
              <>
                <span className='text-white text-2xl font-semibold mt-12'>
                  You chose {userVote[0].collection?.blockchain}!
                </span>
                <div className='flex gap-6 mt-6'>
                  <div
                    className='flex flex-col gap-2 items-center justify-center py-4 px-8 rounded-lg 
                  bg-gradient-to-r from-[#71EA9F] via-[#8AA7CC] to-[#A16AF6]'
                  >
                    <span className='text-backdrop font-bold'>
                      {drops.at(0)!.collection.blockchain} votes
                    </span>
                    <span className='text-backdrop text-3xl font-bold'>
                      {drops.at(0)!.collection.totalMints}
                    </span>
                  </div>
                  <div
                    className='flex flex-col gap-2 items-center justify-center py-4 px-8 rounded-lg 
                  bg-gradient-to-r from-[#8A46FF] to-[#6E38CC]'
                  >
                    <span className='text-backdrop font-bold'>
                      {drops.at(1)!.collection.blockchain} votes
                    </span>
                    <span className='text-backdrop text-3xl font-bold'>
                      {drops.at(1)!.collection.totalMints}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                    onClick={() => onMint(drops.at(0)!.id)}
                    disabled={loading}
                  >
                    <CryptoIcon type={drops.at(0)!.collection.blockchain} />
                    {`Mint ticket on ${drops.at(0)!.collection.blockchain}`}
                  </button>
                  <button
                    className='font-bold rounded-full text-contrast py-3 px-6 transition hover:opacity-80 flex gap-2 items-center 
                bg-gradient-to-r from-[#8A46FF] to-[#6E38CC]'
                    onClick={() => onMint(drops.at(1)!.id)}
                    disabled={loading}
                  >
                    <CryptoIcon type={drops.at(1)!.collection.blockchain} />
                    {`Mint ticket on ${drops.at(1)!.collection.blockchain}`}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
      <Modal
        open={shareTweet}
        setOpen={(shareTweet: boolean) => {
          setShareTweet(shareTweet);
        }}
      >
        <div className='flex flex-col justify-center items-center p-6'>
          <span className='text-white text-xl font-semibold'>
            Thanks for your vote!
          </span>
          <span className='text-neautraltext mt-2'>
            Let the world know how you voted.
          </span>
          <Link
            href={`https://twitter.com/intent/tweet?text=Voted for ${
              userVote && userVote[0]?.collection?.blockchain
            } in the ongoing blockchain battle by @holaplex at ${
              urlRef.current
            }`}
            target='_blank'
            className='rounded-full px-20 py-3 bg-cta text-black hover:opacity-80 transition mt-8 flex gap-2 items-center'
            onClick={() => {}}
          >
            <Icon.Twitter />
            Tweet my vote
          </Link>
        </div>
      </Modal>
    </>
  );
}
