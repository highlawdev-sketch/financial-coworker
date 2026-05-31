'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/',            label: '투자 가이드' },
  { href: '/simulator',   label: '시뮬레이터' },
  { href: '/goal',        label: '목표 역산' },
  { href: '/correlation', label: '자산 상관계수' },
  { href: '/frontier',    label: '효율적 투자선' },
]

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="tabs">
      {TABS.map(t => (
        <Link
          key={t.href}
          href={t.href}
          className={`tab-btn${pathname === t.href ? ' active' : ''}`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
