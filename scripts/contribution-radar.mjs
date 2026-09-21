#!/usr/bin/env node
// Renders a radar chart of the GitHub contribution mix
// (commits / issues / pull requests / code review) as a standalone SVG.
//
//   GITHUB_TOKEN=... USERNAME=KumarShivam1908 node scripts/contribution-radar.mjs
//
// Env:
//   RADAR_WINDOW  "year" (default, GitHub's rolling 12 months) or "all"
//   RADAR_OUT     output path (default: contribution-radar.svg)

import {writeFileSync} from "node:fs"

const token = process.env.GITHUB_TOKEN
const login = process.env.USERNAME
const window = process.env.RADAR_WINDOW ?? "year"
const out = process.env.RADAR_OUT ?? "contribution-radar.svg"

if (!token || !login)
  throw new Error("GITHUB_TOKEN and USERNAME are required")

const FIELDS = `
  totalCommitContributions
  totalIssueContributions
  totalPullRequestContributions
  totalPullRequestReviewContributions
`

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

// GitHub caps a contributionsCollection at one year, so "all" walks year by year.
async function collect() {
  if (window !== "all")
    return (await graphql(`query($login:String!){user(login:$login){contributionsCollection{${FIELDS}}}}`, {login})).user.contributionsCollection

  const {user: {createdAt}} = await graphql(`query($login:String!){user(login:$login){createdAt}}`, {login})
  const total = {totalCommitContributions: 0, totalIssueContributions: 0, totalPullRequestContributions: 0, totalPullRequestReviewContributions: 0}
  for (let year = new Date(createdAt).getUTCFullYear(); year <= new Date().getUTCFullYear(); year++) {
    const from = new Date(Date.UTC(year, 0, 1)).toISOString()
    const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString()
    const {user: {contributionsCollection}} = await graphql(
      `query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){${FIELDS}}}}`,
      {login, from, to},
    )
    for (const key of Object.keys(total))
      total[key] += contributionsCollection[key]
  }
  return total
}

const contributions = await collect()

// Clockwise from the top, matching the order GitHub reports them in.
const axes = [
  {label: "Code review", value: contributions.totalPullRequestReviewContributions, angle: -90},
  {label: "Issues", value: contributions.totalIssueContributions, angle: 0},
  {label: "Pull requests", value: contributions.totalPullRequestContributions, angle: 90},
  {label: "Commits", value: contributions.totalCommitContributions, angle: 180},
]

const sum = axes.reduce((total, {value}) => total + value, 0)
const max = Math.max(...axes.map(({value}) => value))
const percent = ({value}) => (sum ? Math.round((value / sum) * 100) : 0)

const theme = {
  background: "#0d1117",
  spoke: "#3fb950",
  area: "#2ea043",
  vertex: "#7ee787",
  label: "#79c0ff",
}

const [width, height] = [440, 360]
const [cx, cy] = [width / 2, 182]
const R = 104

// The longest axis is pinned to the full radius so the shape stays readable
// whatever the absolute contribution counts are.
const point = ({value, angle}) => {
  const radius = max ? (value / max) * R : 0
  const radians = (angle * Math.PI) / 180
  return [cx + radius * Math.cos(radians), cy + radius * Math.sin(radians)]
}
const tip = ({angle}) => {
  const radians = (angle * Math.PI) / 180
  return [cx + R * Math.cos(radians), cy + R * Math.sin(radians)]
}

const spokes = axes
  .map(axis => {
    const [x, y] = tip(axis)
    return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${theme.spoke}" stroke-width="2.5"/>`
  })
  .join("\n  ")

const polygon = axes
  .map(axis => point(axis).map(n => n.toFixed(1)).join(","))
  .join(" ")

const vertices = axes
  .map(axis => {
    const [x, y] = point(axis)
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${theme.vertex}"/>`
  })
  .join("\n  ")

// Each label sits just outside its own spoke, percentage above the name.
const placements = {
  "-90": axis => ({x: cx, y: cy - R - 36, anchor: "middle"}),
  "0": axis => ({x: cx + R + 16, y: cy - 8, anchor: "start"}),
  "90": axis => ({x: cx, y: cy + R + 30, anchor: "middle"}),
  "180": axis => ({x: cx - R - 16, y: cy - 8, anchor: "end"}),
}

const labels = axes
  .map(axis => {
    const {x, y, anchor} = placements[axis.angle](axis)
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${theme.label}" font-size="15" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif">${percent(axis)}%<tspan x="${x}" dy="19">${axis.label}</tspan></text>`
  })
  .join("\n  ")

const description = axes.map(axis => `${axis.label} ${percent(axis)}%`).join(", ")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Contribution mix: ${description}">
  <title>Contribution mix: ${description}</title>
  <rect width="${width}" height="${height}" fill="${theme.background}" rx="6"/>
  ${spokes}
  <polygon points="${polygon}" fill="${theme.area}" fill-opacity="0.75" stroke="${theme.area}" stroke-width="2"/>
  ${vertices}
  ${labels}
</svg>
`

writeFileSync(out, svg)
console.log(`${out} — ${description} (${sum} contributions, window: ${window})`)
