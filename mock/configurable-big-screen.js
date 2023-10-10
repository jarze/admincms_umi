import { mock } from 'mockjs'

export default {
  'GET /big-screen/data': (req, res) => {
    const { component } = req.query
    switch (component) {
      case 'PIE_CHART':
        // res.send(
        //   mock({
        //     code: 1002,
        //     message: '呢我看过你问那个狗围攻@cword()',
        //   }),
        // );
        // return;
        res.send(
          mock({
            code: 1001,
            message: '操作成功',
            'data|1-5': [
              {
                name: 'M搜索-@string(1,2)',
                key: '@id',
                unit: '@string',
                'data|2-9': [
                  {
                    name: 'M数据-@string(1,2)',
                    value: '@integer(10,1000000)',
                    percent: '@float(0, 1)'
                  }
                ]
              }
            ]
          })
        )
        break
      case 'LINE_CHART':
      case 'BAR_CHART':
        res.send(
          mock({
            code: 1001,
            message: '操作成功',
            'data|1-5': [
              {
                name: 'M搜索-@string(1,2)',
                key: '@id',
                total: '@integer(0,1000)',
                unit: '单位@string(1)',
                data: {
                  xAxis: {
                    'data|8': ['x@cword(2,5)']
                  },
                  'data|1-3': [
                    {
                      name: 'M数据-@string(1,2)',
                      'data|8': ['@integer(0,100)']
                    }
                  ]
                }
              }
            ]
          })
        )
        break
      case 'SINGLE_DATA':
        res.send(
          mock({
            code: 1001,
            message: '操作成功',
            data: {
              name: 'M-@cword(2,7)',
              value: '@integer(10000,12043024)',
              'unit|1': [null, '单位@string(1)']
            }
          })
        )
        break
      default:
        res.send({
          code: 1002,
          message: `${component} 类型不正确`,
          data: []
        })
        break
    }
  },
  'GET /big-screen/page/detail/:id': (req, res) => {
    res.send({
      code: 1001,
      message: '操作成功',
      data: {
        name: '鑫阳大屏配置样式',
        icon: null,
        data:
          '{"data": {"background": "url(\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAABqADAAQAAAABAAAABgAAAABrkD2lAAAAN0lEQVQIHWP4//+/FAMSAPFBmBFJjAFZEVwCRZCR8RlYAl0QZAojNkGQBBOIAAFGoHYIiwFsFwBvphxjZS2X0AAAAABJRU5ErkJggg==\\") scroll round", "paddingVertical": "16", "paddingHorizontal": "24"}, "block": {"id": 0.4634964785183553, "data": null, "width": "100%", "blocks": [{"id": 0.6713620156582305, "data": null, "width": "100%", "blocks": [{"id": 0.25915709696687395, "data": {"type": "CUSTOM_HTML", "setting": {"content": "2022年11月27日 星期二 11:00\\n"}, "background": "bg1-corner", "titlePosition": "left"}, "width": "15%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.5369627210083048, "data": {"type": "CUSTOM_HTML", "setting": {"content": "<h1 style=\\"text-align: center; background: linear-gradient(to right, transparent ,#0057bd 50%, transparent);\\">鑫阳钢铁数字化能源系统</h1>"}, "background": "bg0-none", "titlePosition": "left"}, "width": "70%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.547400507632859, "data": {"background": "bg0-none", "titlePosition": "left"}, "width": "15%", "blocks": [], "height": "100%", "direction": "row"}], "height": "8%", "direction": "row"}, {"id": 0.01749891360518596, "data": null, "width": "100%", "blocks": [{"id": 0.1151458996121113, "data": null, "width": "35%", "blocks": [{"id": 0.6931028143705489, "data": null, "width": "50%", "blocks": [{"id": 0.8255227082971237, "data": {"type": "PIE_CHART", "title": "能耗限额", "setting": {"radius": 60, "showLegend": true, "radiusOffset": 8, "centerPieOffset": 22}, "background": "bg1-topLeft", "titlePosition": "center", "sourceId":"fsefges"}, "width": "100%", "blocks": [], "height": "50%", "direction": "row"}, {"id": 0.7697150756074602, "data": {"type": "BAR_CHART", "title": "碳排放趋势（近30天）", "setting": null, "background": "bg1-bottomLeft", "titlePosition": "center"}, "width": "100%", "blocks": [], "height": "50%", "direction": "row"}], "height": "100%", "direction": "column"}, {"id": 0.6657510210870945, "data": null, "width": "50%", "blocks": [{"id": 0.4570939445361719, "data": {"type": "LINE_CHART", "title": "总体能耗", "setting": null, "background": "bg1-topRight", "titlePosition": "center"}, "width": "100%", "blocks": [], "height": "50%", "direction": "row"}, {"id": 0.08984592251671653, "data": {"type": "PIE_CHART", "title": "产线能耗", "setting": null, "background": "bg1-bottomRight", "titlePosition": "center"}, "width": "100%", "blocks": [], "height": "50%", "direction": "row"}], "height": "100%", "direction": "column"}], "height": "100%", "direction": "row"}, {"id": 0.9040648619992172, "data": {"type": "CUSTOM_HTML", "setting": {"content": "<iframe width=\\"100%\\" height=\\"100%\\" src=\\"/gyzt/client_view.html?stageId=507F27763F5F42F79B9A79703581285B&name=Echarts%E5%9B%BE%E8%A1%A8%E7%A4%BA%E4%BE%8B\\" frameborder=\\"0\\" allowfullscreen></iframe>"}, "background": "bg2-zhutai", "titlePosition": "left"}, "width": "30%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.3683522512561739, "data": null, "width": "35%", "blocks": [{"id": 0.4064212431708976, "data": null, "width": "100%", "blocks": [{"id": 0.7084651725347189, "data": {"type": "BAR_CHART", "title": "班组单耗", "setting": null, "background": "bg1-topLeft", "titlePosition": "center"}, "width": "40%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.0286273504255834, "data": {"type": "PIE_CHART", "title": "能源浪费结构", "setting": {"radius": 60, "showLegend": true, "radiusOffset": 8, "centerPieOffset": 22}, "background": "bg1-topRight", "titlePosition": "center"}, "width": "60%", "blocks": [], "height": "100%", "direction": "row"}], "height": "50%", "direction": "row"}, {"id": 0.8885093001752344, "data": null, "width": "100%", "blocks": [{"id": 0.10069188054484556, "data": {"type": "RANKING_LIST", "title": "产品能耗", "setting": null, "background": "bg1-bottomLeft", "titlePosition": "center"}, "width": "30%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.04486231659651163, "data": {"type": "BAR_CHART", "title": "停机类型分析", "setting": {"stack": false, "total": true, "interval": null}, "background": "bg1-border", "titlePosition": "center"}, "width": "40%", "blocks": [], "height": "100%", "direction": "row"}, {"id": 0.09303164734237844, "data": {"type": "RANKING_LIST", "title": "异常记录", "setting": null, "background": "bg1-bottomRight", "titlePosition": "center"}, "width": "30%", "blocks": [], "height": "100%", "direction": "row"}], "height": "50%", "direction": "row"}], "height": "100%", "direction": "column"}], "height": "92%", "direction": "row"}], "height": "100%", "direction": "column"}, "theme": null, "width": "3800px"}',
        projectId: '11111111111111111111111111111111',
        remark: 'rxx-勿删',
        id: 'AB439FACFEE94CEFB2812F294768683F',
        createTime: '2023-05-05 16:35:00',
        updateTime: '2023-05-06 10:15:00'
      }
    })
  }
}
