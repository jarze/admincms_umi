import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
// import BpmnJS from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler'
import { ModdleElement } from 'bpmn-js/lib/model/Types'
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
//   ZeebePropertiesProviderModule
//   // CamundaPlatformPropertiesProviderModule
// } from 'bpmn-js-properties-panel'
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  FlowablePropertiesProviderModule,
  FlowableDescriptors
  // CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel-fwa'
// use Camunda BPMN Moddle extension
// import CamundaExtensionModule from 'camunda-bpmn-moddle/lib'
// import camundaModdleDescriptors from 'camunda-bpmn-moddle/resources/camunda'
// import flowableDescriptors from './flowable.json'
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil'
// import { ModdleElement } from 'bpmn-js/lib/model/Types';
import styles from './index.less'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import '@bpmn-io/properties-panel/assets/properties-panel.css' // 右边工具栏样式
import { get } from 'lodash'
// import BF from 'bpmn-js-properties-panel-flowable'

import customTranslate from './customTranslate/customTranslate'
import magicPropertiesProviderModule from './provider/magic'
import magicModdleDescriptor from './provider/descriptors/magic.json'
import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'

var customTranslateModule = {
  translate: ['value', customTranslate]
}
let xmlString1 = `
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
let xmlString2 = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.8.0">
  <process id="bpmn-js-1" name="bpmn-1-网关" isExecutable="true">
    <documentation>流程引擎</documentation>
    <startEvent id="startEvent1" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="gateway_pt" name="排他网关" type="boolean" required="true" />
      </extensionElements>
      <outgoing>Flow_1swx6l9</outgoing>
    </startEvent>
    <exclusiveGateway id="sid-6184BF9C-EA9B-4C99-A09D-10FAF7D8D6BD" />
    <sequenceFlow id="sid-76497F35-F448-4065-9497-5FC8C701ED2C" sourceRef="startEvent1" targetRef="sid-6184BF9C-EA9B-4C99-A09D-10FAF7D8D6BD" />
    <userTask id="sid-80F194CD-F0A1-4FCE-AAD5-39332EBEF37F" name="A-true" flowable:formFieldValidation="true">
      <incoming>Flow_1swx6l9</incoming>
    </userTask>
    <userTask id="sid-49C8D3BB-0864-458F-A7C8-ACBFABE423E9" name="A-false" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="agree" name="意见" type="enum" required="true">
          <flowable:value id="true" name="同意" />
          <flowable:value id="false" name="不同意" />
        </flowable:formProperty>
        <flowable:formProperty id="remark" name="备注" type="string" required="true" />
      </extensionElements>
    </userTask>
    <parallelGateway id="sid-F80EF976-82C4-452F-A06A-A5755ED3EC81" />
    <sequenceFlow id="sid-0A05E5C9-76CE-409B-8963-ECF1F07CE4C2" sourceRef="sid-80F194CD-F0A1-4FCE-AAD5-39332EBEF37F" targetRef="sid-F80EF976-82C4-452F-A06A-A5755ED3EC81" />
    <userTask id="sid-59DD9F39-F11C-452D-B3A6-4D0830454832" name="B1" flowable:formFieldValidation="true" />
    <userTask id="sid-1B544E55-4ABE-4D5C-B1F3-3D1DBF6413FB" name="B2" flowable:formFieldValidation="true" />
    <userTask id="sid-52761798-ED8C-4A2B-AD86-068E6BF8DDD8" name="C&#10;" flowable:formFieldValidation="true" />
    <sequenceFlow id="sid-2469A06E-1FC2-4A09-91F0-7FC46AE3E4FB" sourceRef="sid-F80EF976-82C4-452F-A06A-A5755ED3EC81" targetRef="sid-59DD9F39-F11C-452D-B3A6-4D0830454832" />
    <sequenceFlow id="sid-67A3C5AE-20D8-4C2C-B159-EFEAA43D5AB6" sourceRef="sid-F80EF976-82C4-452F-A06A-A5755ED3EC81" targetRef="sid-1B544E55-4ABE-4D5C-B1F3-3D1DBF6413FB" />
    <sequenceFlow id="sid-62FF992E-7664-4831-B847-D70744C42AC1" sourceRef="sid-1B544E55-4ABE-4D5C-B1F3-3D1DBF6413FB" targetRef="sid-52761798-ED8C-4A2B-AD86-068E6BF8DDD8" />
    <parallelGateway id="sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA" />
    <sequenceFlow id="sid-7C6E530B-51B3-465F-8329-FBAA0B0F7035" sourceRef="sid-59DD9F39-F11C-452D-B3A6-4D0830454832" targetRef="sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA" />
    <sequenceFlow id="sid-CB7EF031-BE0B-4BBE-A745-434A68524A40" sourceRef="sid-52761798-ED8C-4A2B-AD86-068E6BF8DDD8" targetRef="sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA">
      <conditionExpression xsi:type="tFormalExpression">vcxfv</conditionExpression>
    </sequenceFlow>
    <endEvent id="sid-2352D487-5D86-4F6F-996B-B504DF55AC5F" />
    <endEvent id="sid-A2E11C47-FFA4-478C-B478-C62915BF790C">
      <terminateEventDefinition />
    </endEvent>
    <exclusiveGateway id="sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" />
    <sequenceFlow id="sid-91BCA9CE-0865-4084-A52C-BBA93732E0B4" sourceRef="sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA" targetRef="sid-2352D487-5D86-4F6F-996B-B504DF55AC5F" />
    <sequenceFlow id="sid-1B852736-217C-47DB-97BB-70A601AD2B46" sourceRef="sid-6184BF9C-EA9B-4C99-A09D-10FAF7D8D6BD" targetRef="sid-49C8D3BB-0864-458F-A7C8-ACBFABE423E9">
      <conditionExpression xsi:type="tFormalExpression">\${!gateway_pt}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="sid-702A7D1B-517B-45B8-8F82-78878E677D04" sourceRef="sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" targetRef="sid-A2E11C47-FFA4-478C-B478-C62915BF790C">
      <conditionExpression xsi:type="tFormalExpression">\${agree.equals("false")}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="sid-E7F94777-7234-4065-A678-6E7D0448AB07" sourceRef="sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" targetRef="sid-2352D487-5D86-4F6F-996B-B504DF55AC5F">
      <conditionExpression xsi:type="tFormalExpression">\${agree.equals("true")}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="id-2w32423" name="名称" sourceRef="sid-49C8D3BB-0864-458F-A7C8-ACBFABE423E9" targetRef="sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" skipExpression="跳过表达式">
      <documentation>描述信息</documentation>
      <extensionElements>
        <camunda:executionListener class="" event="take" />
      </extensionElements>
      <conditionExpression xsi:type="tFormalExpression" language=""></conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="Flow_1swx6l9" sourceRef="startEvent1" targetRef="sid-80F194CD-F0A1-4FCE-AAD5-39332EBEF37F" />
    <startEvent id="Event_1llitwl">
      <outgoing>Flow_1sqealh</outgoing>
      <conditionalEventDefinition id="ConditionalEventDefinition_1nfehsy" />
    </startEvent>
    <task id="Activity_1102isw">
      <incoming>Flow_1sqealh</incoming>
    </task>
    <sequenceFlow id="Flow_1sqealh" sourceRef="Event_1llitwl" targetRef="Activity_1102isw" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_bpmn-js-1">
    <bpmndi:BPMNPlane id="BPMNPlane_bpmn-js-1" bpmnElement="bpmn-js-1">
      <bpmndi:BPMNShape id="BPMNShape_startEvent1" bpmnElement="startEvent1">
        <omgdc:Bounds x="100" y="163" width="30" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-6184BF9C-EA9B-4C99-A09D-10FAF7D8D6BD" bpmnElement="sid-6184BF9C-EA9B-4C99-A09D-10FAF7D8D6BD" isMarkerVisible="true">
        <omgdc:Bounds x="195" y="158" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-80F194CD-F0A1-4FCE-AAD5-39332EBEF37F" bpmnElement="sid-80F194CD-F0A1-4FCE-AAD5-39332EBEF37F">
        <omgdc:Bounds x="280" y="45" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-49C8D3BB-0864-458F-A7C8-ACBFABE423E9" bpmnElement="sid-49C8D3BB-0864-458F-A7C8-ACBFABE423E9">
        <omgdc:Bounds x="285" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-F80EF976-82C4-452F-A06A-A5755ED3EC81" bpmnElement="sid-F80EF976-82C4-452F-A06A-A5755ED3EC81">
        <omgdc:Bounds x="435" y="65" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-59DD9F39-F11C-452D-B3A6-4D0830454832" bpmnElement="sid-59DD9F39-F11C-452D-B3A6-4D0830454832">
        <omgdc:Bounds x="510" y="0" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-1B544E55-4ABE-4D5C-B1F3-3D1DBF6413FB" bpmnElement="sid-1B544E55-4ABE-4D5C-B1F3-3D1DBF6413FB">
        <omgdc:Bounds x="510" y="120" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-52761798-ED8C-4A2B-AD86-068E6BF8DDD8" bpmnElement="sid-52761798-ED8C-4A2B-AD86-068E6BF8DDD8">
        <omgdc:Bounds x="645" y="120" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA" bpmnElement="sid-0AF8A079-C365-4C4D-BA0A-7C525F7BA5CA">
        <omgdc:Bounds x="825" y="75" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-2352D487-5D86-4F6F-996B-B504DF55AC5F" bpmnElement="sid-2352D487-5D86-4F6F-996B-B504DF55AC5F">
        <omgdc:Bounds x="981" y="195" width="28" height="28" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-A2E11C47-FFA4-478C-B478-C62915BF790C" bpmnElement="sid-A2E11C47-FFA4-478C-B478-C62915BF790C">
        <omgdc:Bounds x="645" y="390" width="28" height="28" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" bpmnElement="sid-671EC3A3-C0AA-4554-AE4A-FAE7F4B2E3B6" isMarkerVisible="true">
        <omgdc:Bounds x="540" y="230" width="40" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0660rid_di" bpmnElement="Event_1llitwl">
        <omgdc:Bounds x="152" y="482" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1102isw_di" bpmnElement="Activity_1102isw">
        <omgdc:Bounds x="230" y="460" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-76497F35-F448-4065-9497-5FC8C701ED2C" bpmnElement="sid-76497F35-F448-4065-9497-5FC8C701ED2C" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="129.94999817301806" y="178" />
        <omgdi:waypoint x="195" y="178" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-0A05E5C9-76CE-409B-8963-ECF1F07CE4C2" bpmnElement="sid-0A05E5C9-76CE-409B-8963-ECF1F07CE4C2" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="379.95000000000005" y="85" />
        <omgdi:waypoint x="435" y="85" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-2469A06E-1FC2-4A09-91F0-7FC46AE3E4FB" bpmnElement="sid-2469A06E-1FC2-4A09-91F0-7FC46AE3E4FB" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="469.39849999999996" y="79.43333333333334" />
        <omgdi:waypoint x="510" y="61.748564593301424" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-67A3C5AE-20D8-4C2C-B159-EFEAA43D5AB6" bpmnElement="sid-67A3C5AE-20D8-4C2C-B159-EFEAA43D5AB6" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="466.56210217755444" y="93.38701117318435" />
        <omgdi:waypoint x="510" y="124.35406698564593" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-62FF992E-7664-4831-B847-D70744C42AC1" bpmnElement="sid-62FF992E-7664-4831-B847-D70744C42AC1" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="609.95" y="160" />
        <omgdi:waypoint x="644.999999999972" y="160" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-7C6E530B-51B3-465F-8329-FBAA0B0F7035" bpmnElement="sid-7C6E530B-51B3-465F-8329-FBAA0B0F7035" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="609.95" y="49.63947368421054" />
        <omgdi:waypoint x="828.2034695677742" y="91.76470588235294" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-CB7EF031-BE0B-4BBE-A745-434A68524A40" bpmnElement="sid-CB7EF031-BE0B-4BBE-A745-434A68524A40" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="744.9499999999999" y="138.33333333333334" />
        <omgdi:waypoint x="831.046511627907" y="101.03139534883722" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-91BCA9CE-0865-4084-A52C-BBA93732E0B4" bpmnElement="sid-91BCA9CE-0865-4084-A52C-BBA93732E0B4" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="856.2714652223489" y="103.67804182509504" />
        <omgdi:waypoint x="983.8434476348535" y="200.53405144117687" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-1B852736-217C-47DB-97BB-70A601AD2B46" bpmnElement="sid-1B852736-217C-47DB-97BB-70A601AD2B46" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
        <omgdi:waypoint x="234.4274940617577" y="178.5" />
        <omgdi:waypoint x="257.5" y="178.5" />
        <omgdi:waypoint x="257.5" y="250" />
        <omgdi:waypoint x="285" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-702A7D1B-517B-45B8-8F82-78878E677D04" bpmnElement="sid-702A7D1B-517B-45B8-8F82-78878E677D04" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="567.9070436507936" y="262.04213605712016" />
        <omgdi:waypoint x="651.438171678818" y="392.20831227976157" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_sid-E7F94777-7234-4065-A678-6E7D0448AB07" bpmnElement="sid-E7F94777-7234-4065-A678-6E7D0448AB07" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
        <omgdi:waypoint x="578.7106617647058" y="248.75630252100842" />
        <omgdi:waypoint x="981.0624642332045" y="210.32644884585415" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_id-2w32423" bpmnElement="id-2w32423" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
        <omgdi:waypoint x="384.95000000000005" y="250" />
        <omgdi:waypoint x="540" y="250" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="451" y="225" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1swx6l9_di" bpmnElement="Flow_1swx6l9">
        <omgdi:waypoint x="130" y="178" />
        <omgdi:waypoint x="205" y="178" />
        <omgdi:waypoint x="205" y="85" />
        <omgdi:waypoint x="280" y="85" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1sqealh_di" bpmnElement="Flow_1sqealh">
        <omgdi:waypoint x="188" y="500" />
        <omgdi:waypoint x="230" y="500" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`

