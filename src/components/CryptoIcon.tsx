import { AssetType, Blockchain } from '../graphql.types';
import { Icon } from './Icon';

interface CryptoIconProps {
  type: AssetType | Blockchain;
  className?: string;
}

export default function CryptoIcon({
  type: assetType,
  className
}: CryptoIconProps) {
  switch (assetType) {
    case AssetType.Sol:
    case Blockchain.Solana:
      return <Icon.Solana className={className} />;
    case AssetType.Matic:
    case Blockchain.Polygon:
      return <Icon.Polygon className={className} />;
    case AssetType.Eth:
    case Blockchain.Ethereum:
      return <Icon.Eth className={className} />;
    default:
      return <></>;
  }
}
