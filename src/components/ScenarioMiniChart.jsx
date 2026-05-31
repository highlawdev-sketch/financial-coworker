'use client'
import { Line } from 'react-chartjs-2'
import '../chartSetup.js'

const OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  interaction: { intersect: false, mode: 'index' },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + '만원' },
    },
  },
  scales: {
    x: {
      ticks: { maxTicksLimit: 8, color: '#888780', font: { size: 11 } },
      grid: { display: false }, border: { display: false },
    },
    y: {
      ticks: {
        color: '#888780', font: { size: 11 },
        callback: v => v >= 10000 ? (v / 10000).toFixed(0) + '억' : v.toLocaleString() + '만',
      },
      grid: { color: 'rgba(136,135,128,0.12)' }, border: { display: false },
    },
  },
}

export default function ScenarioMiniChart({ series, invested, labels, color, assetName }) {
  const datasets = [
    {
      label: '납입금',
      data: invested.map(v => Math.round(v / 10000)),
      borderColor: '#888780', backgroundColor: 'transparent',
      borderDash: [4, 4], borderWidth: 1.5, pointRadius: 0, tension: 0,
    },
    {
      label: assetName,
      data: series.map(v => Math.round(v / 10000)),
      borderColor: color, backgroundColor: 'transparent',
      borderWidth: 2.5, pointRadius: 0, tension: 0.3,
    },
  ]
  return (
    <div style={{ height: '240px', position: 'relative' }}>
      <Line data={{ labels, datasets }} options={OPTS} />
    </div>
  )
}
