import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "src"> & { src: string };

export function SiteImage({ src, alt, unoptimized, quality = 90, fill, style, ...rest }: SiteImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      fill={fill}
      unoptimized={unoptimized ?? src.toLowerCase().endsWith(".svg")}
      style={fill ? style : { height: "auto", ...style }}
      {...rest}
    />
  );
}
