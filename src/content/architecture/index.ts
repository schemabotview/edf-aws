import type { Course } from '../types'
import { section1 } from './01-platform-overview'
import { section2 } from './02-service-responsibilities'
import { section3 } from './03-two-ingestion-paths'
import { section4 } from './04-medallion-zones'
import { section5 } from './05-iceberg-table-example'
import { section6 } from './06-retention-and-maintenance'
import { section7 } from './07-maintenance-example'
export const course: Course = { id: 'architecture', title: 'Architecture: platform responsibilities, storage and medallion', sections: [section1, section2, section3, section4, section5, section6, section7] }
