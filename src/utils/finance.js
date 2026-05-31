export function calcSeries(principal, monthly, years, rate, annualRaise = 0) {
  const r = rate / 100 / 12
  const data = []
  let val = principal * 10000
  let m = monthly * 10000
  for (let y = 0; y <= years; y++) {
    data.push(Math.round(val))
    for (let mo = 0; mo < 12; mo++) {
      val = val * (1 + r) + m
    }
    if (annualRaise > 0) m *= (1 + annualRaise / 100)
  }
  return data
}

export function calcInvested(principal, monthly, years, annualRaise = 0) {
  const data = []
  let total = principal * 10000
  let m = monthly * 10000
  for (let y = 0; y <= years; y++) {
    data.push(Math.round(total))
    total += m * 12
    if (annualRaise > 0) m *= (1 + annualRaise / 100)
  }
  return data
}

export function fmt(v) {
  if (v >= 100000000) return (v / 100000000).toFixed(1) + '억원'
  if (v >= 10000) return Math.round(v / 10000).toLocaleString() + '만원'
  return Math.round(v).toLocaleString() + '원'
}
