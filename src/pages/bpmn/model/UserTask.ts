interface FormProperty {
  id: string
  name: string
  type: string
  value: string
  readable: boolean
  writable: boolean
  required: boolean
  datePattern: string
  enumValues: string[]
}

interface FlowableListener {
  event: string
  implementationType: string
  implementation: string
}

interface CustomProperty {
  name: string
  value: string
}

interface UserTask extends Task {
  assignee: string
  owner: string
  priority: string
  formKey: string
  sameDeployment: boolean
  dueDate: string
  businessCalendarName: string
  category: string
  extensionId: string
  candidateUsers: string[]
  candidateGroups: string[]
  formProperties: FormProperty[]
  taskListeners: FlowableListener[]
  skipExpression: string
  validateFormFields: string
  taskIdVariableName: string
  customUserIdentityLinks: { [type: string]: Set<string> }
  customGroupIdentityLinks: { [type: string]: Set<string> }
  customProperties: CustomProperty[]
}

class UserTaskImpl implements UserTask {
  id: string
  name: string
  documentation: string
  async: boolean
  incoming: SequenceFlow[]
  outgoing: SequenceFlow[]
  boundaryEvents: BoundaryEvent[]
  subProcess: SubProcess
  executionListeners: FlowableListener[]
  candidateStarterUsers: string[]
  candidateStarterGroups: string[]

  assignee: string
  owner: string
  priority: string
  formKey: string
  sameDeployment: boolean
  dueDate: string
  businessCalendarName: string
  category: string
  extensionId: string
  candidateUsers: string[]
  candidateGroups: string[]
  formProperties: FormProperty[]
  taskListeners: FlowableListener[]
  skipExpression: string
  validateFormFields: string
  taskIdVariableName: string
  customUserIdentityLinks: { [type: string]: Set<string> }
  customGroupIdentityLinks: { [type: string]: Set<string> }
  customProperties: CustomProperty[]

  clone(): UserTask {
    const clone = new UserTaskImpl()
    clone.setValues(this)
    return clone
  }

  setValues(otherElement: UserTask): void {
    this.id = otherElement.id
    this.name = otherElement.name
    this.documentation = otherElement.documentation
    this.async = otherElement.async
    this.incoming = otherElement.incoming
    this.outgoing = otherElement.outgoing
    this.boundaryEvents = otherElement.boundaryEvents
    this.subProcess = otherElement.subProcess
    this.executionListeners = otherElement.executionListeners
    this.candidateStarterUsers = otherElement.candidateStarterUsers
    this.candidateStarterGroups = otherElement.candidateStarterGroups

    this.assignee = otherElement.assignee
    this.owner = otherElement.owner
    this.formKey = otherElement.formKey
    this.sameDeployment = otherElement.sameDeployment
    this.dueDate = otherElement.dueDate
    this.priority = otherElement.priority
    this.category = otherElement.category
    this.taskIdVariableName = otherElement.taskIdVariableName
    this.extensionId = otherElement.extensionId
    this.skipExpression = otherElement.skipExpression
    this.validateFormFields = otherElement.validateFormFields

    this.candidateGroups = [...otherElement.candidateGroups]
    this.candidateUsers = [...otherElement.candidateUsers]

    this.customGroupIdentityLinks = { ...otherElement.customGroupIdentityLinks }
    this.customUserIdentityLinks = { ...otherElement.customUserIdentityLinks }

    this.formProperties = []
    if (otherElement.formProperties != null && otherElement.formProperties.length > 0) {
      for (const property of otherElement.formProperties) {
        this.formProperties.push({ ...property })
      }
    }

    this.taskListeners = []
    if (otherElement.taskListeners != null && otherElement.taskListeners.length > 0) {
      for (const listener of otherElement.taskListeners) {
        this.taskListeners.push({ ...listener })
      }
    }

    this.customProperties = []
    if (otherElement.customProperties != null && otherElement.customProperties.length > 0) {
      for (const property of otherElement.customProperties) {
        this.customProperties.push({ ...property })
      }
    }
  }
}
