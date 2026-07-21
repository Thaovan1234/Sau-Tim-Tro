import worm from "@/assets/worm-mascot.png";

type Props = { className?: string; alt?: string; animate?: boolean };

export function WormMascot({ className = "h-10 w-10", alt = "Sâu mascot", animate }: Props) {
  return (
    <img
      src={worm}
      alt={alt}
      width={768}
      height={768}
      loading="lazy"
      className={`${className} ${animate ? "animate-wiggle" : ""} object-contain select-none`}
      draggable={false}
    />
  );
}