let xmlString = `<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef" exporter="Flowable Open Source Modeler" exporterVersion="6.8.0">
<process id="all-node" name="所有节点" isExecutable="true">
<documentation>test 所有节点</documentation>
<startEvent id="aa" name="asd" flowable:formFieldValidation="true">
<documentation>分身乏术的感受到</documentation>
</startEvent>
<userTask id="sid-A9DA3A54-31A7-4292-A21E-ADE460B39856" flowable:formKey="rrrr" flowable:formFieldValidation="true">
<extensionElements>
<flowable:formProperty id="aa" type="string" defaultValue="sa" name="AA" />
</extensionElements>
</userTask>
<sequenceFlow id="sid-45CBDDBA-A659-492E-8D78-99E84604AE53" sourceRef="aa" targetRef="sid-A9DA3A54-31A7-4292-A21E-ADE460B39856"/>
<sequenceFlow id="sid-98116F86-C730-4325-8101-FE3919566341" sourceRef="sid-A9DA3A54-31A7-4292-A21E-ADE460B39856" targetRef="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA"/>
<serviceTask id="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA"/>
<sequenceFlow id="sid-06A4EF30-77C0-4BF8-97B4-9D39BE685D97" sourceRef="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA" targetRef="sid-A4681C10-FB86-4942-A612-B964EA480B47"/>
<sequenceFlow id="sid-FF07F2F3-EE9B-432E-9A19-6664AB96BF3A" sourceRef="sid-A4681C10-FB86-4942-A612-B964EA480B47" targetRef="sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3"/>
<sequenceFlow id="sid-6B5F88A9-F3CE-44C9-BABC-0E977645F917" sourceRef="sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3" targetRef="sid-9464A843-43F6-4B55-89A2-907DFDD022A1"/>
<scriptTask id="sid-A4681C10-FB86-4942-A612-B964EA480B47" scriptFormat="脚本格式" flowable:autoStoreVariables="false">
<script>
<![CDATA[ 脚本 ]]>
</script>
</scriptTask>
<businessRuleTask id="sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3"/>
<receiveTask id="sid-9464A843-43F6-4B55-89A2-907DFDD022A1">
<multiInstanceLoopCharacteristics isSequential="false" flowable:elementVariable="元素变量">
<extensionElements/>
<loopCardinality>123</loopCardinality>
<completionCondition>完成条件</completionCondition>
</multiInstanceLoopCharacteristics>
</receiveTask>
<sequenceFlow id="sid-FD5BEB3B-2B2E-42FC-B583-FC9124F67839" sourceRef="sid-9464A843-43F6-4B55-89A2-907DFDD022A1" targetRef="sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0"/>
<manualTask id="sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0"/>
<sequenceFlow id="sid-A08D0736-DFFB-4119-B4C5-29FF73D0703F" sourceRef="sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0" targetRef="sid-A4BA14C4-CB9A-4F28-ADBD-9667FBCC1F3F"/>
<serviceTask id="sid-A4BA14C4-CB9A-4F28-ADBD-9667FBCC1F3F" flowable:type="mail"/>
<sequenceFlow id="sid-2A3CE083-5903-48CE-9DAB-F549D28A89FB" sourceRef="sid-A4BA14C4-CB9A-4F28-ADBD-9667FBCC1F3F" targetRef="sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC"/>
<serviceTask id="sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC" flowable:type="camel"/>
<sequenceFlow id="sid-77376ECA-6F99-4C25-AA03-D4509704EA43" sourceRef="sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC" targetRef="sid-3EDE8BA4-5E91-489C-8004-7597714853E8"/>
<sequenceFlow id="sid-2733A723-FB21-4EEB-8664-00343EFCE8FF" sourceRef="sid-3EDE8BA4-5E91-489C-8004-7597714853E8" targetRef="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83"/>
<sequenceFlow id="sid-203E8FD7-2EE6-4399-B0BE-C78BDCAEA8C9" sourceRef="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83" targetRef="sid-B92D7683-9EAC-4A66-8BB5-350A13833148"/>
<serviceTask id="sid-3EDE8BA4-5E91-489C-8004-7597714853E8" flowable:type="dmn">
<extensionElements>
<flowable:field name="decisionTaskThrowErrorOnNoHits">
<flowable:string>
<![CDATA[ false ]]>
</flowable:string>
</flowable:field>
<flowable:field name="fallbackToDefaultTenant">
<flowable:string>
<![CDATA[ false ]]>
</flowable:string>
</flowable:field>
<flowable:field name="sameDeployment">
<flowable:string>
<![CDATA[ false ]]>
</flowable:string>
</flowable:field>
</extensionElements>
</serviceTask>
<serviceTask id="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83" flowable:type="shell"/>
<serviceTask id="sid-B92D7683-9EAC-4A66-8BB5-350A13833148" flowable:type="mule"/>
<serviceTask id="sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E" flowable:type="external-worker" flowable:exclusive="false"/>
<serviceTask id="sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD" flowable:parallelInSameTransaction="true" flowable:type="http">
<extensionElements>
<flowable:field name="requestMethod">
<flowable:string>
<![CDATA[ GET ]]>
</flowable:string>
</flowable:field>
</extensionElements>
</serviceTask>
<sequenceFlow id="sid-87036178-1FAA-44A0-8E25-EE5E162F81E3" sourceRef="sid-B92D7683-9EAC-4A66-8BB5-350A13833148" targetRef="sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E"/>
<sequenceFlow id="sid-F378A9F5-5FD8-492E-9120-BA6809743E8D" sourceRef="sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E" targetRef="sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD"/>
<startEvent id="sid-D8F42604-547C-405A-BDB3-E45C8DF05F42" isInterrupting="true">
<timerEventDefinition>
<timeDate>ISO-8601</timeDate>
</timerEventDefinition>
</startEvent>
<startEvent id="sid-B6917AA3-4844-40D3-9D5A-2B1720BC3C70" isInterrupting="true">
<signalEventDefinition flowable:signalExpression="Signal expression :"/>
</startEvent>
<startEvent id="sid-3F31F7C8-5BAA-4BE3-AEE4-6054CD22E409" isInterrupting="true">
<messageEventDefinition flowable:messageExpression="msg"/>
</startEvent>
<startEvent id="sid-1E00A3E3-31E2-4CA1-BFF1-C141A45F4AEB" isInterrupting="true">
<errorEventDefinition flowable:errorVariableName="Error variable name :" flowable:errorVariableLocalScope="true" flowable:errorVariableTransient="true"/>
</startEvent>
<startEvent id="sid-8395804F-13C8-4A98-A632-454D480DD9E5"/>
<startEvent id="sid-8B89EA2F-D6BF-475A-89E5-F7F5BE1BB148" isInterrupting="true">
<extensionElements>
<flowable:variableListenerEventDefinition/>
</extensionElements>
</startEvent>
<startEvent id="sid-8BB90DE6-E0C0-446C-9FE5-FC1DDF1267DC" isInterrupting="true">
<escalationEventDefinition/>
</startEvent>
<startEvent id="sid-34D31B35-5C88-4D06-A9B3-3926BB67EFB8" isInterrupting="true">
<conditionalEventDefinition/>
</startEvent>
<sequenceFlow id="sid-468FAB2A-1436-4EAC-8225-EEA59AE0CA3E" sourceRef="sid-D8F42604-547C-405A-BDB3-E45C8DF05F42" targetRef="sid-A9DA3A54-31A7-4292-A21E-ADE460B39856"/>
<subProcess id="sid-B2619201-73B4-4044-AE7B-21415A180167" name="subProcess">
<exclusiveGateway id="sid-7B965D07-0C7F-481B-862D-12969F86D3DE"/>
</subProcess>
<parallelGateway id="sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019" default="sid-90F3A0FA-72A0-493A-BBDB-1A935411092F"/>
<inclusiveGateway id="sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE"/>
<eventBasedGateway id="sid-7D59F40E-58B2-48B3-8B80-D7775A87FD8F"/>
<sequenceFlow id="sid-5BEB7C3D-D638-40AC-8A05-46C878781315" sourceRef="sid-B6917AA3-4844-40D3-9D5A-2B1720BC3C70" targetRef="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA"/>
<exclusiveGateway id="sid-37D8C317-6506-4155-9A35-94C3388205C7"/>
<sequenceFlow id="sid-ED58C4FE-5706-4F16-BBE1-456A2AB0A76C" sourceRef="sid-37D8C317-6506-4155-9A35-94C3388205C7" targetRef="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA"/>
<sequenceFlow id="sid-9766E018-761E-49A9-B971-4871898DB2A7" sourceRef="sid-1E00A3E3-31E2-4CA1-BFF1-C141A45F4AEB" targetRef="sid-A4681C10-FB86-4942-A612-B964EA480B47"/>
<sequenceFlow id="sid-756AE436-043A-4CBF-806F-999AACA26EC3" sourceRef="sid-8395804F-13C8-4A98-A632-454D480DD9E5" targetRef="sid-A4681C10-FB86-4942-A612-B964EA480B47"/>
<sequenceFlow id="sid-1EECADCF-6B12-4D92-852D-21D301FCCBF3" sourceRef="sid-8B89EA2F-D6BF-475A-89E5-F7F5BE1BB148" targetRef="sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3"/>
<sequenceFlow id="sid-12BB2D57-DD7E-4CC4-8EBC-7CE8522F0DCA" sourceRef="sid-34D31B35-5C88-4D06-A9B3-3926BB67EFB8" targetRef="sid-9464A843-43F6-4B55-89A2-907DFDD022A1"/>
<sequenceFlow id="sid-9AC982B1-15C9-4C0B-B336-8D82EBD6770E" sourceRef="sid-8BB90DE6-E0C0-446C-9FE5-FC1DDF1267DC" targetRef="sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0"/>
<sequenceFlow id="sid-5D51DA1B-87B6-4ABF-BB74-451AAFF69946" sourceRef="sid-3F31F7C8-5BAA-4BE3-AEE4-6054CD22E409" targetRef="sid-A4681C10-FB86-4942-A612-B964EA480B47"/>
<sequenceFlow id="sid-8EAA76A6-B713-44E8-9F8F-CB93DDF35A19" sourceRef="sid-B6917AA3-4844-40D3-9D5A-2B1720BC3C70" targetRef="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA"/>
<sequenceFlow id="sid-FD08E7DC-437E-477E-B53B-FBBA2D9183EA" sourceRef="sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD" targetRef="sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019"/>
<sequenceFlow id="sid-96D2AB63-66AA-4622-95EE-72278144C4EE" sourceRef="sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019" targetRef="sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE"/>
<sequenceFlow id="sid-D4857A67-8D9B-4498-981B-C857761067BB" sourceRef="sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE" targetRef="sid-B92D7683-9EAC-4A66-8BB5-350A13833148"/>
<sequenceFlow id="sid-7CDC3959-BA62-4F2E-8B6D-E4DFE5614061" sourceRef="sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE" targetRef="sid-7D59F40E-58B2-48B3-8B80-D7775A87FD8F"/>
<endEvent id="sid-D60A1774-D37A-45BD-9B1F-B89AA3182152"/>
<endEvent id="sid-CCA4A7C6-EE4E-4E46-8819-62832C2A6B82">
<escalationEventDefinition/>
</endEvent>
<endEvent id="sid-90BCBE80-2FB2-4807-A3F1-D8D3CCC1F7F4">
<cancelEventDefinition/>
</endEvent>
<endEvent id="sid-9B9C53C3-E014-435D-A8A6-5A12FF06D505">
<terminateEventDefinition/>
</endEvent>
<endEvent id="sid-C7FC511D-B42A-494C-AD98-691198727082">
<escalationEventDefinition/>
</endEvent>
<sequenceFlow id="sid-02C9A74A-FA70-4275-A5CF-229C9DFD2CE7" sourceRef="sid-7D59F40E-58B2-48B3-8B80-D7775A87FD8F" targetRef="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83"/>
<sequenceFlow id="sid-B9EEBC15-C4E8-4E74-B394-267047A98F83" sourceRef="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83" targetRef="sid-90BCBE80-2FB2-4807-A3F1-D8D3CCC1F7F4"/>
<sequenceFlow id="sid-11E3D76B-AC14-4D8F-8602-76B43EF8749D" sourceRef="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83" targetRef="sid-D60A1774-D37A-45BD-9B1F-B89AA3182152"/>
<sequenceFlow id="sid-669FE7DC-CE6E-462D-A082-8256BF4C466A" sourceRef="sid-3EDE8BA4-5E91-489C-8004-7597714853E8" targetRef="sid-CCA4A7C6-EE4E-4E46-8819-62832C2A6B82"/>
<sequenceFlow id="sid-17838DF9-4330-4C01-A09A-C645DEFA303F" sourceRef="sid-3EDE8BA4-5E91-489C-8004-7597714853E8" targetRef="sid-9B9C53C3-E014-435D-A8A6-5A12FF06D505"/>
<sequenceFlow id="sid-71A743D6-9622-4D10-9089-AFD02930F909" sourceRef="sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC" targetRef="sid-C7FC511D-B42A-494C-AD98-691198727082"/>
<sequenceFlow id="sid-90F3A0FA-72A0-493A-BBDB-1A935411092F" sourceRef="sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019" targetRef="sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E"/>
<textAnnotation id="sid-29E34F41-756D-4A63-B9C9-DE66973F0DA1">
<text>是个h f i w g f we f we o i</text>
</textAnnotation>
<association id="sid-D2066C6D-ADCF-41CA-B8CE-9F3BA33E6D45" sourceRef="sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD" targetRef="sid-29E34F41-756D-4A63-B9C9-DE66973F0DA1" associationDirection="None"/>
</process>
<bpmndi:BPMNDiagram id="BPMNDiagram_all-node">
<bpmndi:BPMNPlane bpmnElement="all-node" id="BPMNPlane_all-node">
<bpmndi:BPMNShape bpmnElement="aa" id="BPMNShape_aa">
<omgdc:Bounds height="30.0" width="30.0" x="100.0" y="163.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-A9DA3A54-31A7-4292-A21E-ADE460B39856" id="BPMNShape_sid-A9DA3A54-31A7-4292-A21E-ADE460B39856">
<omgdc:Bounds height="80.0" width="100.0" x="165.0" y="120.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA" id="BPMNShape_sid-D0332AD4-D367-4F0E-A9AD-0FF1880D41CA">
<omgdc:Bounds height="80.0" width="100.0" x="315.0" y="135.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-A4681C10-FB86-4942-A612-B964EA480B47" id="BPMNShape_sid-A4681C10-FB86-4942-A612-B964EA480B47">
<omgdc:Bounds height="80.0" width="100.0" x="465.0" y="138.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3" id="BPMNShape_sid-D9D1973A-2579-4089-94AC-3D4A6FAE0FC3">
<omgdc:Bounds height="80.0" width="100.0" x="610.0" y="138.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-9464A843-43F6-4B55-89A2-907DFDD022A1" id="BPMNShape_sid-9464A843-43F6-4B55-89A2-907DFDD022A1">
<omgdc:Bounds height="80.0" width="100.0" x="750.0" y="135.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0" id="BPMNShape_sid-19FEC514-66C0-4EC8-90AC-D0E35BFC02C0">
<omgdc:Bounds height="80.0" width="100.0" x="895.0" y="135.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-A4BA14C4-CB9A-4F28-ADBD-9667FBCC1F3F" id="BPMNShape_sid-A4BA14C4-CB9A-4F28-ADBD-9667FBCC1F3F">
<omgdc:Bounds height="80.0" width="100.0" x="1040.0" y="135.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC" id="BPMNShape_sid-8979DA9F-EB95-46DD-B5DE-371779E33ABC">
<omgdc:Bounds height="80.0" width="100.0" x="1040.0" y="270.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-3EDE8BA4-5E91-489C-8004-7597714853E8" id="BPMNShape_sid-3EDE8BA4-5E91-489C-8004-7597714853E8">
<omgdc:Bounds height="80.0" width="100.0" x="915.0" y="270.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83" id="BPMNShape_sid-90DDB431-3489-4A06-87B8-6FF9D32A3A83">
<omgdc:Bounds height="80.0" width="100.0" x="795.0" y="270.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-B92D7683-9EAC-4A66-8BB5-350A13833148" id="BPMNShape_sid-B92D7683-9EAC-4A66-8BB5-350A13833148">
<omgdc:Bounds height="80.0" width="100.0" x="660.0" y="270.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E" id="BPMNShape_sid-F439ABEB-3B08-47FC-93CB-EFAF056B1D2E">
<omgdc:Bounds height="80.0" width="100.0" x="510.0" y="270.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD" id="BPMNShape_sid-0E95BF53-20F1-4139-8FB7-D6A05A881FAD">
<omgdc:Bounds height="80.0" width="100.0" x="375.0" y="255.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-D8F42604-547C-405A-BDB3-E45C8DF05F42" id="BPMNShape_sid-D8F42604-547C-405A-BDB3-E45C8DF05F42">
<omgdc:Bounds height="31.0" width="31.0" x="150.0" y="30.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-B6917AA3-4844-40D3-9D5A-2B1720BC3C70" id="BPMNShape_sid-B6917AA3-4844-40D3-9D5A-2B1720BC3C70">
<omgdc:Bounds height="30.0" width="30.0" x="225.0" y="45.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-3F31F7C8-5BAA-4BE3-AEE4-6054CD22E409" id="BPMNShape_sid-3F31F7C8-5BAA-4BE3-AEE4-6054CD22E409">
<omgdc:Bounds height="30.0" width="30.5" x="420.0" y="15.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-1E00A3E3-31E2-4CA1-BFF1-C141A45F4AEB" id="BPMNShape_sid-1E00A3E3-31E2-4CA1-BFF1-C141A45F4AEB">
<omgdc:Bounds height="30.0" width="30.0" x="390.0" y="48.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-8395804F-13C8-4A98-A632-454D480DD9E5" id="BPMNShape_sid-8395804F-13C8-4A98-A632-454D480DD9E5">
<omgdc:Bounds height="30.0" width="30.5" x="499.75" y="48.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-8B89EA2F-D6BF-475A-89E5-F7F5BE1BB148" id="BPMNShape_sid-8B89EA2F-D6BF-475A-89E5-F7F5BE1BB148">
<omgdc:Bounds height="30.0" width="30.0" x="600.0" y="48.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-8BB90DE6-E0C0-446C-9FE5-FC1DDF1267DC" id="BPMNShape_sid-8BB90DE6-E0C0-446C-9FE5-FC1DDF1267DC">
<omgdc:Bounds height="30.0" width="30.0" x="810.0" y="48.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-34D31B35-5C88-4D06-A9B3-3926BB67EFB8" id="BPMNShape_sid-34D31B35-5C88-4D06-A9B3-3926BB67EFB8">
<omgdc:Bounds height="30.0" width="30.0" x="695.0" y="45.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-B2619201-73B4-4044-AE7B-21415A180167" id="BPMNShape_sid-B2619201-73B4-4044-AE7B-21415A180167">
<omgdc:Bounds height="160.0" width="200.0" x="75.0" y="240.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-7B965D07-0C7F-481B-862D-12969F86D3DE" id="BPMNShape_sid-7B965D07-0C7F-481B-862D-12969F86D3DE">
<omgdc:Bounds height="40.0" width="40.0" x="115.0" y="274.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019" id="BPMNShape_sid-0F0C1C4F-E324-4D76-9E4F-013CFF79C019">
<omgdc:Bounds height="40.0" width="40.0" x="389.0" y="394.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE" id="BPMNShape_sid-38B33AAE-D1CC-4649-9C42-40C3D1FCFFDE">
<omgdc:Bounds height="40.0" width="40.0" x="630.0" y="390.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-7D59F40E-58B2-48B3-8B80-D7775A87FD8F" id="BPMNShape_sid-7D59F40E-58B2-48B3-8B80-D7775A87FD8F">
<omgdc:Bounds height="40.0" width="40.0" x="769.0" y="401.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-37D8C317-6506-4155-9A35-94C3388205C7" id="BPMNShape_sid-37D8C317-6506-4155-9A35-94C3388205C7">
<omgdc:Bounds height="40.0" width="40.0" x="350.0" y="60.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-D60A1774-D37A-45BD-9B1F-B89AA3182152" id="BPMNShape_sid-D60A1774-D37A-45BD-9B1F-B89AA3182152">
<omgdc:Bounds height="28.0" width="28.0" x="932.0" y="393.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-CCA4A7C6-EE4E-4E46-8819-62832C2A6B82" id="BPMNShape_sid-CCA4A7C6-EE4E-4E46-8819-62832C2A6B82">
<omgdc:Bounds height="28.0" width="28.0" x="1017.0" y="383.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-90BCBE80-2FB2-4807-A3F1-D8D3CCC1F7F4" id="BPMNShape_sid-90BCBE80-2FB2-4807-A3F1-D8D3CCC1F7F4">
<omgdc:Bounds height="28.0" width="28.0" x="855.0" y="420.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-9B9C53C3-E014-435D-A8A6-5A12FF06D505" id="BPMNShape_sid-9B9C53C3-E014-435D-A8A6-5A12FF06D505">
<omgdc:Bounds height="28.0" width="28.0" x="1042.0" y="449.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-C7FC511D-B42A-494C-AD98-691198727082" id="BPMNShape_sid-C7FC511D-B42A-494C-AD98-691198727082">
<omgdc:Bounds height="28.0" width="28.0" x="1109.0" y="383.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape bpmnElement="sid-29E34F41-756D-4A63-B9C9-DE66973F0DA1" id="BPMNShape_sid-29E34F41-756D-4A63-B9C9-DE66973F0DA1">
<omgdc:Bounds height="50.0" width="100.0" x="520.0" y="210.0"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge bpmnElement="sid-7CDC3959-BA62-4F2E-8B6D-E4DFE5614061" id="BPMNEdge_sid-7CDC3959-BA62-4F2E-8B6D-E4DFE5614061" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
<omgdi:waypoint x="668.1091381623071" y="411.8354026845638"/>
<omgdi:waypoint x="770.3722334004021" y="419.59060402684565"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-98116F86-C730-4325-8101-FE3919566341" id="BPMNEdge_sid-98116F86-C730-4325-8101-FE3919566341" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="264.95000000000005" y="160.0"/>
<omgdi:waypoint x="290.0" y="160.0"/>
<omgdi:waypoint x="290.0" y="175.0"/>
<omgdi:waypoint x="315.0" y="175.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-756AE436-043A-4CBF-806F-999AACA26EC3" id="BPMNEdge_sid-756AE436-043A-4CBF-806F-999AACA26EC3" flowable:sourceDockerX="15.5" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="515.2173913749725" y="77.94996762793086"/>
<omgdi:waypoint x="515.0868478260869" y="138.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-A08D0736-DFFB-4119-B4C5-29FF73D0703F" id="BPMNEdge_sid-A08D0736-DFFB-4119-B4C5-29FF73D0703F" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="994.9499999999907" y="175.0"/>
<omgdi:waypoint x="1039.9999999999807" y="175.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-71A743D6-9622-4D10-9089-AFD02930F909" id="BPMNEdge_sid-71A743D6-9622-4D10-9089-AFD02930F909" flowable:sourceDockerX="50.18044507285423" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
<omgdi:waypoint x="1105.251033800894" y="349.95000000000005"/>
<omgdi:waypoint x="1118.0572590621553" y="383.88879064230764"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-87036178-1FAA-44A0-8E25-EE5E162F81E3" id="BPMNEdge_sid-87036178-1FAA-44A0-8E25-EE5E162F81E3" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="660.0" y="310.0"/>
<omgdi:waypoint x="609.95" y="310.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-5BEB7C3D-D638-40AC-8A05-46C878781315" id="BPMNEdge_sid-5BEB7C3D-D638-40AC-8A05-46C878781315" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="251.0020524038259" y="70.12204960548905"/>
<omgdi:waypoint x="321.51890482398954" y="135.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-ED58C4FE-5706-4F16-BBE1-456A2AB0A76C" id="BPMNEdge_sid-ED58C4FE-5706-4F16-BBE1-456A2AB0A76C" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="369.4" y="99.35274999999999"/>
<omgdi:waypoint x="367.32513227513226" y="135.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-FD5BEB3B-2B2E-42FC-B583-FC9124F67839" id="BPMNEdge_sid-FD5BEB3B-2B2E-42FC-B583-FC9124F67839" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="849.9499999999907" y="175.0"/>
<omgdi:waypoint x="894.9999999999807" y="175.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-F378A9F5-5FD8-492E-9120-BA6809743E8D" id="BPMNEdge_sid-F378A9F5-5FD8-492E-9120-BA6809743E8D" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="510.0" y="304.44444444444446"/>
<omgdi:waypoint x="474.94999999999953" y="300.55"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-D2066C6D-ADCF-41CA-B8CE-9F3BA33E6D45" id="BPMNEdge_sid-D2066C6D-ADCF-41CA-B8CE-9F3BA33E6D45" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="1.0" flowable:targetDockerY="24.0">
<omgdi:waypoint x="474.95" y="263.22916666666663"/>
<omgdi:waypoint x="520.0" y="234.60364583333336"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-9766E018-761E-49A9-B971-4871898DB2A7" id="BPMNEdge_sid-9766E018-761E-49A9-B971-4871898DB2A7" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="415.33379443083294" y="73.8034104211759"/>
<omgdi:waypoint x="476.7391304347826" y="138.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-6B5F88A9-F3CE-44C9-BABC-0E977645F917" id="BPMNEdge_sid-6B5F88A9-F3CE-44C9-BABC-0E977645F917" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="709.9499999999989" y="176.92857142857142"/>
<omgdi:waypoint x="749.9999999999984" y="176.07035714285715"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-2A3CE083-5903-48CE-9DAB-F549D28A89FB" id="BPMNEdge_sid-2A3CE083-5903-48CE-9DAB-F549D28A89FB" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="1090.0" y="214.95000000000002"/>
<omgdi:waypoint x="1090.0" y="270.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-02C9A74A-FA70-4275-A5CF-229C9DFD2CE7" id="BPMNEdge_sid-02C9A74A-FA70-4275-A5CF-229C9DFD2CE7" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="796.1300898203592" y="408.1467065868264"/>
<omgdi:waypoint x="825.0896860986547" y="349.95000000000005"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-8EAA76A6-B713-44E8-9F8F-CB93DDF35A19" id="BPMNEdge_sid-8EAA76A6-B713-44E8-9F8F-CB93DDF35A19" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="251.0020524038259" y="70.12204960548905"/>
<omgdi:waypoint x="321.51890482398954" y="135.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-1EECADCF-6B12-4D92-852D-21D301FCCBF3" id="BPMNEdge_sid-1EECADCF-6B12-4D92-852D-21D301FCCBF3" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="620.4492307809002" y="76.92456097242388"/>
<omgdi:waypoint x="644.3478260869565" y="138.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-12BB2D57-DD7E-4CC4-8EBC-7CE8522F0DCA" id="BPMNEdge_sid-12BB2D57-DD7E-4CC4-8EBC-7CE8522F0DCA" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="719.2142107264531" y="71.77317346069009"/>
<omgdi:waypoint x="768.695652173913" y="135.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-203E8FD7-2EE6-4399-B0BE-C78BDCAEA8C9" id="BPMNEdge_sid-203E8FD7-2EE6-4399-B0BE-C78BDCAEA8C9" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="795.0" y="310.0"/>
<omgdi:waypoint x="759.9499999999999" y="310.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-FF07F2F3-EE9B-432E-9A19-6664AB96BF3A" id="BPMNEdge_sid-FF07F2F3-EE9B-432E-9A19-6664AB96BF3A" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="564.9499999999907" y="178.0"/>
<omgdi:waypoint x="609.9999999999807" y="178.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-669FE7DC-CE6E-462D-A082-8256BF4C466A" id="BPMNEdge_sid-669FE7DC-CE6E-462D-A082-8256BF4C466A" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
<omgdi:waypoint x="995.3068965517242" y="349.95000000000005"/>
<omgdi:waypoint x="1022.5381282724109" y="385.84065069512826"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-77376ECA-6F99-4C25-AA03-D4509704EA43" id="BPMNEdge_sid-77376ECA-6F99-4C25-AA03-D4509704EA43" flowable:sourceDockerX="50.18044507285423" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="1040.0" y="310.0"/>
<omgdi:waypoint x="1014.9499999999999" y="310.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-9AC982B1-15C9-4C0B-B336-8D82EBD6770E" id="BPMNEdge_sid-9AC982B1-15C9-4C0B-B336-8D82EBD6770E" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="835.9291651784123" y="73.20069555693779"/>
<omgdi:waypoint x="902.1405622489959" y="135.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-D4857A67-8D9B-4498-981B-C857761067BB" id="BPMNEdge_sid-D4857A67-8D9B-4498-981B-C857761067BB" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="657.91890625" y="397.9375"/>
<omgdi:waypoint x="686.318407960199" y="349.95000000000005"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-06A4EF30-77C0-4BF8-97B4-9D39BE685D97" id="BPMNEdge_sid-06A4EF30-77C0-4BF8-97B4-9D39BE685D97" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="414.95000000000005" y="175.0"/>
<omgdi:waypoint x="440.0" y="175.0"/>
<omgdi:waypoint x="440.0" y="178.0"/>
<omgdi:waypoint x="464.99999999998477" y="178.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-2733A723-FB21-4EEB-8664-00343EFCE8FF" id="BPMNEdge_sid-2733A723-FB21-4EEB-8664-00343EFCE8FF" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="915.0" y="310.0"/>
<omgdi:waypoint x="894.9499999999551" y="310.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-45CBDDBA-A659-492E-8D78-99E84604AE53" id="BPMNEdge_sid-45CBDDBA-A659-492E-8D78-99E84604AE53" flowable:sourceDockerX="15.0" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="129.7160516902613" y="175.34225149898418"/>
<omgdi:waypoint x="164.99999999999994" y="168.991"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-11E3D76B-AC14-4D8F-8602-76B43EF8749D" id="BPMNEdge_sid-11E3D76B-AC14-4D8F-8602-76B43EF8749D" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
<omgdi:waypoint x="886.5965739309635" y="349.95000000000005"/>
<omgdi:waypoint x="935.9016724029259" y="397.3024619085586"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-468FAB2A-1436-4EAC-8225-EEA59AE0CA3E" id="BPMNEdge_sid-468FAB2A-1436-4EAC-8225-EEA59AE0CA3E" flowable:sourceDockerX="16.0" flowable:sourceDockerY="16.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="172.30013405972585" y="60.65612384264268"/>
<omgdi:waypoint x="197.80701754385964" y="120.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-FD08E7DC-437E-477E-B53B-FBBA2D9183EA" id="BPMNEdge_sid-FD08E7DC-437E-477E-B53B-FBBA2D9183EA" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
<omgdi:waypoint x="419.6218487394958" y="334.95000000000005"/>
<omgdi:waypoint x="411.3644444444444" y="396.3703703703704"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-96D2AB63-66AA-4622-95EE-72278144C4EE" id="BPMNEdge_sid-96D2AB63-66AA-4622-95EE-72278144C4EE" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="20.0" flowable:targetDockerY="20.0">
<omgdi:waypoint x="428.8071685726387" y="414.13771186440675"/>
<omgdi:waypoint x="630.367346938774" y="410.36642857142857"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-5D51DA1B-87B6-4ABF-BB74-451AAFF69946" id="BPMNEdge_sid-5D51DA1B-87B6-4ABF-BB74-451AAFF69946" flowable:sourceDockerX="15.5" flowable:sourceDockerY="15.0" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="442.6269752877075" y="43.26700570702182"/>
<omgdi:waypoint x="493.51351351351354" y="138.0"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-17838DF9-4330-4C01-A09A-C645DEFA303F" id="BPMNEdge_sid-17838DF9-4330-4C01-A09A-C645DEFA303F" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
<omgdi:waypoint x="988.7611111111111" y="349.95000000000005"/>
<omgdi:waypoint x="1048.8422690879288" y="450.9573723045028"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-B9EEBC15-C4E8-4E74-B394-267047A98F83" id="BPMNEdge_sid-B9EEBC15-C4E8-4E74-B394-267047A98F83" flowable:sourceDockerX="50.0" flowable:sourceDockerY="40.0" flowable:targetDockerX="14.0" flowable:targetDockerY="14.0">
<omgdi:waypoint x="852.7322580645161" y="349.95000000000005"/>
<omgdi:waypoint x="866.3391946297368" y="420.2459301269282"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge bpmnElement="sid-90F3A0FA-72A0-493A-BBDB-1A935411092F" id="BPMNEdge_sid-90F3A0FA-72A0-493A-BBDB-1A935411092F" flowable:sourceDockerX="20.5" flowable:sourceDockerY="20.5" flowable:targetDockerX="50.0" flowable:targetDockerY="40.0">
<omgdi:waypoint x="421.2744117647058" y="406.30392156862746"/>
<omgdi:waypoint x="509.99999999999994" y="344.6828903654485"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`
// try {
//   xmlString = atob(xml?.split('base64,')?.[1])
// } catch (error) {}

export default function Bpmn(params) {
  const modelerRef = useRef<Modeler>()
  const [eleId, setEleId] = useState<string>()

  useEffect(() => {
    const modeler = new Modeler({
      container: '#bpmn',
      keyboard: { bindTo: window },

      propertiesPanel: { parent: '#properties-panel' },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        FlowablePropertiesProviderModule,
        customTranslateModule
        // magicPropertiesProviderModule,
        // ZeebePropertiesProviderModule
        // CamundaPlatformPropertiesProviderModule
      ],
      moddleExtensions: {
        // magic: magicModdleDescriptor
        // zeebe: ZeebeBpmnModdle
        // camunda: camundaModdleDescriptors
        flowable: FlowableDescriptors
      }
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
      const obj = ele && getBusinessObject?.(ele)
      // const values = get(event, 'element.di.bpmnElement.extensionElements.values')
      console.log(event, obj, ele.$type)
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
