// Required monthly contribution to reach goal in N years
export function calcRequiredMonthly(principalWon, goalWon, years, rate) {
  const r = rate / 100 / 12
  const n = years * 12
  if (n <= 0) return Infinity
  if (r === 0) return Math.max(0, (goalWon - principalWon) / n)
  const fvP = principalWon * Math.pow(1 + r, n)
  if (fvP >= goalWon) return 0  // principal alone reaches goal
  return (goalWon - fvP) * r / (Math.pow(1 + r, n) - 1)
}

// Years needed to reach goal via pure savings (0% return)
export function simpleSavingsYears(principalWon, monthlyWon, goalWon) {
  if (monthlyWon <= 0) return Infinity
  const remaining = goalWon - principalWon
  if (remaining <= 0) return 0
  return remaining / (monthlyWon * 12)
}
