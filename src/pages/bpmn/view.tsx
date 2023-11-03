import React, { useEffect } from 'react';
// import xml from './1.xml';
import BpmnJS from 'bpmn-js';
import styles from './index.less';

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.flowable.org/processdef">
  <process id="form-demo" name="测试多表单流程" isExecutable="true">
    <documentation>佛外观及哦i和个人及恶化</documentation>
    <startEvent id="start" name="开始" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="new_property_1" name="AA" type="string" required="true"></flowable:formProperty>
        <flowable:formProperty id="new_property_2" name="BB" type="long"></flowable:formProperty>
        <flowable:formProperty id="new_property_3" name="CC" type="boolean"></flowable:formProperty>
      </extensionElements>
    </startEvent>
    <userTask id="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D" name="审核1" flowable:formFieldValidation="true">
      <documentation>描述审核1</documentation>
      <extensionElements>
        <flowable:formProperty id="a_new_property_1" name="A" type="string" required="true"></flowable:formProperty>
        <flowable:formProperty id="b_new_property_2" name="B" type="string" required="true"></flowable:formProperty>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-06B4737A-AD24-4510-91B8-CC47AAD974E7" sourceRef="start" targetRef="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D"></sequenceFlow>
    <userTask id="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5" name="审核2" flowable:formFieldValidation="true">
      <extensionElements>
        <flowable:formProperty id="new_property_1" name="RR" type="string" required="true"></flowable:formProperty>
      </extensionElements>
    </userTask>
    <sequenceFlow id="sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58" sourceRef="sid-E8E406F7-6F20-4B5F-8479-E51B8AD8977D" targetRef="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5"></sequenceFlow>
    <userTask id="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32" name="审核3" flowable:formFieldValidation="true"></userTask>
    <sequenceFlow id="sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9" sourceRef="sid-59B25901-3BA4-4B47-93E3-C43F6AE667D5" targetRef="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32"></sequenceFlow>
    <endEvent id="sid-9387E205-7914-41B4-8011-23480B6EA44A" name="结束"></endEvent>
    <sequenceFlow id="sid-27F6A998-C449-4855-A5F4-DBE05FD43A3B" sourceRef="sid-FE0230AB-7CEB-4477-A7F8-DE6BD04B7F32" targetRef="sid-9387E205-7914-41B4-8011-23480B6EA44A"></sequenceFlow>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_form-demo">
    <bpmndi:BPMNPlane bpmnElement="form-demo" id="BPMNPlane_form-demo">
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
        <omgdc:Bounds height="28.0" width="28.0" x="720.5" y="164.0"></omgdc:Bounds>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58" id="BPMNEdge_sid-27E6EAAF-9E32-4716-A6C2-D5EC57301D58">
        <omgdi:waypoint x="274.9499999999303" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="344.99999999993565" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9" id="BPMNEdge_sid-2D00F518-B8F9-45BE-9A1D-1A60688B52F9">
        <omgdi:waypoint x="444.9499999999581" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="494.99999999993634" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-06B4737A-AD24-4510-91B8-CC47AAD974E7" id="BPMNEdge_sid-06B4737A-AD24-4510-91B8-CC47AAD974E7">
        <omgdi:waypoint x="129.9499984899576" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="174.9999999999917" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge bpmnElement="sid-27F6A998-C449-4855-A5F4-DBE05FD43A3B" id="BPMNEdge_sid-27F6A998-C449-4855-A5F4-DBE05FD43A3B">
        <omgdi:waypoint x="594.95" y="178.0"></omgdi:waypoint>
        <omgdi:waypoint x="720.5" y="178.0"></omgdi:waypoint>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;

export default function Bpmn(params) {
  useEffect(() => {
    const viewer = new BpmnJS({ container: '#bpmn' });
    try {
      viewer
        .importXML(xml)
        .then(res => {
          console.log('rendered', res);
        })
        .catch(err => {
          console.log('error rendering', err);
        });
    } catch (err) {}
    return () => {};
  }, []);

  return <div id="bpmn" className={styles.wrapper} />;
}