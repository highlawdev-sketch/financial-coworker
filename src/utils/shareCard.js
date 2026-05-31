import { fmt } from './finance.js'

const FONT = '"Pretendard", "Malgun Gothic", -apple-system, sans-serif'

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export async function generateShareCard({
  assetName, assetTag, assetColor,
  years, principal, monthly,
  series, finalVal, totalInvested, gain, pct, cagr,
}) {
  await document.fonts.ready

  const W = 1200, H = 630
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // ── Background ──
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#17171a')
  bg.addColorStop(1, '#222225')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Subtle dot grid
  ctx.fillStyle = 'rgba(255,255,255,0.025)'
  for (let x = 40; x < W; x += 80) {
    for (let y = 40; y < H; y += 80) {
      ctx.beginPath()
      ctx.arc(x, y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // ── Sparkline area ──
  if (series.length > 1) {
    const maxV = series[series.length - 1]
    const pts = series.map((v, i) => ({
      x: (i / (series.length - 1)) * W,
      y: H - (v / maxV) * (H * 0.6) - 40,
    }))

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i - 1].x + pts[i].x) / 2
      ctx.bezierCurveTo(cpx, pts[i - 1].y, cpx, pts[i].y, pts[i].x, pts[i].y)
    }
    ctx.strokeStyle = assetColor + '35'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.lineTo(W, H)
    ctx.lineTo(0, H)
    ctx.closePath()
    const areaGrad = ctx.createLinearGradient(0, H * 0.3, 0, H)
    areaGrad.addColorStop(0, assetColor + '18')
    areaGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = areaGrad
    ctx.fill()
  }

  // ── Brand (top-left) ──
  ctx.font = `500 20px ${FONT}`
  ctx.fillStyle = '#383836'
  ctx.fillText('ETF 수익률 계산기', 80, 64)

  // ── Asset tag pill (top-right) ──
  ctx.font = `600 19px ${FONT}`
  const tagW = ctx.measureText(assetTag).width + 26
  roundRect(ctx, W - 80 - tagW, 42, tagW, 32, 16)
  ctx.fillStyle = assetColor + '20'
  ctx.fill()
  ctx.fillStyle = assetColor
  ctx.fillText(assetTag, W - 80 - tagW + 13, 63)

  // ── Asset + period ──
  ctx.font = `400 27px ${FONT}`
  ctx.fillStyle = '#484846'
  ctx.fillText(`${assetName}  ·  ${years}년 투자`, 80, 132)

  // ── Hero: final amount ──
  ctx.font = `700 82px ${FONT}`
  ctx.fillStyle = '#f0efeb'
  ctx.fillText(fmt(finalVal), 80, 255)

  // ── Investment details ──
  ctx.font = `400 24px ${FONT}`
  ctx.fillStyle = '#424240'
  const detail = monthly > 0
    ? `초기 ${principal.toLocaleString()}만원  +  월 ${monthly.toLocaleString()}만원 납입`
    : `초기 ${principal.toLocaleString()}만원 일시 투자`
  ctx.fillText(detail, 80, 302)

  // ── Divider ──
  ctx.beginPath()
  ctx.moveTo(80, 352); ctx.lineTo(W - 80, 352)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 1
  ctx.stroke()

  // ── Stats row ──
  const stats = [
    { label: '납입 총액',  value: fmt(totalInvested), color: '#888780' },
    { label: '투자 수익',  value: '+' + fmt(gain),    color: '#1D9E75' },
    { label: '총 수익률',  value: '+' + pct + '%',     color: '#1D9E75' },
    { label: 'CAGR',       value: cagr + '%/yr',       color: '#666664' },
  ]
  stats.forEach((s, i) => {
    const x = 80 + i * 262
    ctx.font = `400 19px ${FONT}`
    ctx.fillStyle = '#383836'
    ctx.fillText(s.label, x, 398)
    ctx.font = `600 28px ${FONT}`
    ctx.fillStyle = s.color
    ctx.fillText(s.value, x, 436)
  })

  // ── Bottom accent line ──
  const line = ctx.createLinearGradient(80, 0, W - 80, 0)
  line.addColorStop(0, 'transparent')
  line.addColorStop(0.3, assetColor + '60')
  line.addColorStop(0.7, assetColor + '60')
  line.addColorStop(1, 'transparent')
  ctx.beginPath()
  ctx.moveTo(80, 510); ctx.lineTo(W - 80, 510)
  ctx.strokeStyle = line
  ctx.lineWidth = 1
  ctx.stroke()

  // ── URL ──
  ctx.font = `400 19px ${FONT}`
  ctx.fillStyle = '#2c2c2a'
  ctx.fillText('financial-coworker.vercel.app', 80, 590)

  return canvas
}

export async function downloadOrShare(canvas, { assetName, years, finalVal }) {
  return new Promise(resolve => {
    canvas.toBlob(async blob => {
      const file = new File([blob], 'etf-simulation.png', { type: 'image/png' })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'ETF 투자 시뮬레이션 결과',
            text: `${assetName} ${years}년 투자 예상 자산: ${fmt(finalVal)}`,
          })
        } catch (_) { /* user cancelled */ }
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `etf-simulation-${assetName}-${years}yr.png`
        a.click()
        URL.revokeObjectURL(url)
      }
      resolve()
    }, 'image/png')
  })
}
