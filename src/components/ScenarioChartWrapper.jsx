'use client'
import dynamic from 'next/dynamic'

const ScenarioMiniChart = dynamic(
  () => import('./ScenarioMiniChart'),
  { ssr: false, loading: () => <div style={{ height: '240px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)' }} /> }
)

export default function ScenarioChartWrapper(props) {
  return <ScenarioMiniChart {...props} />
}
