import { BaseElement } from './BaseElement'

export class ExtensionElement extends BaseElement {
  name: string
  namespacePrefix: string
  namespace: string
  elementText: string
  childElements: Map<string, ExtensionElement[]>

  constructor() {
    super()
    this.childElements = new Map<string, ExtensionElement[]>()
  }

  getElementText(): string {
    return this.elementText
  }

  setElementText(elementText: string): void {
    this.elementText = elementText
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getNamespacePrefix(): string {
    return this.namespacePrefix
  }

  setNamespacePrefix(namespacePrefix: string): void {
    this.namespacePrefix = namespacePrefix
  }

  getNamespace(): string {
    return this.namespace
  }

  setNamespace(namespace: string): void {
    this.namespace = namespace
  }

  getChildElements(): Map<string, ExtensionElement[]> {
    return this.childElements
  }

  addChildElement(childElement: ExtensionElement): void {
    if (
      childElement != null &&
      childElement.getName() != null &&
      childElement.getName().trim().length > 0
    ) {
      let elementList: ExtensionElement[] = this.childElements.get(childElement.getName())
      if (elementList == null) {
        elementList = []
        this.childElements.set(childElement.getName(), elementList)
      }
      elementList.push(childElement)
    }
  }

  setChildElements(childElements: Map<string, ExtensionElement[]>): void {
    this.childElements = childElements
  }

  clone(): ExtensionElement {
    const clone = new ExtensionElement()
    clone.setValues(this)
    return clone
  }

  setValues(otherElement: ExtensionElement): void {
    super.setValues(otherElement)
    this.setName(otherElement.getName())
    this.setNamespacePrefix(otherElement.getNamespacePrefix())
    this.setNamespace(otherElement.getNamespace())
    this.setElementText(otherElement.getElementText())

    this.childElements = new Map<string, ExtensionElement[]>()
    if (otherElement.getChildElements() != null && otherElement.getChildElements().size > 0) {
      for (const [key, otherElementList] of otherElement.getChildElements()) {
        if (otherElementList != null && otherElementList.length > 0) {
          const elementList: ExtensionElement[] = []
          for (const extensionElement of otherElementList) {
            elementList.push(extensionElement.clone())
          }
          this.childElements.set(key, elementList)
        }
      }
    }
  }
}
