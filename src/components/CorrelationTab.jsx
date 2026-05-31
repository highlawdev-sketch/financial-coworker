import { ASSETS, CORR, ASSET_KEYS } from '../data/assets.js'

function corrBg(v, isDiag) {
  if (isDiag) return 'var(--surface2)'
  if (v > 0)  return `rgba(55,138,221,${(v * 0.72).toFixed(2)})`
  return `rgba(212,83,126,${(Math.abs(v) * 0.72).toFixed(2)})`
}

function corrTextColor(v, isDiag) {
  if (isDiag) return 'var(--text-muted)'
  return Math.abs(v) > 0.5 ? '#fff' : 'var(--text)'
}

export default function CorrelationTab() {
  return (
    <>
      <div className="chart-wrap" style={{ overflowX: 'auto' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>자산 간 상관계수 매트릭스</div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          1에 가까울수록 함께 움직이고, -1에 가까울수록 반대로 움직입니다. 0 근처면 독립적입니다.
        </p>

        <table style={{ borderCollapse: 'separate', borderSpacing: '3px', fontSize: '13px', minWidth: '560px' }}>
          <thead>
            <tr>
              <th style={{ width: '100px' }} />
              {ASSET_KEYS.map(k => (
                <th key={k} style={{ padding: '6px 8px', fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: ASSETS[k].color, marginRight: 5, verticalAlign: 'middle' }} />
                  {ASSETS[k].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASSET_KEYS.map(row => (
              <tr key={row}>
                <td style={{ padding: '6px 8px', fontWeight: 500, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: ASSETS[row].color, marginRight: 5, verticalAlign: 'middle' }} />
                  {ASSETS[row].name}
                </td>
                {ASSET_KEYS.map(col => {
                  const v    = CORR[row][col]
                  const diag = row === col
                  return (
                    <td key={col} style={{
                      padding: '10px 8px',
                      textAlign: 'center',
                      borderRadius: '6px',
                      background: corrBg(v, diag),
                      color: corrTextColor(v, diag),
                      fontWeight: diag ? 600 : 500,
                      minWidth: '64px',
                    }}>
                      {v.toFixed(2)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', fontSize: '12px', color: 'var(--text-muted)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span>범례:</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 32, height: 12, borderRadius: 4, background: 'rgba(55,138,221,0.72)', display: 'inline-block' }} />
            양의 상관
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 32, height: 12, borderRadius: 4, background: 'rgba(212,83,126,0.72)', display: 'inline-block' }} />
            음의 상관
          </span>
        </div>
      </div>

      <div className="chart-wrap">
        <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1rem' }}>자산 기본 정보</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {ASSET_KEYS.map(k => (
            <div key={k} style={{
              padding: '12px',
              background: 'var(--surface2)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: `3px solid ${ASSETS[k].color}`,
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 4 }}>{ASSETS[k].name}</div>
              <div style={{ fontWeight: 700, fontSize: '17px', color: ASSETS[k].color }}>{ASSETS[k].rate}%/yr</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>변동성 ~{ASSETS[k].stddev}%</div>
              <div style={{ fontSize: '11px', color: '#C0392B', marginTop: 1 }}>MDD {ASSETS[k].mdd}%</div>
            </div>
          ))}
        </div>
      </div>

      <p className="notice">
        ※ 상관계수는 역사적 평균 데이터를 기반으로 한 근사치입니다. 실제 상관관계는 시장 국면과 시기에 따라 달라질 수 있습니다.
      </p>
    </>
  )
}
