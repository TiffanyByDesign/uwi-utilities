'use client'

import { useState } from 'react'
import { Check, Clock, Send } from 'lucide-react'

type Thread = {
  id: string
  subject: string
  site: string
  body: string
  status: 'Open' | 'Resolved'
  date: string
}

const SITES = ['All sites', 'Student Union outlet', 'Library Café', 'Sports Complex kiosk']

const SEED: Thread[] = [
  { id: 'q1', subject: 'Library Café July charge', site: 'Library Café', body: 'The July electricity charge for the Library Café looks higher than usual — can this be checked?', status: 'Open', date: '13 Jul' },
  { id: 'q2', subject: 'Per-site subtotal on statement', site: 'All sites', body: 'Could the consolidated statement show a subtotal per site at the top?', status: 'Resolved', date: '26 Jun' },
]

export default function CompanyMessages() {
  const [threads, setThreads] = useState<Thread[]>(SEED)
  const [subject, setSubject] = useState('')
  const [site, setSite] = useState(SITES[0])
  const [body, setBody] = useState('')

  const canSend = subject.trim() !== '' && body.trim() !== ''

  function send() {
    if (!canSend) return
    setThreads((t) => [
      { id: `q${Date.now()}`, subject: subject.trim(), site, body: body.trim(), status: 'Open', date: 'Today' },
      ...t,
    ])
    setSubject('')
    setBody('')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Billing queries
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Ask about any site&rsquo;s bill — we&rsquo;ll reply in your notifications.
        </p>
      </div>

      <section
        className="space-y-3 rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            aria-label="Query subject"
            className="w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none"
            style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
          />
          <select
            value={site}
            onChange={(e) => setSite(e.target.value)}
            aria-label="Site"
            className="w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none"
            style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
          >
            {SITES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Describe your question…"
          aria-label="Query message"
          className="w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none"
          style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
        />
        <button
          type="button"
          onClick={send}
          disabled={!canSend}
          className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity"
          style={{ background: 'var(--brand)', opacity: canSend ? 1 : 0.5, cursor: canSend ? 'pointer' : 'not-allowed' }}
        >
          <Send className="size-4" strokeWidth={2.25} />
          Send query
        </button>
      </section>

      <ul className="space-y-2">
        {threads.map((t) => {
          const open = t.status === 'Open'
          return (
            <li
              key={t.id}
              className="rounded-2xl border p-4"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {t.subject}
                </p>
                <span
                  className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: open ? 'var(--warn-wash)' : 'var(--ok-wash)', color: open ? 'var(--warn)' : 'var(--ok)' }}
                >
                  {open ? <Clock className="size-3" strokeWidth={2.5} /> : <Check className="size-3" strokeWidth={3} />}
                  {t.status}
                </span>
              </div>
              <span
                className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{ background: 'var(--raised)', color: 'var(--ink-2)' }}
              >
                {t.site}
              </span>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
                {t.body}
              </p>
              <p className="mt-2 text-xs lnum" style={{ color: 'var(--muted)' }}>
                {t.date}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
