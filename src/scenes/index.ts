import type { Scene } from '@graphlearning/flow'
import { edfAwsCodex } from './full-architecture'
import { canonicalScenes } from './canonical'
export const SCENES: Record<string, Scene> = Object.fromEntries([edfAwsCodex, ...canonicalScenes].map(s => [s.id, s]))
export const getScene = (id: string) => SCENES[id]
