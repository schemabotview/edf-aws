import puppeteer from 'puppeteer'
import { createServer } from 'vite'
import { build } from 'esbuild'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
await mkdir('.tmp', { recursive: true }); await mkdir('frames', { recursive: true })
await build({ stdin: { contents: "export { COURSES } from './src/content'", resolveDir: process.cwd(), loader: 'ts' }, outfile: '.tmp/frames.mjs', bundle: true, platform: 'node', format: 'esm', external: ['@graphlearning/*'] })
const { COURSES } = await import(pathToFileURL(resolve('.tmp/frames.mjs')))
const selected = process.env.FRAMES_COURSES?.split(',')
const courses = Object.values(COURSES).filter(c => !selected || selected.includes(c.id))
const sectionCount = courses.reduce((sum, c) => sum + c.sections.length, 0)
const server = await createServer({ server: { host: '127.0.0.1', port: 5187, strictPort: true } })
let browser; const failures = [], results=[]
try {
  await server.listen(); browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const errors = []; page.on('pageerror', e => errors.push(e.message))
  for (const size of [{width:1920,height:1080},{width:3840,height:2160},{width:390,height:844}]) {
    await page.setViewport(size)
    for (const course of courses) {
      for (const section of course.sections) {
        const slug=`${course.id}-${section.id}`
        await page.goto(`http://127.0.0.1:5187/?capture=1#/${slug}`, { waitUntil:'networkidle2' })
        await page.evaluate(()=>document.fonts.ready)
        await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))
        const defects=await page.evaluate(()=>{
          const defects=[]
          const panel=document.querySelector('.slide-panel')
          if (panel && getComputedStyle(panel).display!=='none' && panel.clientHeight && panel.scrollHeight>panel.clientHeight+2) defects.push('slide overflow')
          if(!document.querySelector('.react-flow__node'))defects.push('scene missing')
          for(const n of document.querySelectorAll('.react-flow__node')){
            const b=n.getBoundingClientRect(), w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT)
            while(w.nextNode()){
              if(!w.currentNode.textContent.trim())continue
              const r=document.createRange();r.selectNodeContents(w.currentNode)
              for(const t of r.getClientRects())if(t.right>b.right+2||t.left<b.left-2||t.bottom>b.bottom+2||t.top<b.top-2)defects.push(`node text: ${n.dataset.id}`)
            }
          }
          return [...new Set(defects)]
        })
        if(defects.length||errors.length)failures.push({slug,width:size.width,defects,errors:errors.splice(0)})
        if(size.width===1920)await page.screenshot({path:`frames/${slug}.png`})
        results.push({slug,width:size.width,defects})
      }
      console.log(`${size.width}px: ${course.id} rendered`)
    }
  }
  await page.setViewport({width:2560,height:1440})
  await page.goto('http://127.0.0.1:5187/#/edf-aws-codex',{waitUntil:'networkidle2'})
  await page.evaluate(()=>document.fonts.ready)
  await page.screenshot({path:'frames/full-architecture.png'})
  await page.setViewport({width:1920,height:1080})
  await page.goto('http://127.0.0.1:5187/',{waitUntil:'networkidle2'})
  await page.screenshot({path:'frames/catalog.png'})
  // Render contact sheets for visual inspection, preserving all three complete frames per course.
  await page.setViewport({width:960,height:1620})
  for(const course of courses){
    const imgs=[]
    for(const section of course.sections)imgs.push((await readFile(`frames/${course.id}-${section.id}.png`)).toString('base64'))
    for(let offset=0;offset<imgs.length;offset+=3){
    await page.setContent(`<html><body style="margin:0;background:#fff">${imgs.slice(offset,offset+3).map(i=>`<img style="display:block;width:960px;height:540px" src="data:image/png;base64,${i}">`).join('')}</body></html>`)
    await page.screenshot({path:`frames/review-${course.id}-${Math.floor(offset/3)+1}.png`})
    }
  }
  await writeFile('frames/report.json',JSON.stringify({sections:sectionCount,viewports:3,failures,results},null,2))
  if(failures.length)throw Error(JSON.stringify(failures))
  console.log(`All ${sectionCount} selected sections passed at desktop, 4K and mobile; poster and catalog captured`)
} finally { await browser?.close(); await server.close() }
