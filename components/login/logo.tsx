import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  /** 'light' = for dark backgrounds, 'dark' = for light backgrounds */
  tone?: 'light' | 'dark'
  className?: string
}

export function Logo({ tone = 'light', className }: LogoProps) {
  const isLight = tone === 'light'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'group grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl p-1 shadow-sm ring-1 transition-transform duration-300 hover:scale-105',
          isLight
            ? 'bg-white/90 ring-white/40 backdrop-blur-md'
            : 'bg-white ring-navy/10',
        )}
      >
        <Image
          src="/uwi-crest.png"
          alt="The University of the West Indies coat of arms"
          width={44}
          height={44}
          className="size-full object-contain"
          priority
        />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block max-w-[13rem] font-display text-[13px] font-bold uppercase leading-tight tracking-tight sm:text-sm',
            isLight ? 'text-white' : 'text-navy',
          )}
        >
          The University of the West Indies
        </span>
      </span>
    </div>
  )
}
