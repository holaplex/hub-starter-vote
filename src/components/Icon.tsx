export interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function Icon() {
  return <div></div>;
}

function Polygon({
  width = 21,
  height = 18,
  className,
  fill = 'none',
  stroke = '#1A1A1D'
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 18'
      fill={fill}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.4378 5.73482C15.0868 5.53541 14.6357 5.53541 14.2346 5.73482L11.4273 7.37992L9.52236 8.4268L6.76518 10.0719C6.41426 10.2713 5.96309 10.2713 5.56204 10.0719L3.40643 8.77576C3.05552 8.57636 2.80486 8.17755 2.80486 7.72888V5.2363C2.80486 4.83749 3.00539 4.43867 3.40643 4.18941L5.56204 2.94312C5.91296 2.74372 6.36413 2.74372 6.76518 2.94312L8.92079 4.23927C9.2717 4.43867 9.52236 4.83749 9.52236 5.28615V6.93125L11.4273 5.83452V4.13956C11.4273 3.74075 11.2268 3.34194 10.8258 3.09268L6.81531 0.749653C6.46439 0.550246 6.01322 0.550246 5.61217 0.749653L1.50147 3.14253C1.10042 3.34194 0.899902 3.74075 0.899902 4.13956V8.82562C0.899902 9.22443 1.10042 9.62324 1.50147 9.8725L5.56204 12.2155C5.91296 12.4149 6.36413 12.4149 6.76518 12.2155L9.52236 10.6203L11.4273 9.52354L14.1845 7.92829C14.5354 7.72888 14.9866 7.72888 15.3876 7.92829L17.5432 9.17458C17.8942 9.37398 18.1448 9.7728 18.1448 10.2215V12.714C18.1448 13.1129 17.9443 13.5117 17.5432 13.7609L15.4378 15.0072C15.0868 15.2066 14.6357 15.2066 14.2346 15.0072L12.079 13.7609C11.7281 13.5615 11.4774 13.1627 11.4774 12.714V11.1188L9.57249 12.2155V13.8606C9.57249 14.2594 9.77301 14.6583 10.1741 14.9075L14.2346 17.2505C14.5855 17.4499 15.0367 17.4499 15.4378 17.2505L19.4983 14.9075C19.8493 14.7081 20.0999 14.3093 20.0999 13.8606V9.12473C20.0999 8.72591 19.8994 8.3271 19.4983 8.07784L15.4378 5.73482Z'
        fill={stroke}
      />
    </svg>
  );
}
Icon.Polygon = Polygon;

function Solana({
  width = 21,
  height = 16,
  className,
  fill = 'none',
  stroke = '#1A1A1D'
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 16'
      fill={fill}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.01929 0.970062C4.13997 0.862685 4.29927 0.800049 4.4634 0.800049H19.7852C20.0651 0.800049 20.2051 1.11323 20.0072 1.29667L16.9805 4.10189C16.8647 4.20926 16.7054 4.2719 16.5364 4.2719H1.21465C0.934666 4.2719 0.794676 3.95872 0.992594 3.77528L4.01929 0.970062Z'
        fill={stroke}
      />
      <path
        d='M16.9805 6.43414C16.8647 6.32677 16.7054 6.26413 16.5364 6.26413H1.21465C0.934666 6.26413 0.794676 6.57731 0.992594 6.76075L4.01929 9.56597C4.13515 9.67334 4.29445 9.73598 4.4634 9.73598H19.7852C20.0651 9.73598 20.2051 9.4228 20.0072 9.23936L16.9805 6.43414Z'
        fill={stroke}
      />
      <path
        d='M4.01929 11.8982C4.13515 11.7908 4.29445 11.7282 4.4634 11.7282H19.7852C20.0651 11.7282 20.2051 12.0414 20.0072 12.2248L16.9805 15.03C16.8647 15.1374 16.7054 15.2 16.5364 15.2H1.21465C0.934666 15.2 0.794676 14.8869 0.992594 14.7034L4.01929 11.8982Z'
        fill={stroke}
      />
    </svg>
  );
}
Icon.Solana = Solana;

function Eth({
  width = 12,
  height = 18,
  className,
  fill = 'none',
  stroke = '#1A1A1D'
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 18'
      className={className}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.99825 0L0 9.16693L5.99825 12.4326V6.65578V0Z' fill={stroke} />
      <path
        d='M5.99825 0L5.8672 0.410163V12.3121L5.99825 12.4326L11.9965 9.16693L5.99825 0Z'
        fill={stroke}
      />
      <path
        d='M5.99819 13.4787L5.92436 13.5616V17.8014L5.99819 18L12 10.2147L5.99819 13.4787Z'
        fill={stroke}
      />
      <path d='M5.99819 18V13.4787L0 10.2146L5.99819 18Z' fill={stroke} />
    </svg>
  );
}
Icon.Eth = Eth;

function Loading({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 1.66666V4.99999'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.5 15V18.3333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.6084 4.10834L6.96673 6.46667'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M14.0332 13.5333L16.3915 15.8917'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M2.1665 10H5.49984'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15.5 10H18.8333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.6084 15.8917L6.96673 13.5333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M14.0332 6.46667L16.3915 4.10834'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
Icon.Loading = Loading;

function Success({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M26.6667 8L12 22.6667L5.33337 16'
        stroke='#66A784'
        strokeWidth='4.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Success = Success;

function ChevronDown({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L7 7L13 1'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.ChevronDown = ChevronDown;

function Copy({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='2'
        y='6'
        width='8'
        height='8'
        rx='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 6V4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V8C14 9.10457 13.1046 10 12 10H10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Copy = Copy;

function Check({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.3337 4.33325L6.00033 11.6666L2.66699 8.33325'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Check = Check;

function Twitter({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='15'
      viewBox='0 0 16 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.3332 2.00011C14.6948 2.45043 13.9879 2.79485 13.2398 3.02011C12.8383 2.55845 12.3047 2.23124 11.7112 2.08273C11.1177 1.93422 10.4928 1.97158 9.92122 2.18975C9.34961 2.40792 8.8588 2.79638 8.51516 3.30259C8.17152 3.8088 7.99164 4.40834 7.99984 5.02011V5.68678C6.82826 5.71716 5.66735 5.45732 4.62051 4.93041C3.57367 4.4035 2.67338 3.62587 1.99984 2.66678C1.99984 2.66678 -0.666829 8.66678 5.33317 11.3334C3.96019 12.2654 2.32461 12.7327 0.666504 12.6668C6.6665 16.0001 13.9998 12.6668 13.9998 5.00011C13.9992 4.81441 13.9814 4.62918 13.9465 4.44678C14.6269 3.77577 15.1071 2.92859 15.3332 2.00011Z'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
Icon.Twitter = Twitter;

function Google({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />{' '}
    </svg>
  );
}
Icon.Google = Google;
