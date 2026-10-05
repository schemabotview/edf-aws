import type { Scene } from '@graphlearning/flow'
import { edfAwsCodex } from './full-architecture'
import { canonicalScenes } from './canonical'
import { practicalScenes } from './practical'
export const SCENES: Record<string, Scene> = Object.fromEntries([edfAwsCodex, ...canonicalScenes, ...practicalScenes].map(s => [s.id, s]))
export const getScene = (id: string) => SCENES[id]
