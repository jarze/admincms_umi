import { FlowNode } from './FlowNode';
import { EventDefinition } from './EventDefinition';
import { IOParameter } from './IOParameter';

export abstract class Event extends FlowNode {
    eventDefinitions: EventDefinition[] = [];
    inParameters: IOParameter[] = [];
    outParameters: IOParameter[] = [];

    getEventDefinitions(): EventDefinition[] {
        return this.eventDefinitions;
    }

    setEventDefinitions(eventDefinitions: EventDefinition[]): void {
        this.eventDefinitions = eventDefinitions;
    }

    addEventDefinition(eventDefinition: EventDefinition): void {
        this.eventDefinitions.push(eventDefinition);
    }

    getInParameters(): IOParameter[] {
        return this.inParameters;
    }

    setInParameters(inParameters: IOParameter[]): void {
        this.inParameters = inParameters;
    }

    getOutParameters(): IOParameter[] {
        return this.outParameters;
    }

    setOutParameters(outParameters: IOParameter[]): void {
        this.outParameters = outParameters;
    }

    setValues(otherEvent: Event): void {
        super.setValues(otherEvent);

        this.eventDefinitions = [];
        if (otherEvent.getEventDefinitions() != null && otherEvent.getEventDefinitions().length > 0) {
            for (const eventDef of otherEvent.getEventDefinitions()) {
                this.eventDefinitions.push(eventDef.clone());
            }
        }

        this.inParameters = [];
        if (otherEvent.getInParameters() != null && otherEvent.getInParameters().length > 0) {
            for (const parameter of otherEvent.getInParameters()) {
                this.inParameters.push(parameter.clone());
            }
        }

        this.outParameters = [];
        if (otherEvent.getOutParameters() != null && otherEvent.getOutParameters().length > 0) {
            for (const parameter of otherEvent.getOutParameters()) {
                this.outParameters.push(parameter.clone());
            }
        }
    }
}