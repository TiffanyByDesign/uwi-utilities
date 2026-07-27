'use client'

import { useState } from 'react'
import { Check, Clock, Send } from 'lucide-react'

type Thread = {
  id: string
  subject: string
  body: string
  status: 'Open' | 'Resolved'
  date: string
}

const SEED: Thread[] = [
  {
    id: 'q1',
    subject: 'July electricity looks high',
    body: 'My July bill is higher than usual — could someone check the reading on my meter?',
    status: 'Open',
    date: '12 Jul',
  },
  {
    id: 'q2',
    subject: 'What is the X-Factor charge?',
    body: 'There is an X-Factor line on my water bill and I am not sure what it covers.',
    status: 'Resolved',
    date: '28 Jun',
  },
]

export default function Messages() {
  const [threads, setThreads] = useState<Thread[]>(SEED)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const canSend = subject.trim() !== '' && body.trim() !== ''

  function send() {
    if (!canSend) return
    setThreads((t) => [
      { id: `q${Date.now()}`, subject: subject.trim(), body: body.trim(), status: 'Open', date: 'Today' },
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
          Ask about a bill or a reading — we&rsquo;ll reply in your notifications.
        </p>
      </div>

      {/* Compose */}
      <section
        className="space-y-3 rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          aria-label="Query subject"
          className="w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium outline-none"
          style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
        />
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

      {/* Threads */}
      <ul className="space-y-2">
        {threads.map((t) => {
          const open = t.status === 'Open'
          return (
            <li
              key={t.id}
              className="animate-fade-rise rounded-2xl border p-4"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {t.subject}
                </p>
                <span
                  className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    background: open ? 'var(--warn-wash)' : 'var(--ok-wash)',
                    color: open ? 'var(--warn)' : 'var(--ok)',
                  }}
                >
                  {open ? <Clock className="size-3" strokeWidth={2.5} /> : <Check className="size-3" strokeWidth={3} />}
                  {t.status}
                </span>
              </div>
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
