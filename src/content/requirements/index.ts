import type { Course } from '../types'
import { section1 } from './01-business-problem'
import { section2 } from './02-business-needs'
import { section3 } from './03-source-systems'
import { section4 } from './04-slas'
import { section5 } from './05-acceptance-criteria'
export const course: Course = { id: 'requirements', title: 'Requirements: business needs, source systems, SLAs and acceptance criteria', sections: [section1, section2, section3, section4, section5] }
