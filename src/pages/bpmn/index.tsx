import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'antd'
// import xml from './测试多表单流程-44.bpmn20.xml'
import BpmnJS from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler'
import ModelUtil from 'bpmn-js/lib/util/ModelUtil'
// import BpmnModdle from 'bpmn-moddle';
import { ModdleElement } from 'bpmn-js/lib/model/Types'
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule
//   // CamundaPlatformPropertiesProviderModule
// } from 'bpmn-js-properties-panel'
// import xml from './example.xml'
// import propertiesPanelModule from 'bpmn-js-properties-panel'
// import BF from 'bpmn-js-properties-panel-flowable'

// import { ModdleElement } from 'bpmn-js/lib/model/Types';
import styles from './index.less'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
// import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import { get } from 'lodash'
import '@bpmn-io/properties-panel/assets/properties-panel.css' // 右边工具栏样式

// import propertiesPanelModule from 'bpmn-js-properties-panel';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

// const xml = require('./测试多表单流程-44.bpmn20.xml')

let xmlString = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
  <process id="form-demo-4" name="测试多表单流程-44" isExecutable="true">
    <documentation>ewfwef</documentation>
    <startEvent id="start" name="开始" flowable:formKey="start" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="new_property_1" name="AA" type="string" required="true"></flowable:formProperty>
        <flowable:formProperty id="new_property_2" name="BB" type="long"></flowable:formProperty>
        <flowable:formProperty id="new_property_3" name="CC" type="boolean"></flowable:formProperty>
        <flowable:formProperty id="new_property_4" name="DD" type="enum" required="true">
          <flowable:value id="v1" name="Value 1"></flowable:value>
          <flowable:value id="v2" name="Value 2"></flowable:value>
        </flowable:formProperty>
        <flowable:formProperty id="start_date" name="开始时间" type="date" expression="a+b" variable="new" default="2023-01-01" datePattern="MM-dd-yyyy hh:mm" required="true"></flowable:formProperty>
        <flowable:formProperty id="approval_a" name="审核人2" type="string" required="true"></flowable:formProperty>
      </extensionElements>
    </startEvent>
    <userTask id="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D" name="审核1" flowable:assignee="$INITIATOR" flowable:formFieldValidation="true">
      <documentation>描述审核1</documentation>
      <extensionElements>
        <flowable:formProperty id="a_new_property_1" name="A" type="string" required="true"></flowable:formProperty>
        <flowable:formProperty id="b_new_property_2" name="B" type="string" required="true"></flowable:formProperty>
        <modeler:activiti-idm-initiator xmlns:modeler="http://flowable.org/modeler"><![CDATA[true]]></modeler:activiti-idm-initiator>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-06B4737A-AD24-4510-91B8-CC47AAD974E7" sourceRef="start" targetRef="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D"></sequenceFlow>
    <userTask id="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5" name="审核2" flowable:assignee="\${approval_a}" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="3_new_property_1" name="RR" type="string" required="true"></flowable:formProperty>
        <modeler:initiator-can-complete xmlns:modeler="http://flowable.org/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58" sourceRef="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D" targetRef="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5"></sequenceFlow>
    <userTask id="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32" name="审核3" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="check" name="同意与否" type="boolean" default="true" required="true"></flowable:formProperty>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9" sourceRef="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5" targetRef="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32"></sequenceFlow>
    <endEvent id="sid-9387E205-7914-41B4-8011-23480B6EA44A" name="结束"></endEvent>
    <exclusiveGateway id="sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866"></exclusiveGateway>
    <sequenceFlow id="sid-3FB7A9B3-E59F-4AE4-B726-4C0D41C96EB4" sourceRef="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32" targetRef="sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866"></sequenceFlow>
    <userTask id="sid-9E1755EB-CD11-49BB-A295-4BB59E82ADBC" name="审核5
