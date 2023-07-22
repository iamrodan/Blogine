type AppLogoProps = {
  src: string;
  alt: string;
  className?: string;
};
export default function Image({ src, alt, className }: AppLogoProps) {
  const finalClassName = `${className}`;
  return <img src={src} alt={alt} className={finalClassName} />;
}
