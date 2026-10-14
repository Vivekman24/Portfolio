interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'dots';
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return <div aria-hidden="true" className={`studio-divider ${className}`}><span /></div>;
}
