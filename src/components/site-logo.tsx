import Image from "next/image";

type SiteLogoProps = {
  compact?: boolean;
  subtitle?: string;
};

export function SiteLogo({ compact = false, subtitle }: SiteLogoProps) {
  const brandSubtitle = subtitle ?? "Editorial AI briefings.";

  return (
    <>
      <div className={`brand__mark${compact ? " brand__mark--compact" : ""}`} aria-hidden="true">
        <Image
          alt=""
          className="brand__mark-image"
          height={compact ? 48 : 52}
          priority
          src="/brand/keb-news-icon.png"
          width={compact ? 48 : 52}
        />
      </div>

      <div className="brand__copy">
        <p className="eyebrow">AI and tech newsroom</p>
        <span className="brand__title">KEB News</span>
        <span className="brand__subtitle">{brandSubtitle}</span>
      </div>
    </>
  );
}
