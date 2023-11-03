import { BaseElement } from './BaseElement';

export class Assignment extends BaseElement {
    from: string;
    to: string;

    getFrom(): string {
        return this.from;
    }

    setFrom(from: string): void {
        this.from = from;
    }

    getTo(): string {
        return this.to;
    }

    setTo(to: string): void {
        this.to = to;
    }

    clone(): Assignment {
        const clone = new Assignment();
        clone.setValues(this);
        return clone;
    }

    setValues(otherAssignment: Assignment): void {
        super.setValues(otherAssignment);
        this.setFrom(otherAssignment.getFrom());
        this.setTo(otherAssignment.getTo());
    }
}