import type { Course } from '../types'
import { section1 } from './01-platform-context'
import { section2 } from './02-full-load-and-cdc'
import { section3 } from './03-bronze-acceptance'
import { section4 } from './04-cdc-recovery'
import { section5 } from './05-topics-and-contracts'
import { section6 } from './06-connector-to-bronze'
import { section7 } from './07-event-time-and-hot-path'
export const course: Course = { id: 'ingestion', title: 'Ingestion: batch, streaming, Bronze acceptance and recovery', sections: [section1, section2, section3, section4, section5, section6, section7] }
