import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConceptApp } from '@graphlearning/shell'
import '@graphlearning/flow/styles.css'
import '@graphlearning/shell/styles.css'
import './theme.css'
import { COURSES } from './content'
import { getScene } from './scenes'
createRoot(document.getElementById('root')!).render(
  <StrictMode><ConceptApp subject="EDF AWS" courses={COURSES} getScene={getScene}
    audioBase={import.meta.env.BASE_URL} /></StrictMode>,
)
