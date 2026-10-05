import type { Course } from '../types'
import { section1 } from './01-platform-overview'
import { section2 } from './02-two-ingestion-paths'
import { section3 } from './03-medallion-zones'
import { section4 } from './04-retention-and-maintenance'
export const course: Course = { id: "architecture", title: "Architecture: the complete EDF AWS platform", sections: [section1, section2, section3, section4] }
