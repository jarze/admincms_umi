import { BaseElement } from './BaseElement';
import { FlowableListener } from './FlowableListener';
import { FlowElementsContainer } from './FlowElementsContainer';
import { SubProcess } from './SubProcess';

export abstract class FlowElement extends BaseElement {
    name: string;
    documentation: string;
    executionListeners: FlowableListener[];
    parentContainer: FlowElementsContainer;

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getDocumentation(): string {
        return this.documentation;
    }

    setDocumentation(documentation: string): void {
        this.documentation = documentation;
    }

    getExecutionListeners(): FlowableListener[] {
        return this.executionListeners;
    }

    setExecutionListeners(executionListeners: FlowableListener[]): void {
        this.executionListeners = executionListeners;
    }

    getParentContainer(): FlowElementsContainer {
        return this.parentContainer;
    }

    getSubProcess(): SubProcess {
        let subProcess: SubProcess = null;
        if (this.parentContainer instanceof SubProcess) {
            subProcess = this.parentContainer;
        }
        return subProcess;
    }

    setParentContainer(parentContainer: FlowElementsContainer): void {
        this.parentContainer = parentContainer;
    }

    abstract clone(): FlowElement;

    setValues(otherElement: FlowElement): void {
        super.setValues(otherElement);
        this.setName(otherElement.getName());
        this.setDocumentation(otherElement.getDocumentation());

        this.executionListeners = [];
        if (otherElement.getExecutionListeners() != null && otherElement.getExecutionListeners().length > 0) {
            for (const listener of otherElement.getExecutionListeners()) {
                this.executionListeners.push(listener.clone());
            }
        }
    }
}