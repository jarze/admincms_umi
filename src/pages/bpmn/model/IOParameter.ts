import { BaseElement } from './BaseElement'

export class IOParameter extends BaseElement {
  source: string
  sourceExpression: string
  target: string
  targetExpression: string
  isTransient: boolean

  getSource(): string {
    return this.source
  }

  setSource(source: string): void {
    this.source = source
  }

  getTarget(): string {
    return this.target
  }

  setTarget(target: string): void {
    this.target = target
  }

  getSourceExpression(): string {
    return this.sourceExpression
  }

  setSourceExpression(sourceExpression: string): void {
    this.sourceExpression = sourceExpression
  }

  getTargetExpression(): string {
    return this.targetExpression
  }

  setTargetExpression(targetExpression: string): void {
    this.targetExpression = targetExpression
  }

  //   isTransient(): boolean {
  //     return this.isTransient
  //   }

  setTransient(isTransient: boolean): void {
    this.isTransient = isTransient
  }

  clone(): IOParameter {
    const clone = new IOParameter()
    clone.setValues(this)
    return clone
  }

  setValues(otherElement: IOParameter): void {
    super.setValues(otherElement)
    this.setSource(otherElement.getSource())
    this.setSourceExpression(otherElement.getSourceExpression())
    this.setTarget(otherElement.getTarget())
    this.setTargetExpression(otherElement.getTargetExpression())
    // this.setTransient(otherElement.isTransient())
  }
}
