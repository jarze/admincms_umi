import { ExtensionAttribute } from './ExtensionAttribute';
import { ExtensionElement } from './ExtensionElement';
import { HasExtensionAttributes } from './HasExtensionAttributes';

export abstract class BaseElement implements HasExtensionAttributes {
    id: string;
    xmlRowNumber: number;
    xmlColumnNumber: number;
    extensionElements: Map<string, ExtensionElement[]> = new Map();
    attributes: Map<string, ExtensionAttribute[]> = new Map();

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getXmlRowNumber(): number {
        return this.xmlRowNumber;
    }

    setXmlRowNumber(xmlRowNumber: number): void {
        this.xmlRowNumber = xmlRowNumber;
    }

    getXmlColumnNumber(): number {
        return this.xmlColumnNumber;
    }

    setXmlColumnNumber(xmlColumnNumber: number): void {
        this.xmlColumnNumber = xmlColumnNumber;
    }

    getExtensionElements(): Map<string, ExtensionElement[]> {
        return this.extensionElements;
    }

    addExtensionElement(extensionElement: ExtensionElement): void {
        if (extensionElement != null && extensionElement.getName() != null) {
            let elementList = this.extensionElements.get(extensionElement.getName());
            if (elementList == null) {
                elementList = [];
                this.extensionElements.set(extensionElement.getName(), elementList);
            }
            elementList.push(extensionElement);
        }
    }

    setExtensionElements(extensionElements: Map<string, ExtensionElement[]>): void {
        this.extensionElements = extensionElements;
    }

    getAttributes(): Map<string, ExtensionAttribute[]> {
        return this.attributes;
    }

    getAttributeValue(namespace: string, name: string): string {
        const attributes = this.attributes.get(name);
        if (attributes != null && attributes.length > 0) {
            for (const attribute of attributes) {
                if ((namespace == null && attribute.getNamespace() == null) || namespace === attribute.getNamespace()) {
                    return attribute.getValue();
                }
            }
        }
        return null;
    }

    addAttribute(attribute: ExtensionAttribute): void {
        if (attribute != null && attribute.getName() != null) {
            let attributeList = this.attributes.get(attribute.getName());
            if (attributeList == null) {
                attributeList = [];
                this.attributes.set(attribute.getName(), attributeList);
            }
            attributeList.push(attribute);
        }
    }

    setAttributes(attributes: Map<string, ExtensionAttribute[]>): void {
        this.attributes = attributes;
    }

    setValues(otherElement: BaseElement): void {
        this.setId(otherElement.getId());

        this.extensionElements = new Map();
        if (otherElement.getExtensionElements() != null && otherElement.getExtensionElements().size > 0) {
            for (const [key, otherElementList] of otherElement.getExtensionElements()) {
                if (otherElementList != null && otherElementList.length > 0) {
                    const elementList = [];
                    for (const extensionElement of otherElementList) {
                        elementList.push(extensionElement.clone());
                    }
                    this.extensionElements.set(key, elementList);
                }
            }
        }

        this.attributes = new Map();
        if (otherElement.getAttributes() != null && otherElement.getAttributes().size > 0) {
            for (const [key, otherAttributeList] of otherElement.getAttributes()) {
                if (otherAttributeList != null && otherAttributeList.length > 0) {
                    const attributeList = [];
                    for (const extensionAttribute of otherAttributeList) {
                        attributeList.push(extensionAttribute.clone());
                    }
                    this.attributes.set(key, attributeList);
                }
            }
        }
    }

    abstract clone(): BaseElement;
}