" flowable:formFieldValidation="true"></userTask>
    <userTask id="sid-CDFAAAD6-7EB4-4731-AE5F-3CB44ED04DAD" name="审核4" flowable:formFieldValidation="true"></userTask>
    <sequenceFlow id="sid-156399B8-AEB3-4E77-A657-C17A42E9C674" sourceRef="sid-9E1755EB-CD11-49BB-A295-4BB59E82ADBC" targetRef="sid-9387E205-7914-41B4-8011-23480B6EA44A"></sequenceFlow>
    <userTask id="sid-ED431E0B-E32A-4D1C-9711-5C7232EA919C" name="审核6" flowable:formFieldValidation="true"></userTask>
    <sequenceFlow id="sid-16CE0144-EE30-44BE-ABD2-20EC408D3983" name="不同意" sourceRef="sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866" targetRef="sid-9E1755EB-CD11-49BB-A295-4BB59E82ADBC">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[\${!check}]]></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="sid-FB462828-4A7B-4998-ACC7-0EAE86CE0CE0" sourceRef="sid-ED431E0B-E32A-4D1C-9711-5C7232EA919C" targetRef="sid-9387E205-7914-41B4-8011-23480B6EA44A"></sequenceFlow>
    <sequenceFlow id="sid-DA7535EE-687C-4267-9112-EE5FCCB963D2" sourceRef="sid-CDFAAAD6-7EB4-4731-AE5F-3CB44ED04DAD" targetRef="sid-ED431E0B-E32A-4D1C-9711-5C7232EA919C"></sequenceFlow>
    <sequenceFlow id="sid-0D80DD15-1C6D-467C-A123-388DCF5F2EB0" name="同意" sourceRef="sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866" targetRef="sid-CDFAAAD6-7EB4-4731-AE5F-3CB44ED04DAD">
      <conditionExpression xsi:type="tFormalExpression"><![CDATA[\${check}]]></conditionExpression>
    </sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_form-demo-4">
    <bpmndi:BPMNPlane bpmnElement="form-demo-4" id="BPMNPlane_form-demo-4">
      <bpmndi:BPMNShape bpmnElement="start" id="BPMNShape_start">
        <omgdc:Bounds height="30.0" width="30.0" x="100.0" y="163.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D" id="BPMNShape_sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D">
        <omgdc:Bounds height="80.0" width="100.0" x="175.0" y="138.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5" id="BPMNShape_sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5">
        <omgdc:Bounds height="80.0" width="100.0" x="345.0" y="138.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32" id="BPMNShape_sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32">
        <omgdc:Bounds height="80.0" width="100.0" x="495.0" y="138.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-9387E205-7914-41B4-8011-23480B6EA44A" id="BPMNShape_sid-9387E205-7914-41B4-8011-23480B6EA44A">
        <omgdc:Bounds height="28.0" width="28.0" x="1050.0" y="210.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866" id="BPMNShape_sid-0A5E8C44-1DCE-45DE-A1ED-2BD6985EF866">
        <omgdc:Bounds height="40.0" width="40.0" x="640.0" y="195.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-9E1755EB-CD11-49BB-A295-4BB59E82ADBC" id="BPMNShape_sid-9E1755EB-CD11-49BB-A295-4BB59E82ADBC">
        <omgdc:Bounds height="80.0" width="100.0" x="810.0" y="175.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-CDFAAAD6-7EB4-4731-AE5F-3CB44ED04DAD" id="BPMNShape_sid-CDFAAAD6-7EB4-4731-AE5F-3CB44ED04DAD">
        <omgdc:Bounds height="80.0" width="100.0" x="610.0" y="315.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="sid-ED431E0B-E32A-4D1C-9711-5C7232EA919C" id="BPMNShape_sid-ED431E0B-E32A-4D1C-9711-5C7232EA919C">
        <omgdc:Bounds height="80.0" width="100.0" x="870.0" y="315.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-156399B8-AEB3-4E77-A657-C17A42E9C674" id="BPMNEdge_sid-156399B8-AEB3-4E77-A657-C17A42E9C674">
        <omgdi:waypoint x="909.9499999999999" y="217.20367647058825"></omgdi:waypoint>
        <omgdi:waypoint x="1050.0114979370596" y="223.38294213086374"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-FB462828-4A7B-4998-ACC7-0EAE86CE0CE0" id="BPMNEdge_sid-FB462828-4A7B-4998-ACC7-0EAE86CE0CE0">
        <omgdi:waypoint x="963.9145038167939" y="315.0"></omgdi:waypoint>
        <omgdi:waypoint x="1053.6440220819711" y="233.3874165906166"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58" id="BPMNEdge_sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58">
        <omgdi:waypoint x="274.9499999999303" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="344.99999999993565" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-0D80DD15-1C6D-467C-A123-388DCF5F2EB0" id="BPMNEdge_sid-0D80DD15-1C6D-467C-A123-388DCF5F2EB0">
        <omgdi:waypoint x="660.431654676259" y="234.51130481667872"></omgdi:waypoint>
        <omgdi:waypoint x="660.1431899641577" y="315.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-DA7535EE-687C-4267-9112-EE5FCCB963D2" id="BPMNEdge_sid-DA7535EE-687C-4267-9112-EE5FCCB963D2">
        <omgdi:waypoint x="709.9499999997429" y="355.0"></omgdi:waypoint>
        <omgdi:waypoint x="869.999999999883" y="355.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-16CE0144-EE30-44BE-ABD2-20EC408D3983" id="BPMNEdge_sid-16CE0144-EE30-44BE-ABD2-20EC408D3983">
        <omgdi:waypoint x="679.4928302360529" y="215.45226130653268"></omgdi:waypoint>
        <omgdi:waypoint x="810.0" y="215.1251879699248"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-3FB7A9B3-E59F-4AE4-B726-4C0D41C96EB4" id="BPMNEdge_sid-3FB7A9B3-E59F-4AE4-B726-4C0D41C96EB4">
        <omgdi:waypoint x="594.95" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="617.5" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="617.5" y="215.5"></omgdi:waypoint>
        <omgdi:waypoint x="640.5" y="215.5"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9" id="BPMNEdge_sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9">
        <omgdi:waypoint x="444.9499999999581" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="494.99999999993634" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-06B4737A-AD24-4510-91B8-CC47AAD974E7" id="BPMNEdge_sid-06B4737A-AD24-4510-91B8-CC47AAD974E7">
        <omgdi:waypoint x="129.9499984899576" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="174.9999999999917" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>

