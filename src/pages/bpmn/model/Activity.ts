import { FlowNode } from './FlowNode';
import { MultiInstanceLoopCharacteristics } from './MultiInstanceLoopCharacteristics';
import { IOSpecification } from './IOSpecification';
import { DataAssociation } from './DataAssociation';
import { BoundaryEvent } from './BoundaryEvent';
import { MapExceptionEntry } from './MapExceptionEntry';

export abstract class Activity extends FlowNode {
    defaultFlow: string;
    forCompensation: boolean;
    loopCharacteristics: MultiInstanceLoopCharacteristics;
    ioSpecification: IOSpecification;
    dataInputAssociations: DataAssociation[];
    dataOutputAssociations: DataAssociation[];
    boundaryEvents: BoundaryEvent[];
    failedJobRetryTimeCycleValue: string;
    mapExceptions: MapExceptionEntry[];

    getFailedJobRetryTimeCycleValue(): string {
        return this.failedJobRetryTimeCycleValue;
    }

    setFailedJobRetryTimeCycleValue(failedJobRetryTimeCycleValue: string): void {
        this.failedJobRetryTimeCycleValue = failedJobRetryTimeCycleValue;
    }

    isForCompensation(): boolean {
        return this.forCompensation;
    }

    setForCompensation(forCompensation: boolean): void {
        this.forCompensation = forCompensation;
    }

    getBoundaryEvents(): BoundaryEvent[] {
        return this.boundaryEvents;
    }

    setBoundaryEvents(boundaryEvents: BoundaryEvent[]): void {
        this.boundaryEvents = boundaryEvents;
    }

    getDefaultFlow(): string {
        return this.defaultFlow;
    }

    setDefaultFlow(defaultFlow: string): void {
        this.defaultFlow = defaultFlow;
    }

    getLoopCharacteristics(): MultiInstanceLoopCharacteristics {
        return this.loopCharacteristics;
    }

    setLoopCharacteristics(loopCharacteristics: MultiInstanceLoopCharacteristics): void {
        this.loopCharacteristics = loopCharacteristics;
    }

    hasMultiInstanceLoopCharacteristics(): boolean {
        return this.getLoopCharacteristics() != null;
    }

    getIoSpecification(): IOSpecification {
        return this.ioSpecification;
    }

    setIoSpecification(ioSpecification: IOSpecification): void {
        this.ioSpecification = ioSpecification;
    }

    getDataInputAssociations(): DataAssociation[] {
        return this.dataInputAssociations;
    }

    setDataInputAssociations(dataInputAssociations: DataAssociation[]): void {
        this.dataInputAssociations = dataInputAssociations;
    }

    getDataOutputAssociations(): DataAssociation[] {
        return this.dataOutputAssociations;
    }

    setDataOutputAssociations(dataOutputAssociations: DataAssociation[]): void {
        this.dataOutputAssociations = dataOutputAssociations;
    }

    getMapExceptions(): MapExceptionEntry[] {
        return this.mapExceptions;
    }

    setMapExceptions(mapExceptions: MapExceptionEntry[]): void {
        this.mapExceptions = mapExceptions;
    }

    setValues(otherActivity: Activity): void {
        super.setValues(otherActivity);
        this.setFailedJobRetryTimeCycleValue(otherActivity.getFailedJobRetryTimeCycleValue());
        this.setDefaultFlow(otherActivity.getDefaultFlow());
        this.setForCompensation(otherActivity.isForCompensation());
        if (otherActivity.getLoopCharacteristics() != null) {
            this.setLoopCharacteristics(otherActivity.getLoopCharacteristics().clone());
        }
        if (otherActivity.getIoSpecification() != null) {
            this.setIoSpecification(otherActivity.getIoSpecification().clone());
        }

        this.dataInputAssociations = [];
        if (otherActivity.getDataInputAssociations() != null && !otherActivity.getDataInputAssociations().isEmpty()) {
            for (const association of otherActivity.getDataInputAssociations()) {
                this.dataInputAssociations.push(association.clone());
            }
        }

        this.dataOutputAssociations = [];
        if (otherActivity.getDataOutputAssociations() != null && !otherActivity.getDataOutputAssociations().isEmpty()) {
            for (const association of otherActivity.getDataOutputAssociations()) {
                this.dataOutputAssociations.push(association.clone());
            }
        }

        this.boundaryEvents = [];
        this.boundaryEvents.push(...otherActivity.getBoundaryEvents());
    }
}