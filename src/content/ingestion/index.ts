import type { Course } from '../types'
import { section1 } from './01-full-load-and-cdc'
import { section2 } from './02-bronze-acceptance'
import { section3 } from './03-cdc-recovery'
import { section4 } from './04-topics-and-contracts'
import { section5 } from './05-connector-to-bronze'
import { section6 } from './06-event-time-and-hot-path'
export const course: Course = { id: "ingestion", title: "Ingestion: batch and streaming into Bronze", sections: [section1, section2, section3, section4, section5, section6] }
