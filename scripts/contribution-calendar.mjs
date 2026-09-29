#!/usr/bin/env node
// Renders the last year of GitHub contributions as a calendar heatmap with
// each day's count printed inside its cell, as a standalone SVG.
//
//   GITHUB_TOKEN=... USERNAME=KumarShivam1908 node scripts/contribution-calendar.mjs
//
// Env:
//   CALENDAR_OUT  output path (default: contribution-calendar.svg)

import {writeFileSync} from "node:fs"

const token = process.env.GITHUB_TOKEN
const login = process.env.USERNAME
const out = process.env.CALENDAR_OUT ?? "contribution-calendar.svg"

if (!token || !login)
  throw new Error("GITHUB_TOKEN and USERNAME are required")

async function graphql(query, variables = {}) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {authorization: `bearer ${token}`, "content-type": "application/json"},
    body: JSON.stringify({query, variables}),
  })
  const body = await response.json()
  if (body.errors)
    throw new Error(body.errors.map(({message}) => message).join("; "))
  return body.data
}

// The same rolling year GitHub draws on the profile page.
const {user: {contributionsCollection: {contributionCalendar: calendar}}} = await graphql(
  `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
    totalContributions
    months{name totalWeeks}
    weeks{contributionDays{date weekday contributionCount contributionLevel}}
  }}}}`,
  {login},
)

// GitHub's dark palette. Counts on the two brightest greens switch to dark text
// so they stay readable.
const theme = {
  background: "#0d1117",
  heading: "#e6edf3",
  muted: "#7d8590",
  levels: {
    NONE: {fill: "#161b22", text: "#484f58"},
    FIRST_QUARTILE: {fill: "#0e4429", text: "#e6edf3"},
    SECOND_QUARTILE: {fill: "#006d32", text: "#e6edf3"},
    THIRD_QUARTILE: {fill: "#26a641", text: "#0d1117"},
    FOURTH_QUARTILE: {fill: "#39d353", text: "#0d1117"},
  },
}

const font = "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif"
const mono = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"

const cell = 22
const gap = 3
const step = cell + gap
const pad = 20
const gutter = 36 // day names
const top = pad + 58 // heading + month names

const weeks = calendar.weeks
const width = pad * 2 + gutter + weeks.length * step - gap
const height = top + 7 * step - gap + 48 // legend underneath

// Four digits would overflow a cell; shrink the type rather than the grid.
const fontSize = count => (count >= 1000 ? 7 : count >= 100 ? 9 : 11)

const cells = weeks
  .flatMap((week, column) =>
    week.contributionDays.map(({weekday, contributionCount: count, contributionLevel: level}) => {
      const x = pad + gutter + column * step
      const y = top + weekday * step
      const {fill, text} = theme.levels[level]
      return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="${fill}"/>` +
        `<text x="${x + cell / 2}" y="${y + cell / 2}" dy="0.35em" text-anchor="middle" fill="${text}" font-size="${fontSize(count)}" font-weight="700">${count}</text>`
    }),
  )
  .join("\n    ")

// A month's name sits over its first week. One-week stubs at either end of the
// year would collide with their neighbour, so they go unlabelled.
let column = 0
const months = calendar.months
  .map(({name, totalWeeks}) => {
    const x = pad + gutter + column * step
    column += totalWeeks
    return totalWeeks < 2 ? "" : `<text x="${x}" y="${top - 10}" fill="${theme.muted}" font-size="12">${name}</text>`
  })
  .filter(Boolean)
  .join("\n    ")

const days = [[1, "Mon"], [3, "Wed"], [5, "Fri"]]
  .map(([weekday, name]) => `<text x="${pad}" y="${top + weekday * step + cell / 2}" dy="0.35em" fill="${theme.muted}" font-size="12">${name}</text>`)
  .join("\n    ")

const legendY = top + 7 * step - gap + 20
const legend = Object.values(theme.levels)
  .map(({fill}, i) => `<rect x="${pad + gutter + 36 + i * (cell - 4 + gap)}" y="${legendY}" width="${cell - 4}" height="${cell - 4}" rx="3" fill="${fill}"/>`)
  .join("")

const total = calendar.totalContributions.toLocaleString("en-US")
const description = `${total} contributions in the last year`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Contribution calendar: ${description}">
  <title>Contribution calendar: ${description}</title>
  <rect width="${width}" height="${height}" fill="${theme.background}" rx="6"/>
  <g font-family="${font}">
    <circle cx="${pad + 4}" cy="${pad + 10}" r="4" fill="${theme.levels.FOURTH_QUARTILE.fill}"/>
    <text x="${pad + 16}" y="${pad + 10}" dy="0.35em" fill="${theme.heading}" font-size="16" font-weight="600">Contributions</text>
    <text x="${width - pad}" y="${pad + 10}" dy="0.35em" text-anchor="end" fill="${theme.muted}" font-size="13">${description}</text>
    ${months}
    ${days}
    <text x="${pad + gutter}" y="${legendY + (cell - 4) / 2}" dy="0.35em" fill="${theme.muted}" font-size="12">Less</text>
    ${legend}
    <text x="${pad + gutter + 36 + 5 * (cell - 4 + gap) + 6}" y="${legendY + (cell - 4) / 2}" dy="0.35em" fill="${theme.muted}" font-size="12">More</text>
  </g>
  <g font-family="${mono}">
    ${cells}
  </g>
</svg>
`

writeFileSync(out, svg)
console.log(`${out} — ${description}, ${weeks.length} weeks`)
