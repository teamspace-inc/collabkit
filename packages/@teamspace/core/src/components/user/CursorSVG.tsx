import * as React from 'react'

export function CursorSVG(props: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1393_1210)">
        <path
          d="M11.5054 10.4591L16.9996 26.3313C17.0513 26.4808 17.149 26.6101 17.2786 26.7007C17.4083 26.7913 17.5632 26.8386 17.7214 26.8359C17.8795 26.8331 18.0327 26.7805 18.1591 26.6854C18.2855 26.5903 18.3787 26.4577 18.4252 26.3066L20.6335 19.1295C20.6695 19.0125 20.7335 18.9062 20.82 18.8197C20.9065 18.7332 21.0129 18.6692 21.1298 18.6332L28.3069 16.4249C28.458 16.3783 28.5906 16.2852 28.6857 16.1588C28.7808 16.0324 28.8334 15.8792 28.8362 15.7211C28.8389 15.5629 28.7916 15.408 28.701 15.2783C28.6104 15.1487 28.4811 15.051 28.3316 14.9993L12.4594 9.50507C12.3264 9.45903 12.1832 9.45134 12.046 9.48289C11.9088 9.51444 11.7833 9.58395 11.6838 9.68348C11.5843 9.783 11.5147 9.90852 11.4832 10.0457C11.4516 10.1829 11.4593 10.3261 11.5054 10.4591V10.4591Z"
          fill={props.color}
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1393_1210"
          x="-2"
          y="-2"
          width="44"
          height="44"
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
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1393_1210" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1393_1210"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
