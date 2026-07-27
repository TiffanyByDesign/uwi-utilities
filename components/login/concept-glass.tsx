import { SiteHeader } from './site-header'
import { LoginForm } from './login-form'
import { GlassBackdrop } from './glass-backdrop'

export function ConceptGlass() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-navy">
      <GlassBackdrop />

      <SiteHeader tone="dark" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-stretch gap-10 px-6 pb-14 pt-28 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:pt-20">
        {/* Copy block */}
        <div className="max-w-xl lg:pb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold" />
            Estate Management Department
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Manage your utilities
            <br />
            in one place.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/70">
            Sign in to view your bills, track your usage, and manage your
            account.
          </p>
        </div>

        {/* Solid login card on the glass backdrop */}
        <div className="w-full max-w-md lg:shrink-0">
          <div className="rounded-3xl border border-navy/10 bg-white p-7 shadow-2xl shadow-black/40 sm:p-9">
            <div className="mb-7">
              <h2 className="font-display text-2xl font-bold text-navy">
                Log into your account
              </h2>
              <p className="mt-1.5 text-sm text-navy/55">
                Welcome back! Please sign in to continue.
              </p>
            </div>
            <LoginForm tone="light" />
          </div>
        </div>
      </div>
    </div>
  )
}
