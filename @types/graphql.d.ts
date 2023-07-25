
declare module '*/customer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateCustomer: DocumentNode;
export const CreateCustomerWallet: DocumentNode;
export const GetCustomerWallets: DocumentNode;
export const GetCustomerTreasury: DocumentNode;
export const GetCustomerCollections: DocumentNode;
export const GetCustomerWallet: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/drop.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintNft: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/mint.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintDrop: DocumentNode;
export const TransferMint: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/transfer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TransferAsset: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/collectible.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollectibles: DocumentNode;
export const GetCollectibleHistory: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/collections.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollections: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/me.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetMe: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/project.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetProjectCollections: DocumentNode;
export const GetProjectDrop: DocumentNode;
export const GetProjectDropPurchases: DocumentNode;

  export default defaultDocument;
}
    