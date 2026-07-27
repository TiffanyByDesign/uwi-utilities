import { PencilRuler } from 'lucide-react'

/** Honest stand-in for screens scheduled in a later design phase, so the
 *  navigation never leads to a dead 404 during the walkthrough. */
export function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div className="p-5 sm:p-8">
      <div
        className="animate-fade-rise mx-auto mt-6 max-w-md rounded-2xl border p-10 text-center"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <span
          className="mx-auto grid size-12 place-items-center rounded-xl"
          style={{ background: 'var(--accent-wash)' }}
        >
          <PencilRuler className="size-6" strokeWidth={1.8} style={{ color: 'var(--accent-strong)' }} />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
          {title}
        </h2>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
          {note ?? 'This screen is part of a later design phase.'}
        </p>
      </div>
    </div>
  )
}
