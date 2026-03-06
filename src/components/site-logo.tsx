type SiteLogoProps = {
  compact?: boolean;
  subtitle?: string;
};

export function SiteLogo({ compact = false, subtitle }: SiteLogoProps) {
  return (
    <>
      <div className={`brand__mark${compact ? " brand__mark--compact" : ""}`} aria-hidden="true">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect
            fill="url(#keb-gradient)"
            height="42"
            rx="14"
            stroke="rgba(17, 17, 19, 0.08)"
            width="42"
            x="3"
            y="3"
          />
          <path
            d="M15 13.5V34.5M15 24L29.5 13.5M15 24L30.5 34.5M31.5 13.5V34.5"
            stroke="#111113"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <defs>
            <linearGradient id="keb-gradient" x1="6" x2="40" y1="4" y2="44">
              <stop stopColor="rgba(255,255,255,0.98)" />
              <stop offset="1" stopColor="rgba(220,220,220,0.92)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="brand__copy">
        <p className="eyebrow">KEB News</p>
        <span className="brand__title">Editorial AI briefings</span>
        {subtitle ? <span className="brand__subtitle">{subtitle}</span> : null}
      </div>
    </>
  );
}
