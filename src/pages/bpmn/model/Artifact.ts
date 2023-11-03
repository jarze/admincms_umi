import { BaseElement } from './BaseElement'

export abstract class Artifact extends BaseElement {
  abstract clone(): Artifact
}
