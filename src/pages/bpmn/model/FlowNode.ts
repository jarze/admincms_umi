import { FlowElement } from './FlowElement'
import { SequenceFlow } from './SequenceFlow'

export abstract class FlowNode extends FlowElement {
  asynchronous: boolean
  asynchronousLeave: boolean
  notExclusive: boolean
  incomingFlows: SequenceFlow[]
  outgoingFlows: SequenceFlow[]
  behavior: any

  constructor() {
    super()
  }

  isAsynchronous(): boolean {
    return this.asynchronous
  }

  setAsynchronous(asynchronous: boolean): void {
    this.asynchronous = asynchronous
  }

  isAsynchronousLeave(): boolean {
    return this.asynchronousLeave
  }

  setAsynchronousLeave(asynchronousLeave: boolean): void {
    this.asynchronousLeave = asynchronousLeave
  }

  isExclusive(): boolean {
    return !this.notExclusive
  }

  setExclusive(exclusive: boolean): void {
    this.notExclusive = !exclusive
  }

  isNotExclusive(): boolean {
    return this.notExclusive
  }

  setNotExclusive(notExclusive: boolean): void {
    this.notExclusive = notExclusive
  }

  getBehavior(): any {
    return this.behavior
  }

  setBehavior(behavior: any): void {
    this.behavior = behavior
  }

  getIncomingFlows(): SequenceFlow[] {
    return this.incomingFlows
  }

  setIncomingFlows(incomingFlows: SequenceFlow[]): void {
    this.incomingFlows = incomingFlows
  }

  getOutgoingFlows(): SequenceFlow[] {
    return this.outgoingFlows
  }

  setOutgoingFlows(outgoingFlows: SequenceFlow[]): void {
    this.outgoingFlows = outgoingFlows
  }

  setValues(otherNode: FlowNode): void {
    super.setValues(otherNode)
    this.setAsynchronous(otherNode.isAsynchronous())
    this.setNotExclusive(otherNode.isNotExclusive())
    this.setAsynchronousLeave(otherNode.isAsynchronousLeave())

    if (otherNode.getIncomingFlows() != null) {
      this.setIncomingFlows(otherNode.getIncomingFlows().map(flow => flow.clone()))
    }

    if (otherNode.getOutgoingFlows() != null) {
      this.setOutgoingFlows(otherNode.getOutgoingFlows().map(flow => flow.clone()))
    }
  }
}
