import { ARTICLES } from '../data/articles'
import { SCENARIOS } from '../data/scenarios'

const BASE = 'https://financial-coworker.vercel.app'

export default function sitemap() {
  const staticPages = [
    { url: BASE,                priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${BASE}/simulator`, priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/goal`,      priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${BASE}/correlation`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/frontier`,  priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${BASE}/guide`,     priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${BASE}/scenarios`, priority: 0.8,  changeFrequency: 'monthly' },
  ]

  const articlePages = ARTICLES.map(a => ({
    url: `${BASE}/guide/${a.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  const scenarioPages = SCENARIOS.map(s => ({
    url: `${BASE}/scenarios/${s.slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }))

  return [...staticPages, ...articlePages, ...scenarioPages]
}
