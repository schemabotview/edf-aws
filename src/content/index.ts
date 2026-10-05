import type { Course } from './types'
import { course as c0 } from './requirements'
import { course as c1 } from './architecture'
import { course as c2 } from './ingestion'
import { course as c3 } from './transformation'
import { course as c4 } from './consumption'
import { course as c5 } from './platform-operations'
export const SPINE = ["requirements", "architecture", "ingestion", "transformation", "consumption", "platform-operations"] as const
export const COURSES: Record<string, Course> = Object.fromEntries([c0, c1, c2, c3, c4, c5].map(c => [c.id, c]))
export type { Course, Section } from './types'
export { slugOf, allSections } from '@graphlearning/shell'
export const getCourse = (id: string) => COURSES[id]
