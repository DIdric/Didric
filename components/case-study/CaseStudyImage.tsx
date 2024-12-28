interface CaseStudyImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function CaseStudyImage({ src, alt, caption }: CaseStudyImageProps) {
  return (
    <figure className="my-8">
      <div className="rounded-lg overflow-hidden">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-400 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}