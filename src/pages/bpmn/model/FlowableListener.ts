import { BaseElement } from './BaseElement';
import { FieldExtension } from './FieldExtension';
import { HasScriptInfo } from './HasScriptInfo';
import { ScriptInfo } from './ScriptInfo';

export class FlowableListener extends BaseElement implements HasScriptInfo {
    event: string;
    implementationType: string;
    implementation: string;
    fieldExtensions: FieldExtension[];
    onTransaction: string;
    customPropertiesResolverImplementationType: string;
    customPropertiesResolverImplementation: string;
    instance: any;
    scriptInfo: ScriptInfo;

    constructor() {
        super();
        // Always generate a random identifier to look up the listener while executing the logic
        this.id = Math.random().toString(36).substring(2);
    }

    getEvent(): string {
        return this.event;
    }

    setEvent(event: string): void {
        this.event = event;
    }

    getImplementationType(): string {
        return this.implementationType;
    }

    setImplementationType(implementationType: string): void {
        this.implementationType = implementationType;
    }

    getImplementation(): string {
        return this.implementation;
    }

    setImplementation(implementation: string): void {
        this.implementation = implementation;
    }

    getFieldExtensions(): FieldExtension[] {
        return this.fieldExtensions;
    }

    setFieldExtensions(fieldExtensions: FieldExtension[]): void {
        this.fieldExtensions = fieldExtensions;
    }

    getOnTransaction(): string {
        return this.onTransaction;
    }

    setOnTransaction(onTransaction: string): void {
        this.onTransaction = onTransaction;
    }

    getCustomPropertiesResolverImplementationType(): string {
        return this.customPropertiesResolverImplementationType;
    }

    setCustomPropertiesResolverImplementationType(customPropertiesResolverImplementationType: string): void {
        this.customPropertiesResolverImplementationType = customPropertiesResolverImplementationType;
    }

    getCustomPropertiesResolverImplementation(): string {
        return this.customPropertiesResolverImplementation;
    }

    setCustomPropertiesResolverImplementation(customPropertiesResolverImplementation: string): void {
        this.customPropertiesResolverImplementation = customPropertiesResolverImplementation;
    }

    getInstance(): any {
        return this.instance;
    }

    setInstance(instance: any): void {
        this.instance = instance;
    }

    /**
     * Return the script info, if present.
     * <p>
     * ScriptInfo must be populated, when {@code <executionListener type="script" ...>} e.g. when
     * implementationType is 'script'.
     * </p>
     */
    getScriptInfo(): ScriptInfo {
        return this.scriptInfo;
    }

    /**
     * Sets the script info
     *
     * @see #getScriptInfo()
     */
    setScriptInfo(scriptInfo: ScriptInfo): void {
        this.scriptInfo = scriptInfo;
    }

    clone(): FlowableListener {
        const clone = new FlowableListener();
        clone.setValues(this);
        return clone;
    }

    setValues(otherListener: FlowableListener): void {
        super.setValues(otherListener);
        this.setEvent(otherListener.getEvent());
        this.setImplementation(otherListener.getImplementation());
        this.setImplementationType(otherListener.getImplementationType());
        if (otherListener.getScriptInfo() != null) {
            this.setScriptInfo(otherListener.getScriptInfo().clone());
        }
        this.fieldExtensions = [];
        if (otherListener.getFieldExtensions() != null && otherListener.getFieldExtensions().length > 0) {
            for (const extension of otherListener.getFieldExtensions()) {
                this.fieldExtensions.push(extension.clone());
            }
        }

        this.setOnTransaction(otherListener.getOnTransaction());
        this.setCustomPropertiesResolverImplementationType(otherListener.getCustomPropertiesResolverImplementationType());
        this.setCustomPropertiesResolverImplementation(otherListener.getCustomPropertiesResolverImplementation());
    }
}