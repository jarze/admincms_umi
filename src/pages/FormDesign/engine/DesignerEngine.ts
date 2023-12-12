import type { IDesignerEngine} from './type'

export class DesignerEngine implements IDesignerEngine {
	private plugins: any[]
	private actions: any[]

  // constructor() {
  //   this.store = null
  //   this.dragTransferElementId = 'drag_transfer_element_id'
  // }
  // static getInstance() {
  //   if (!DesignerEngine.instance) {
  //     DesignerEngine.instance = new DesignerEngine()
  //   }
  //   return DesignerEngine.instance
  // }
  // setStore(store) {
  //   this.store = store
  // }
  // getStore() {
  //   return this.store
  // }
  // getDragTransferElementId() {
  //   return this.dragTransferElementId
  // }
  // setDragTransferElementId(id) {
  //   this.dragTransferElementId = id
  // }
}
