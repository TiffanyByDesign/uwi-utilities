'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'light' | 'glass' | 'dark'

type LoginFormProps = {
  tone?: Tone
}

const styles: Record<
  Tone,
  {
    label: string
    input: string
    iconMuted: string
    field: string
    checkbox: string
    subtle: string
    link: string
    button: string
    divider: string
    helper: string
  }
> = {
  light: {
    label: 'text-navy/70',
    input: 'text-navy placeholder:text-navy/35',
    iconMuted: 'text-navy/40',
    field:
      'border-navy/12 bg-white focus-within:border-navy focus-within:ring-4 focus-within:ring-navy/10',
    checkbox: 'border-navy/25 text-navy',
    subtle: 'text-navy/55',
    link: 'text-navy hover:text-navy-600',
    button:
      'bg-navy text-white hover:bg-navy-600 shadow-lg shadow-navy/20',
    divider: 'text-navy/40 before:bg-navy/10 after:bg-navy/10',
    helper: 'text-navy/60',
  },
  glass: {
    label: 'text-white/75',
    input: 'text-white placeholder:text-white/40',
    iconMuted: 'text-white/50',
    field:
      'border-white/20 bg-white/10 focus-within:border-white/60 focus-within:ring-4 focus-within:ring-white/10',
    checkbox: 'border-white/40 text-navy',
    subtle: 'text-white/70',
    link: 'text-white hover:text-gold',
    button:
      'bg-white text-navy hover:bg-white shadow-lg shadow-black/20',
    divider: 'text-white/50 before:bg-white/20 after:bg-white/20',
    helper: 'text-white/70',
  },
  dark: {
    label: 'text-white/70',
    input: 'text-white placeholder:text-white/35',
    iconMuted: 'text-white/45',
    field:
      'border-white/10 bg-white/[0.04] focus-within:border-gold/70 focus-within:ring-4 focus-within:ring-gold/10',
    checkbox: 'border-white/30 text-gold',
    subtle: 'text-white/60',
    link: 'text-gold hover:text-gold/80',
    button:
      'bg-gold text-navy hover:bg-gold/90 shadow-lg shadow-gold/20',
    divider: 'text-white/40 before:bg-white/15 after:bg-white/15',
    helper: 'text-white/55',
  },
}

export function LoginForm({ tone = 'light' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const s = styles[tone]

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault()
        // Prototype flow: no auth yet — go straight to the client portal.
        router.push('/portal')
      }}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="idnumber"
            className={cn('text-sm font-medium', s.label)}
          >
            ID Number <span className="text-red-500">*</span>
          </label>
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-200',
              s.field,
            )}
          >
            <User className={cn('size-5 shrink-0', s.iconMuted)} strokeWidth={1.75} />
            <input
              id="idnumber"
              type="text"
              inputMode="numeric"
              autoComplete="username"
              placeholder="Enter your ID Number"
              className={cn(
                'w-full bg-transparent text-sm outline-none',
                s.input,
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className={cn('text-sm font-medium', s.label)}
            >
              Password
            </label>
            <a href="#" className={cn('text-xs font-medium', s.link)}>
              Forgot password?
            </a>
          </div>
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-200',
              s.field,
            )}
          >
            <Lock className={cn('size-5 shrink-0', s.iconMuted)} strokeWidth={1.75} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={cn(
                'w-full bg-transparent text-sm outline-none',
                s.input,
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className={cn(
                'shrink-0 rounded-md p-0.5 transition-opacity hover:opacity-100',
                s.iconMuted,
              )}
            >
              {showPassword ? (
                <EyeOff className="size-5" strokeWidth={1.75} />
              ) : (
                <Eye className="size-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        <label className={cn('flex cursor-pointer items-center gap-2.5 text-sm', s.subtle)}>
          <input
            type="checkbox"
            className={cn(
              'size-4 rounded border bg-transparent accent-current',
              s.checkbox,
            )}
          />
          Keep me signed in on this device
        </label>

        <button
          type="submit"
          className={cn(
            'btn-sheen group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5',
            s.button,
          )}
        >
          Log in
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </button>

        <p
          className={cn(
            'flex items-center justify-center gap-1.5 pt-1 text-xs',
            s.helper,
          )}
        >
          <ShieldCheck className="size-3.5" strokeWidth={1.75} />
          Protected by 256-bit encryption
        </p>
      </div>
    </form>
  )
}
