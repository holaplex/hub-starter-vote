import { AssetType, Blockchain } from '../graphql.types';
import { Icon } from './Icon';

interface CryptoIconProps {
  type: AssetType | Blockchain;
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}

export default function CryptoIcon({
  type: assetType,
  className,
  width,
  height,
  stroke,
  fill
}: CryptoIconProps) {
  switch (assetType) {
    case AssetType.Sol:
    case Blockchain.Solana:
      return (
        <Icon.Solana
          className={className}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
        />
      );
    case AssetType.Matic:
    case Blockchain.Polygon:
      return (
        <Icon.Polygon
          className={className}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
        />
      );
    case AssetType.Eth:
    case Blockchain.Ethereum:
      return (
        <Icon.Eth
          className={className}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
        />
      );
    default:
      return <></>;
  }
}
