interface TagProps {
  value: string;
}

const TagText = ({ text, className }: { text: string; className: string }) => {
  return (
    <span
      className={`text-[12px] font-[590] leading-3.5 tracking-[-0.2px] uppercase ${className}`}
    >
      {text}
    </span>
  );
};

export const Tag = ({ value }: TagProps) => {
  const [first, second] = value.split(' ');
  return (
    <div
      className={
        'flex items-center gap-0.5 px-2 py-0.5 bg-button-additional rounded-[10px] max-w-max'
      }
    >
      <TagText text={first} className={'text-primary'} />
      <TagText text={second} className={'text-secondary'} />
    </div>
  );
};
