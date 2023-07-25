import { AssetType } from '../graphql.types';
import { Icon } from './Icon';

interface CryptoIconProps {
  assetType: AssetType;
  className?: string;
}

export default function CryptoIcon({ assetType, className }: CryptoIconProps) {
  switch (assetType) {
    case AssetType.Sol:
      return <Icon.Solana className={className} />;
    case AssetType.Matic:
      return <Icon.Polygon className={className} />;
    case AssetType.Eth:
      return <Icon.Eth className={className} />;
    default:
      return <></>;
  }
}
