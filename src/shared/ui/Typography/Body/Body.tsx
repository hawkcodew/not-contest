interface BodyProps {
  text: string;
  className?: string;
}

export const Body = ({ text, className }: BodyProps) => {
  return (
    <p className={`text-[17px] leading-[22px] tracking-[-0.43px] ${className}`}>
      {text}
    </p>
  );
};
