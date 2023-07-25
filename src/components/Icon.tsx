export interface IconProps {
  className?: string;
}

export function Icon() {
  return <div></div>;
}

function Polygon({ className = '' }: IconProps) {
  return (
    <svg
      width='24'
      height='22'
      viewBox='0 0 24 22'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.1149 4.27893C11.8225 4.11276 11.4465 4.11276 11.1123 4.27893L8.77285 5.64985L7.18538 6.52226L4.88773 7.89317C4.5953 8.05935 4.21932 8.05935 3.88512 7.89317L2.08877 6.81306C1.79634 6.64688 1.58747 6.31454 1.58747 5.94065V3.8635C1.58747 3.53116 1.75457 3.19881 2.08877 2.9911L3.88512 1.95252C4.17755 1.78635 4.55352 1.78635 4.88773 1.95252L6.68407 3.03264C6.9765 3.19881 7.18538 3.53116 7.18538 3.90504V5.27596L8.77285 4.36202V2.94955C8.77285 2.61721 8.60574 2.28487 8.27154 2.07715L4.9295 0.124629C4.63708 -0.041543 4.2611 -0.041543 3.92689 0.124629L0.501306 2.11869C0.167102 2.28487 0 2.61721 0 2.94955V6.8546C0 7.18694 0.167102 7.51929 0.501306 7.727L3.88512 9.67953C4.17755 9.8457 4.55352 9.8457 4.88773 9.67953L7.18538 8.35015L8.77285 7.4362L11.0705 6.10682C11.3629 5.94065 11.7389 5.94065 12.0731 6.10682L13.8695 7.1454C14.1619 7.31157 14.3708 7.64392 14.3708 8.0178V10.095C14.3708 10.4273 14.2037 10.7596 13.8695 10.9674L12.1149 12.0059C11.8225 12.1721 11.4465 12.1721 11.1123 12.0059L9.31593 10.9674C9.0235 10.8012 8.81462 10.4688 8.81462 10.095V8.76558L7.22715 9.67953V11.0504C7.22715 11.3828 7.39426 11.7151 7.72846 11.9228L11.1123 13.8754C11.4047 14.0415 11.7807 14.0415 12.1149 13.8754L15.4987 11.9228C15.7911 11.7567 16 11.4243 16 11.0504V7.10386C16 6.77151 15.8329 6.43917 15.4987 6.23145L12.1149 4.27893Z'
        fill='white'
      />
    </svg>
  );
}
Icon.Polygon = Polygon;

function Solana({ className = '' }: IconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.59949 4.14168C4.70006 4.0522 4.83281 4 4.96958 4H17.7377C17.971 4 18.0877 4.26099 17.9228 4.41385L15.4005 6.75153C15.304 6.84101 15.1712 6.89321 15.0304 6.89321H2.26229C2.02897 6.89321 1.91231 6.63222 2.07724 6.47936L4.59949 4.14168Z'
        fill='white'
      />
      <path
        d='M15.4005 8.69508C15.304 8.6056 15.1712 8.5534 15.0304 8.5534H2.26229C2.02897 8.5534 1.91231 8.81439 2.07724 8.96725L4.59949 11.3049C4.69604 11.3944 4.82879 11.4466 4.96958 11.4466H17.7377C17.971 11.4466 18.0877 11.1856 17.9228 11.0328L15.4005 8.69508Z'
        fill='white'
      />
      <path
        d='M4.59949 13.2485C4.69604 13.159 4.82879 13.1068 4.96958 13.1068H17.7377C17.971 13.1068 18.0877 13.3678 17.9228 13.5206L15.4005 15.8583C15.304 15.9478 15.1712 16 15.0304 16H2.26229C2.02897 16 1.91231 15.739 2.07724 15.5862L4.59949 13.2485Z'
        fill='white'
      />
    </svg>
  );
}
Icon.Solana = Solana;

function Eth({ className = '' }: IconProps) {
  return (
    <svg
      width='12'
      height='18'
      viewBox='0 0 12 18'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.99825 0L0 9.16693L5.99825 12.4326V6.65578V0Z' fill='white' />
      <path
        d='M5.99825 0L5.8672 0.410163V12.3121L5.99825 12.4326L11.9965 9.16693L5.99825 0Z'
        fill='white'
      />
      <path
        d='M5.99819 13.4787L5.92436 13.5616V17.8014L5.99819 18L12 10.2147L5.99819 13.4787Z'
        fill='white'
      />
      <path d='M5.99819 18V13.4787L0 10.2146L5.99819 18Z' fill='white' />
    </svg>
  );
}
Icon.Eth = Eth;

function Loading({ className }: IconProps) {
  return (
    <svg
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
