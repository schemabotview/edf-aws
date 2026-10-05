import type { Course } from '../types'
import { section1 } from './01-business-problem'
import { section2 } from './02-source-inventory'
import { section3 } from './03-meter-contract'
import { section4 } from './04-service-objectives'
import { section5 } from './05-acceptance-evidence'
export const course: Course = { id: "requirements", title: "Requirements: sources, outcomes and acceptance", sections: [section1, section2, section3, section4, section5] }
