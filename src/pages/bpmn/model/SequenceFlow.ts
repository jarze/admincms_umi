import { FlowElement } from './FlowElement';

export class SequenceFlow extends FlowElement {
    conditionExpression: string;
    sourceRef: string;
    targetRef: string;
    skipExpression: string;
    sourceFlowElement: FlowElement;
    targetFlowElement: FlowElement;
    waypoints: number[];

    constructor(sourceRef: string, targetRef: string) {
        super();
        this.sourceRef = sourceRef;
        this.targetRef = targetRef;
    }

    getConditionExpression(): string {
        return this.conditionExpression;
    }

    setConditionExpression(conditionExpression: string): void {
        this.conditionExpression = conditionExpression;
    }

    getSourceRef(): string {
        return this.sourceRef;
    }

    setSourceRef(sourceRef: string): void {
        this.sourceRef = sourceRef;
    }

    getTargetRef(): string {
        return this.targetRef;
    }

    setTargetRef(targetRef: string): void {
        this.targetRef = targetRef;
    }

    getSkipExpression(): string {
        return this.skipExpression;
    }

    setSkipExpression(skipExpression: string): void {
        this.skipExpression = skipExpression;
    }

    getSourceFlowElement(): FlowElement {
        return this.sourceFlowElement;
    }

    setSourceFlowElement(sourceFlowElement: FlowElement): void {
        this.sourceFlowElement = sourceFlowElement;
    }

    getTargetFlowElement(): FlowElement {
        return this.targetFlowElement;
    }

    setTargetFlowElement(targetFlowElement: FlowElement): void {
        this.targetFlowElement = targetFlowElement;
    }

    getWaypoints(): number[] {
        return this.waypoints;
    }

    setWaypoints(waypoints: number[]): void {
        this.waypoints = waypoints;
    }

    toString(): string {
        return `${this.sourceRef} --> ${this.targetRef}`;
    }

    clone(): SequenceFlow {
        const clone = new SequenceFlow(this.sourceRef, this.targetRef);
        clone.setValues(this);
        return clone;
    }

    setValues(otherFlow: SequenceFlow): void {
        super.setValues(otherFlow);
        this.setConditionExpression(otherFlow.getConditionExpression());
        this.setSourceRef(otherFlow.getSourceRef());
        this.setTargetRef(otherFlow.getTargetRef());
        this.setSkipExpression(otherFlow.getSkipExpression());
    }
}