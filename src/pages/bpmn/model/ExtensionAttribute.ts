export class ExtensionAttribute {
    name: string;
    value: string;
    namespacePrefix: string;
    namespace: string;

    constructor(name?: string, value?: string) {
        this.name = name;
        this.value = value;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    getNamespacePrefix(): string {
        return this.namespacePrefix;
    }

    setNamespacePrefix(namespacePrefix: string): void {
        this.namespacePrefix = namespacePrefix;
    }

    getNamespace(): string {
        return this.namespace;
    }

    setNamespace(namespace: string): void {
        this.namespace = namespace;
    }

    toString(): string {
        let sb = '';
        if (this.namespacePrefix != null) {
            sb += this.namespacePrefix;
            if (this.name != null) {
                sb += ':' + this.name;
            }
        } else {
            sb += this.name;
        }
        if (this.value != null) {
            sb += '=' + this.value;
        }
        return sb;
    }

    clone(): ExtensionAttribute {
        const clone = new ExtensionAttribute();
        clone.setValues(this);
        return clone;
    }

    setValues(otherAttribute: ExtensionAttribute): void {
        this.setName(otherAttribute.getName());
        this.setValue(otherAttribute.getValue());
        this.setNamespacePrefix(otherAttribute.getNamespacePrefix());
        this.setNamespace(otherAttribute.getNamespace());
    }
}