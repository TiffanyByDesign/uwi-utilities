'use client'

import { Globe, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

type SiteHeaderProps = {
  /**
   * 'split' = left over dark hero, right over a light panel (dept text goes navy on desktop).
   * 'dark' = both sides dark (text stays light everywhere).
   */
  tone?: 'split' | 'dark'
}

export function SiteHeader({ tone = 'split' }: SiteHeaderProps) {
  const deptTitle =
    tone === 'dark'
      ? 'text-white'
      : 'text-white md:text-navy'

  const deptSub =
    tone === 'dark'
      ? 'text-white/60'
      : 'text-white/70 md:text-navy/55'

  const divider =
    tone === 'dark'
      ? 'bg-white/15'
      : 'bg-white/20 md:bg-navy/15'

  const utilityBtn =
    tone === 'dark'
      ? 'text-white/70 hover:text-white'
      : 'text-white/70 hover:text-white md:text-navy/60 md:hover:text-navy'

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      {/* Accent top rule reminiscent of the university's banner strip */}
      <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-transparent" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo tone="light" />

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Department block from the wireframe */}
          <div className="hidden text-right sm:block">
            <p className={cn('font-display text-sm font-semibold leading-tight', deptTitle)}>
              Estate Management Department
            </p>
            <p className={cn('text-xs leading-tight', deptSub)}>
              Utilities Management Application
            </p>
          </div>

          <span className={cn('hidden h-9 w-px sm:block', divider)} aria-hidden="true" />

          <div className="flex items-center gap-1">
            <button
              type="button"
              className={cn(
                'hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:flex',
                utilityBtn,
              )}
            >
              <Globe className="size-4" strokeWidth={1.75} />
              EN
            </button>
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                utilityBtn,
              )}
            >
              <Headphones className="size-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">Support</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
