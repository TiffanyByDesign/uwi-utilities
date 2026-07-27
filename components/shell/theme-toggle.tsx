'use client'

import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'uwi-theme'

/**
 * Runs before paint (see layout.tsx) so a dark-mode reload never flashes white.
 * A `data-theme` stamp on <html> beats the OS media query in the CSS.
 */
export const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('${STORAGE_KEY}');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
`

const OPTIONS: { id: Theme; icon: typeof Sun; label: string }[] = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'system', icon: Monitor, label: 'System' },
  { id: 'dark', icon: Moon, label: 'Dark' },
]

function apply(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') {
    delete root.dataset.theme
    localStorage.removeItem(STORAGE_KEY)
  } else {
    root.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    setTheme(stored === 'light' || stored === 'dark' ? stored : 'system')
  }, [])

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border p-0.5"
      style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      role="radiogroup"
      aria-label="Colour theme"
    >
      {OPTIONS.map(({ id, icon: Icon, label }) => {
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => {
              setTheme(id)
              apply(id)
            }}
            className={cn(
              'grid size-8 place-items-center rounded-full transition-all duration-200',
              active ? 'shadow-sm' : 'opacity-55 hover:opacity-100',
            )}
            style={
              active
                ? { background: 'var(--surface)', color: 'var(--ink)' }
                : { color: 'var(--ink-2)' }
            }
          >
            <Icon className="size-4" strokeWidth={1.9} />
          </button>
        )
      })}
    </div>
  )
}
