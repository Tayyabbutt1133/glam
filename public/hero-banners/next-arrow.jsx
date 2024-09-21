export default function NextArrowIcon({ className, shadow = false }) {
  return shadow ? (
    <svg
      width="64"
      height="65"
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_d_3_21578)">
        <path
          d="M32 56.5C47.464 56.5 60 43.964 60 28.5C60 13.036 47.464 0.5 32 0.5C16.536 0.5 4 13.036 4 28.5C4 43.964 16.536 56.5 32 56.5Z"
          fill="white"
        />
        <path
          d="M32 56C47.1878 56 59.5 43.6878 59.5 28.5C59.5 13.3122 47.1878 1 32 1C16.8122 1 4.5 13.3122 4.5 28.5C4.5 43.6878 16.8122 56 32 56Z"
          stroke="#001325"
          stroke-opacity="0.08"
        />
        <path
          d="M29.2499 35C29.0509 35.0022 28.8557 34.9447 28.6896 34.8351C28.5234 34.7255 28.3938 34.5686 28.3175 34.3848C28.2412 34.2009 28.2216 33.9984 28.2612 33.8034C28.3008 33.6083 28.3979 33.4295 28.5399 33.29L33.3399 28.5L28.5399 23.71C28.4467 23.6142 28.3733 23.5009 28.3238 23.3766C28.2743 23.2524 28.2499 23.1196 28.2517 22.9859C28.2536 22.8522 28.2817 22.7201 28.3346 22.5973C28.3875 22.4745 28.4641 22.3633 28.5599 22.27C28.6558 22.1768 28.7691 22.1033 28.8933 22.0539C29.0176 22.0044 29.1504 21.9799 29.2841 21.9818C29.4178 21.9836 29.5498 22.0118 29.6727 22.0647C29.7955 22.1176 29.9067 22.1942 29.9999 22.29L35.4999 27.79C35.5934 27.8831 35.6676 27.9938 35.7182 28.1156C35.7688 28.2374 35.7949 28.3681 35.7949 28.5C35.7949 28.632 35.7688 28.7626 35.7182 28.8844C35.6676 29.0063 35.5934 29.1169 35.4999 29.21L29.9999 34.71C29.9018 34.8076 29.7845 34.8838 29.6554 34.9337C29.5263 34.9836 29.3882 35.0062 29.2499 35Z"
          fill="#202020"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3_21578"
          x="0"
          y="0.5"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_21578"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3_21578"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ) : (
    <svg
      width="50"
      height="50"
      viewBox="0 0 56 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M28 56.5C43.464 56.5 56 43.964 56 28.5C56 13.036 43.464 0.5 28 0.5C12.536 0.5 0 13.036 0 28.5C0 43.964 12.536 56.5 28 56.5Z"
        fill="white"
      />
      <path
        d="M28 56C43.1878 56 55.5 43.6878 55.5 28.5C55.5 13.3122 43.1878 1 28 1C12.8122 1 0.5 13.3122 0.5 28.5C0.5 43.6878 12.8122 56 28 56Z"
        stroke="#001325"
        stroke-opacity="0.08"
      />
      <path
        d="M25.2499 35C25.0509 35.0022 24.8557 34.9447 24.6896 34.8351C24.5234 34.7255 24.3938 34.5686 24.3175 34.3848C24.2412 34.2009 24.2216 33.9984 24.2612 33.8034C24.3008 33.6083 24.3979 33.4295 24.5399 33.29L29.3399 28.5L24.5399 23.71C24.4467 23.6142 24.3733 23.5009 24.3238 23.3766C24.2743 23.2524 24.2499 23.1196 24.2517 22.9859C24.2536 22.8522 24.2817 22.7201 24.3346 22.5973C24.3875 22.4745 24.4641 22.3633 24.5599 22.27C24.6558 22.1768 24.7691 22.1033 24.8933 22.0539C25.0176 22.0044 25.1504 21.9799 25.2841 21.9818C25.4178 21.9836 25.5498 22.0118 25.6727 22.0647C25.7955 22.1176 25.9067 22.1942 25.9999 22.29L31.4999 27.79C31.5934 27.8831 31.6676 27.9938 31.7182 28.1156C31.7688 28.2374 31.7949 28.3681 31.7949 28.5C31.7949 28.632 31.7688 28.7626 31.7182 28.8844C31.6676 29.0063 31.5934 29.1169 31.4999 29.21L25.9999 34.71C25.9018 34.8076 25.7845 34.8838 25.6554 34.9337C25.5263 34.9836 25.3882 35.0062 25.2499 35Z"
        fill="#202020"
      />
    </svg>
  );
}
