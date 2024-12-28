interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={`${className} transform translate-y-full animate-slideUp`}
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </div>
    </div>
  );
}