`
// try {
//   xmlString = atob(xml?.split('base64,')?.[1])
// } catch (error) {}

export default function Bpmn(params) {
  const modelerRef = useRef<Modeler>()
  const [eleId, setEleId] = useState<string>()

  useEffect(() => {
    const modeler = new Modeler({
      container: '#bpmn',
      keyboard: {
        bindTo: window
      },
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [
        // BF
        // BpmnPropertiesPanelModule,
        // BpmnPropertiesProviderModule
        // CamundaPlatformPropertiesProviderModule
      ]
      // moddleExtensions: {
      //   camunda: camundaModdleDescriptor,
      // },
      // additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule],
    })
    modelerRef.current = modeler
    modeler
      .importXML(xmlString)
      .then(res => {
        // modeler.get('canvas').zoom('fit-viewport');

        console.log('rendered', res)
        // Get the active selection
        // const selection = modeler.get('selection');
        // // Get the properties panel
        // const propertiesPanel = modeler.get('propertiesPanel');
        // // Attach the properties panel to the active selection
        // propertiesPanel.attachTo(selection);
        // // access viewer components
        // var canvas = viewer.get('canvas');
        // var overlays = viewer.get('overlays');

        // zoom to fit full viewport
        // canvas.zoom('fit-viewport');

        // // attach an overlay to a node
        // overlays.add('SCAN_OK', 'note', {
        //   position: {
        //     bottom: 0,
        //     right: 0,
        //   },
        //   html: '<div class="diagram-note">Mixed up the labels?</div>',
        // });

        // // add marker
        // canvas.addMarker('SCAN_OK', 'needs-discussion');
      })
      .catch(err => {
        console.log('error rendering', err)
      })
    // const moddle = new BpmnModdle();
    // moddle.fromXML(xml).then(res => {
    //   console.log(res, '=====');
    // });
    return () => {}
  }, [])

  useEffect(() => {
    const modeler = modelerRef.current
    modeler.on('element.click', function(event) {
      // const ele: ModdleElement = event.element.di.bpmnElement;
      // const a= model.get(event.element.id)
      const ele: ModdleElement = get(event, 'element.di.bpmnElement')
      // setModelElement(ele)
      setEleId(ele.id)
      // const values = get(event, 'element.di.bpmnElement.extensionElements.values')
      // console.log(event, modeler, values)
    })

    modeler.on('commandStack.changed', () => {
      // user modeled something or
      // performed an undo/redo operation
    })

    modeler.on('element.changed', (event: any) => {
      const element = event.element

      // the element was changed by the user
    })

    // var events = [
    //   'element.hover',
    //   'element.out',
    //   'element.click',
    //   'element.dblclick',
    //   'element.mousedown',
    //   'element.mouseup',
    // ];

    // var eventBus = modeler.get('eventBus');
    // // you may hook into any of the following events
    // var events = [
    //   'element.hover',
    //   'element.out',
    //   'element.click',
    //   'element.dblclick',
    //   'element.mousedown',
    //   'element.mouseup',
    // ];

    // events.forEach(function (event) {
    //   eventBus.on(event, function (e) {
    //     // e.element = the model element
    //     // e.gfx = the graphical element
    //     console.log(event, 'on', e.element.id);
    //   });
    // });

    return () => {}
  }, [modelerRef.current])

  const exportHandler = async () => {
    if (!modelerRef.current) return
    try {
      var result = await modelerRef.current.saveXML({ format: true })

      alert('Diagram exported. Check the developer tools!')

      console.log('DIAGRAM', result.xml)
    } catch (err) {
      console.error('could not save BPMN 2.0 diagram', err)
    }
  }

  // const onSelectItem = () => {
  //   const model = modelerRef.current;
  //   const elementId = 'my-element-id';
  //   const element = model.getElement(elementId);
  //   const extensionElements = element.extensionElements as ExtensionElements;

  //   // Get the child elements of the extension elements
  //   const childElements = extensionElements.elements;
  //   for (const childElement of childElements) {
  //     // Do something with the child element
  //   }
  // };

  const update = () => {
    // // 节点名称的更新
    // const modeling = this.modeler.get('modeling')
    // modeling.updateLabel(this.element, name)
    // // 自定义节点属性的存储
    // const modeling = this.modeler.get('modeling')
    // modeling.setColor(this.element, {
    //   fill: null,
    //   stroke: color
    // })
    // modeling.updateProperties(this.element, { color: color })
  }

  return (
    <div>
      <div>
        <Button type="primary" onClick={exportHandler}>
          导出
        </Button>
      </div>
      <br />
      <div id="bpmn" className={styles.wrapper} />
      <div id="properties-panel">
        <ul>
          {/* {modelerRef.current.getModules()} */}
          {/* {modelElement &&
            get(
              ModelUtil.getBusinessObject(modelElement),
              'di.bpmnElement.extensionElements.values'
            )?.map?.(i => <li>{i.name}</li>)} */}
        </ul>
      </div>
    </div>
  )
}
