import { ApolloServer } from '@apollo/server';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import db from '@/modules/db';
import {
  MintDropInput,
  MintEditionPayload,
  MutationResolvers,
  QueryResolvers,
  Project,
  CollectionMint,
  Drop,
  TransferAssetPayload,
  TransferAssetInput,
  Blockchain,
  AssetType,
  Collectible
} from '@/graphql.types';
import { Session } from 'next-auth';
import { MintNft } from '@/mutations/drop.graphql';
import { TransferAsset } from '@/mutations/transfer.graphql';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import {
  GetProjectDrop,
  GetProjectDropPurchases
} from '@/queries/project.graphql';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import UserSource from '@/modules/user';
import holaplex from '@/modules/holaplex';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
  GetCustomerCollections,
  GetCustomerWallet
} from '@/queries/customer.graphql';

export interface AppContext {
  session: Session | null;
  dataSources: {
    db: PrismaClient;
    holaplex: ApolloClient<NormalizedCacheObject>;
    user: UserSource;
  };
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropData {
  project: Pick<Project, 'drop'>;
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetCustomerCollectionsData {
  project: Pick<Project, 'customer'>;
}

interface GetCustomerCollectionsVars {
  project: string;
  customer: string;
}

export const queryResolvers: QueryResolvers<AppContext> = {
  async drop(_a, _b, { dataSources: { holaplex } }) {
    const { data } = await holaplex.query<GetDropData, GetDropVars>({
      fetchPolicy: 'network-only',
      query: GetProjectDrop,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        drop: process.env.HOLAPLEX_DROP_ID as string
      }
    });

    return data.project.drop as Drop;
  },
  async collectible(_a, _b, { dataSources: { holaplex } }) {
    const { data } = await holaplex.query<GetDropData, GetDropVars>({
      fetchPolicy: 'network-only',
      query: GetProjectDropPurchases,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        drop: process.env.HOLAPLEX_DROP_ID as string
      }
    });

    return { mintHistory: data.project.drop?.purchases } as Collectible;
  },
  async collections(_a, _b, { session, dataSources: { holaplex, db } }) {
    if (!session) {
      return null;
    }
    const user = await db.user.findFirst({
      where: { email: session.user?.email }
    });

    if (!user || !user.holaplexCustomerId) {
      return null;
    }

    const { data } = await holaplex.query<
      GetCustomerCollectionsData,
      GetCustomerCollectionsVars
    >({
      fetchPolicy: 'network-only',
      query: GetCustomerCollections,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        customer: user?.holaplexCustomerId
      }
    });

    return data.project.customer?.mints as [CollectionMint];
  },
  async me(_a, _b, { session, dataSources: { user } }) {
    if (!session) {
      return null;
    }

    const me = await user.get(session.user?.email);

    if (me) {
      return me;
    }

    return null;
  }
};

interface MintNftData {
  mintEdition: MintEditionPayload;
}

interface MintNftVars {
  input: MintDropInput;
}

interface TransferAssetData {
  transferAsset: TransferAssetPayload;
}

interface TransferAssetVars {
  input: TransferAssetInput;
}
interface GetCustomerWalletData {
  project: Pick<Project, 'customer'>;
}

interface GetCustomerWalletVars {
  project: string;
  customer: string;
  assetId: AssetType;
}

const mutationResolvers: MutationResolvers<AppContext> = {
  async mint(_a, _b, { session, dataSources: { db, holaplex } }) {
    if (!session) {
      return null;
    }

    const user = await db.user.findFirst({
      where: { email: session.user?.email }
    });

    if (!user || !user.holaplexCustomerId) {
      return null;
    }

    const dropResponse = await holaplex.query<GetDropData, GetDropVars>({
      fetchPolicy: 'network-only',
      query: GetProjectDrop,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        drop: process.env.HOLAPLEX_DROP_ID as string
      }
    });

    const blockchain = dropResponse.data.project.drop?.collection.blockchain;

    let assetId = '';
    switch (blockchain) {
      case Blockchain.Solana:
        assetId = AssetType.Sol;
        break;
      case Blockchain.Polygon:
        assetId = AssetType.Matic;
        break;
      case Blockchain.Ethereum:
        assetId = AssetType.Eth;
        break;
    }

    const customerResponse = await holaplex.query<
      GetCustomerWalletData,
      GetCustomerWalletVars
    >({
      fetchPolicy: 'network-only',
      query: GetCustomerWallet,
      variables: {
        project: process.env.HOLAPLEX_PROJECT_ID as string,
        customer: user.holaplexCustomerId,
        assetId: assetId as AssetType
      }
    });

    const customerWallets = customerResponse.data.project.customer?.wallet;
    const recipient = customerWallets ? customerWallets[0].address : null;

    const { data } = await holaplex.mutate<MintNftData, MintNftVars>({
      mutation: MintNft,
      variables: {
        input: {
          drop: process.env.HOLAPLEX_DROP_ID as string,
          recipient: recipient as string
        }
      }
    });

    return data?.mintEdition.collectionMint as CollectionMint;
  },

  async transferMint(_a, b, { session, dataSources: { db, holaplex } }) {
    if (!session) {
      return null;
    }

    const { data } = await holaplex.mutate<
      TransferAssetData,
      TransferAssetVars
    >({
      mutation: TransferAsset,
      variables: {
        input: {
          id: b.id,
          recipient: b.wallet
        }
      }
    });

    return data?.transferAsset.mint as CollectionMint;
  }
};

const typeDefs = await loadSchema('./schema.graphql', {
  loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer<AppContext>({
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers
  },
  typeDefs
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    return {
      session,
      dataSources: {
        db,
        holaplex,
        user: new UserSource(holaplex, db)
      }
    };
  }
});
