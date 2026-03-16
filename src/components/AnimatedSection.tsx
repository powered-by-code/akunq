import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'opacity-0 transition-all duration-700',
        isVisible && 'animate-fade-in-up opacity-100',
        className
      )}
    >
      {children}
    </section>
  );
}
