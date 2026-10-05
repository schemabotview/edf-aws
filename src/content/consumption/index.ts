import type { Course } from '../types'
import { section1 } from './01-lake-to-warehouse'
import { section2 } from './02-star-schema'
import { section3 } from './03-customer-scd2'
import { section4 } from './04-analytics-and-science'
import { section5 } from './05-ofgem-delivery'
import { section6 } from './06-operational-lookups'
export const course: Course = { id: "consumption", title: "Consumption: warehouse models and serving paths", sections: [section1, section2, section3, section4, section5, section6] }
