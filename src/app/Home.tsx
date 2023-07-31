'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CollectionMint, Drop, Vote } from '@/graphql.types';
import { MintDrop } from '@/mutations/mint.graphql';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import useMe from '@/hooks/useMe';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { PopoverBox } from '../components/Popover';
import { Icon } from '../components/Icon';
import { signOut } from 'next-auth/react';
import CryptoIcon from '../components/CryptoIcon';
import {
  GetUserCollectibles,
  GetCollectible
} from '@/queries/collectible.graphql';
import { useRouter } from 'next/navigation';
import { Modal } from '@holaplex/ui-library-react';

interface MintData {
  mint: CollectionMint;
}

interface MintVars {
  vote: Vote;
}

interface GetCollectibleData {
  collectible: Drop;
}

interface GetCollectibleVars {
  vote: Vote;
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

  const collectibleAQuery = useQuery<GetCollectibleData, GetCollectibleVars>(
    GetCollectible,
    {
      variables: {
        vote: Vote.A
      }
    }
  );
  const collectibleA = collectibleAQuery.data?.collectible;

  const collectibleBQuery = useQuery<GetCollectibleData, GetCollectibleVars>(
    GetCollectible,
    {
      variables: {
        vote: Vote.B
      }
    }
  );
  const collectibleB = collectibleBQuery.data?.collectible;

  const userCollectiblesQuery =
    useQuery<GetUserCollectiblesData>(GetUserCollectibles);

  const userVote = userCollectiblesQuery.data?.userCollectibles?.filter(
    (mint) =>
      mint.collectionId === collectibleA?.collection.id ||
      mint.collectionId === collectibleB?.collection.id
  );

  const [mint, { loading }] = useMutation<MintData, MintVars>(MintDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetUserCollectibles
      }
    ]
  });

  const onMint = (vote: Vote) => {
    if (!session) {
      router.push('/login');
      return;
    }
    mint({
      variables: {
        vote
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

  const loadingQueries =
    collectibleAQuery.loading ||
    collectibleBQuery.loading ||
    userCollectiblesQuery.loading;

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
            <div className='rounded-lg bg-contrast p-6 flex flex-col gap-4 mt-4 items-start'>
              <Link href='/collectibles' className='text-white font-medium'>
                View collectibles
              </Link>
              <button
                onClick={() => signOut()}
                className='text-white font-medium hover:cursor-pointer'
              >
                Logout
              </button>
            </div>
          </PopoverBox>
        )}
      </header>
      <main className='w-full h-full my-auto pb-2'>
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
            <span className='text-neautraltext text-sm md:text-base'>
              🎉 To celebrate & showcase HUB’s multi-chain support Holaplex
              presents…. 🎉
            </span>
            <span className='text-white text-4xl md:text-6xl font-semibold md:font-extrabold mt-3'>
              BLOCKCHAIN BATTLE!
            </span>

            <div className='flex gap-3 md:gap-8 items-center mt-6 justify-around'>
              <div>
                <div
                  className='relative bg-cta max-w-fit font-extrabold text-xl text-backdrop flex gap-2 items-center 
                -rotate-[17deg] -translate-x-12 translate-y-10'
                >
                  <div
                    className='h-0 w-0 border-t-[20px] border-l-[20px] border-b-[20px] 
                      border-solid border-t-transparent border-b-transparent border-l-backdrop mr-4 -ml-[1px]'
                  />
                  TEAM <CryptoIcon type={collectibleA!.collection.blockchain} />
                  {collectibleA!.collection.blockchain}
                  <div
                    className='h-0 w-0 border-t-[20px] border-r-[20px] border-b-[20px] 
                      border-solid border-t-transparent border-b-transparent border-r-backdrop ml-4 -mr-[1px]'
                  />
                </div>
                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_HOLAPLEX_VOTE_A_IMAGE as string
                    }
                    alt={collectibleA!.collection.metadataJson?.name as string}
                    className='w-full object-cover aspect-square rounded-lg'
                  />
                </div>
              </div>

              <span className='text-white text-lg md:text-2xl font-extrabold'>
                VS
              </span>
              <div>
                <div className='w-full flex justify-end'>
                  <div
                    className='bg-cta max-w-fit font-extrabold text-xl text-backdrop 
                flex gap-2 items-center justify-end rotate-[17deg] translate-x-12 translate-y-10'
                  >
                    <div
                      className='h-0 w-0 border-t-[20px] border-l-[20px] border-b-[20px] 
                      border-solid border-t-transparent border-b-transparent border-l-backdrop mr-4 -ml-[1px]'
                    />
                    TEAM
                    <CryptoIcon type={collectibleB!.collection.blockchain} />
                    {collectibleB!.collection.blockchain}
                    <div
                      className='h-0 w-0 border-t-[20px] border-r-[20px] border-b-[20px] 
                      border-solid border-t-transparent border-b-transparent border-r-backdrop ml-4 -mr-[1px]'
                    />
                  </div>
                </div>

                <div className='max-w-[292px] max-h-[292px]'>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_HOLAPLEX_VOTE_B_IMAGE as string
                    }
                    alt={collectibleB!.collection.metadataJson?.name as string}
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
                      {collectibleA!.collection.blockchain} votes
                    </span>
                    <span className='text-backdrop text-3xl font-bold'>
                      {collectibleA!.collection.totalMints}
                    </span>
                  </div>
                  <div
                    className='flex flex-col gap-2 items-center justify-center py-4 px-8 rounded-lg 
                  bg-gradient-to-r from-[#8A46FF] to-[#6E38CC]'
                  >
                    <span className='text-backdrop font-bold'>
                      {collectibleB!.collection.blockchain} votes
                    </span>
                    <span className='text-backdrop text-3xl font-bold'>
                      {collectibleB!.collection.totalMints}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className='text-white text-lg md:text-2xl font-semibold mt-12'>
                  Mint your raffle ticket to make your vote
                </span>
                <Link
                  href='/rules'
                  className='text-cta text-xs font-medium mt-2'
                >
                  View official rules
                </Link>

                <div className='flex gap-6 mt-6'>
                  <button
                    className='font-bold rounded-full text-contrast py-3 px-6 transition hover:opacity-80 flex gap-2 items-center
                bg-gradient-to-r from-[#71EA9F] via-[#8AA7CC] to-[#A16AF6]'
                    onClick={() => onMint(Vote.A)}
                    disabled={loading}
                  >
                    <CryptoIcon type={collectibleA!.collection.blockchain} />
                    {`Mint ticket on ${collectibleA!.collection.blockchain}`}
                  </button>
                  <button
                    className='font-bold rounded-full text-contrast py-3 px-6 transition hover:opacity-80 flex gap-2 items-center 
                bg-gradient-to-r from-[#8A46FF] to-[#6E38CC]'
                    onClick={() => onMint(Vote.B)}
                    disabled={loading}
                  >
                    <CryptoIcon type={collectibleB!.collection.blockchain} />
                    {`Mint ticket on ${collectibleB!.collection.blockchain}`}
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
            href={`https://twitter.com/intent/tweet?text=I Voted for ${
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
