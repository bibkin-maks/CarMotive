import { SVGProps } from "react";
import Image from "next/image";

// --- Safe SVG typing ---
export interface SafeSvgProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height" | "strokeWidth"> {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
}

const svg = (props: SafeSvgProps = {}): SafeSvgProps => ({
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

// --- Inline SVG Icons ---
export const IconMenu: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconX: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const IconWrench: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <path d="M21 3a7 7 0 0 1-9.9 8.9L4 19v2h2l7.1-7.1A7 7 0 0 1 21 3Z" />
    <circle cx="18" cy="6" r="1" />
  </svg>
);

export const IconInfo: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);



export const IconCheckCircle: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m22 4-10 10-3-3" />
  </svg>
);

export const IconMapPin: React.FC<SafeSvgProps> = (props) => (
  <svg {...svg({ viewBox: "0 0 24 24", ...props })} aria-hidden>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconClock: React.FC<SafeSvgProps> = (props) => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.5 8.33333V17.5H26.6667M17.5 34C8.3873 34 1 26.6127 1 17.5C1 8.3873 8.3873 1 17.5 1C26.6127 1 34 8.3873 34 17.5C34 26.6127 26.6127 34 17.5 34Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

/**
 * To allow setting className from the place of usage for your Image-based icons,
 * accept and forward className prop to the underlying Image component.
 * Update IconSettings, IconBuilding, and IconPhone as follows:
 */

export function IconSettings(props: { className?: string }) {
  return (
    <Image
      src="/image/Vector.svg"
      alt="Building icon"
      width={80}
      height={64}
      className={props.className}
    />
  );
}

export function IconBuilding(props: { className?: string }) {
  return (
    <Image
      src="/image/Vector2.svg"
      alt="Building icon"
      width={80}
      height={64}
      className={props.className}
    />
  );
}

export const IconPhone: React.FC<{ className?: string }> = (props) => (
  <Image
    src="/image/Vector3.svg"
    alt="Building icon"
    width={80}
    height={64}
    className={props.className}
  />
);


export function IconServ({ choice, ...props }: SVGProps<SVGSVGElement> & { choice: number }) {
  if(choice === 0){
    return IconSettings(props);
  }else if(choice === 1){
    return IconBuilding(props);
  }else{
    return IconPhone(props);
  }

}




export const Check: React.FC<SafeSvgProps> = (props) => {
  return (
     <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_178_11)">
      <path
        d="M21.8789 2.47247C20.3144 1.69499 18.5509 1.25781 16.6854 1.25781C10.2317 1.25781 5 6.48954 5 12.9432C5 19.3969 10.2317 24.6286 16.6854 24.6286C23.1391 24.6286 28.3708 19.3969 28.3708 12.9432C28.3708 12.5044 28.3466 12.0711 28.2995 11.6448M28.3708 3.85457L16.6854 15.54L12.7903 11.6448"
        stroke="#62CE41"
        strokeWidth="1.9176"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_178_11"
        x="0.443557"
        y="0.296875"
        width="32.4801"
        height="32.4801"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3.59551" />
        <feGaussianBlur stdDeviation="1.79775" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_178_11"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_178_11"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

}
 

export const ScheduleIcon: React.FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" {...p} xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth={2} />
    <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
  </svg>
);