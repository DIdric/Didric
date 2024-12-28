interface CaseStudyHeaderProps {
  title: string;
  category: string;
  year: string;
  client: string;
  image_url?: string;
}

export function CaseStudyHeader({ title, category, year, client, image_url }: CaseStudyHeaderProps) {
  return (
    <header className="mb-16">
      <div className="mb-8">
        <span className="text-accent-red text-sm">{category}</span>
        <h1 className="text-4xl font-bold text-white mt-2 mb-4">{title}</h1>
        <div className="flex gap-8 text-gray-400">
          <div>
            <span className="text-sm block mb-1">Year</span>
            <span className="text-white">{year}</span>
          </div>
          <div>
            <span className="text-sm block mb-1">Client</span>
            <span className="text-white">{client}</span>
          </div>
        </div>
      </div>
      
      {image_url && (
        <div className="aspect-[21/9] rounded-lg overflow-hidden bg-dark-800">
          <img 
            src={image_url} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </header>
  );
}