import { Activity } from './Activity';
import { Event } from './Event';

export class BoundaryEvent extends Event {
    attachedToRef: Activity;
    attachedToRefId: string;
    cancelActivity: boolean = true;

    getAttachedToRef(): Activity {
        return this.attachedToRef;
    }

    setAttachedToRef(attachedToRef: Activity): void {
        this.attachedToRef = attachedToRef;
    }

    getAttachedToRefId(): string {
        return this.attachedToRefId;
    }

    setAttachedToRefId(attachedToRefId: string): void {
        this.attachedToRefId = attachedToRefId;
    }

    isCancelActivity(): boolean {
        return this.cancelActivity;
    }

    setCancelActivity(cancelActivity: boolean): void {
        this.cancelActivity = cancelActivity;
    }

    clone(): BoundaryEvent {
        const clone = new BoundaryEvent();
        clone.setValues(this);
        return clone;
    }

    setValues(otherEvent: BoundaryEvent): void {
        super.setValues(otherEvent);
        this.setAttachedToRefId(otherEvent.getAttachedToRefId());
        this.setAttachedToRef(otherEvent.getAttachedToRef());
        this.setCancelActivity(otherEvent.isCancelActivity());
    }
}