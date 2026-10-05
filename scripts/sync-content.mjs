import { readdir, readFile, writeFile } from 'node:fs/promises'
const root = new URL('../src/content/', import.meta.url)
const bindings = JSON.parse(await readFile(new URL('../section-map.json', import.meta.url), 'utf8'))
let count = 0
for (const course of await readdir(root, { withFileTypes: true })) {
  if (!course.isDirectory()) continue
  const dir = new URL(`${course.name}/`, root)
  for (const file of await readdir(dir)) {
    if (!/^\d\d-.*\.md$/.test(file)) continue
    const source = await readFile(new URL(file, dir), 'utf8')
    const match = source.match(/^# (.+)\n\n## On screen\n\n([\s\S]+?)\n\n## Narration\n\n([\s\S]+)$/)
    if (!match) throw Error(`Malformed content source: ${course.name}/${file}`)
    const [, title, slide, spoken] = match
    const base = file.slice(0, -3), id = base.slice(3), index = Number(base.slice(0, 2))
    const binding = bindings[course.name+'-'+id]
    if (!binding) throw Error(`Missing scene binding: ${course.name}/${id}`)
    const q = JSON.stringify
    await writeFile(new URL(`${base}.slide`, dir), slide.trim() + '\n')
    await writeFile(new URL(`${base}.tts`, dir), spoken.trim() + '\n')
    await writeFile(new URL(`${base}.ts`, dir), `// Generated from adjacent Markdown by npm run content:sync.\nimport type { Section } from '../types'\nexport const section${index}: Section = { id: ${q(id)}, title: ${q(title)}, scene: ${q(binding.scene)}, ${binding.focus ? `focus: ${q(binding.focus)}, ` : ''} slide: ${q(slide.trim())}, narration: ${q(spoken.trim())} }\n`)
    count++
  }
}
console.log(`Synced ${count} Markdown sources to sections, slides and narration scripts`)
