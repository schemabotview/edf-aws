import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { mkdir, readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
await mkdir('.tmp', { recursive: true })
await build({ stdin: { contents: "export { COURSES, SPINE } from './src/content'; export { SCENES } from './src/scenes'", resolveDir: process.cwd(), loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', outfile: '.tmp/check.mjs', external: ['@graphlearning/*'] })
const { COURSES, SPINE, SCENES } = await import(pathToFileURL(resolve('.tmp/check.mjs')))
assert.deepEqual(Object.keys(COURSES), [...SPINE])
assert.equal(SPINE.length, 6)
assert.equal(Object.keys(SCENES).length, 40)
const bindings = JSON.parse(await readFile('section-map.json','utf8'))
const uses = {}
let sections = 0
for (const c of Object.values(COURSES)) {
  const ids = new Set()
  for (const s of c.sections) {
    assert(!ids.has(s.id), `Duplicate section ${c.id}/${s.id}`); ids.add(s.id)
    assert(s.slide && s.narration && SCENES[s.scene], `Incomplete section ${c.id}/${s.id}`)
    assert(s.slide.length < 1100, `Slide too long: ${s.id}`)
    const nodes = new Set(), edges = []
    function walk(n) { assert(!nodes.has(n.id), `Duplicate node ${s.scene}/${n.id}`); nodes.add(n.id); assert(n.kind !== 'list'); assert(!('x' in n) && !('y' in n)); edges.push(...n.edges ?? []); for (const k of n.children ?? []) walk(k) }
    SCENES[s.scene].nodes.forEach(walk)
    for (const e of [...SCENES[s.scene].edges, ...edges]) assert(nodes.has(e.source) && nodes.has(e.target), `Dangling edge ${s.scene}`)
    assert(!s.focus || nodes.has(s.focus), `Dangling focus ${s.scene}`)
    const num = String(c.sections.indexOf(s) + 1).padStart(2,'0')
    const base = `src/content/${c.id}/${num}-${s.id}`
    const source = await readFile(`${base}.md`, 'utf8')
    assert(source.includes(s.slide) && source.includes(s.narration), `Stale derived content ${s.id}`)
    assert.equal(s.scene, bindings[c.id+'-'+s.id].scene)
    assert.equal(s.focus, bindings[c.id+'-'+s.id].focus)
    uses[s.scene] = (uses[s.scene] ?? 0) + 1
    sections++
  }
}
assert.equal(sections,41)
assert.deepEqual(new Set(Object.keys(uses)), new Set(Object.keys(SCENES)), 'Every registered scene must be used')
const poster=SCENES['edf-aws-codex']; assert(poster)
const find=(ns,id)=>ns.flatMap(n=>[n,...(n.children?find(n.children,id):[])]).filter(n=>n.id===id)
// Poster contract: each processing panel has exactly one row of three children.
function all(ns){return ns.flatMap(n=>[n,...all(n.children??[])])}
for (const id of ['batch-proc','stream']) { const panel=all(poster.nodes).find(n=>n.id===id); assert(panel.cols===3 && panel.children.length===3) }
console.log(`Validated ${SPINE.length} courses, ${sections} sections and the architecture poster`)
