interface CaptionProps {
  text: string | number;
  className?: string;
}

export const Caption = ({ text, className }: CaptionProps) => {
  return (
    <p className={`text-sm leading-5 tracking-[-0.2px] truncate ${className}`}>
      {text}
    </p>
  );
};
