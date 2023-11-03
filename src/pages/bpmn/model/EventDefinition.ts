import { BaseElement } from './BaseElement';

export abstract class EventDefinition extends BaseElement {
    abstract clone(): EventDefinition;
}