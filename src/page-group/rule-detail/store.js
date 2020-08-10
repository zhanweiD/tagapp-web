import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, changeToOptions} from '../../common/util'
import io from './io'

class Store {
  projectId
  type

  @observable groupId
  // 第一步 设置基础信息
  @observable entityList = []
  @observable objId

  // 第二步 设置群体圈选规则
  @observable configTagList = [] // 对象对应已同步的标签列表
  @observable drawerConfigTagList = [] // 对象对应已同步的标签列表
  @observable relList = [] // 对象对应的关系列表
  @observable otherEntity = [] // 另一个实体对象
  @observable logicExper = {}
  @observable posList
  @observable wherePosMap = {}
  @observable whereMap = {}

  // 编辑
  @observable detail = {}
  @observable detailLoading = true

  // 群体详情信息
  @action async getDetail(id, cb) {
    this.detailLoading = true
    try {
      const res = await io.getDetail({
        projectId: this.projectId,
        id,
      })

      runInAction(() => {
        // this.posList = JSON.parse(res)
        this.posList = {
          "wherePosMap": {
            "0-1-0-0": {
              "selfCon": 1,
              "rule": [{
                "flag": "0",
                "logic": 1,
                "pos": {
                  "0-0": [{
                    "type": 1,
                    "flag": "0",
                    "level": [0],
                    "x": 0,
                    "y": 32,
                    "source": null,
                    "target": null,
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-0",
                    "level": [0, 0],
                    "x": 88,
                    "y": 0,
                    "source": [22, 48],
                    "target": [88, 16],
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "leftTagId": "7546259769731456.7632317493060864",
                    "rightParams": "4",
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-1",
                    "level": [0, 1],
                    "x": 88,
                    "y": 64,
                    "source": [22, 48],
                    "target": [88, 80],
                    "leftFunction": "标签值",
                    "leftTagId": "7546259769731456.7632317486703872",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "4",
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-2",
                    "level": [0, 2],
                    "x": 88,
                    "y": 128,
                    "source": [22, 80],
                    "target": [88, 144],
                    "leftFunction": "标签值",
                    "leftTagId": "7546259769731456.7632317486703872",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "5",
                    "logic": 1
                  }],
                  "0-1": [{
                    "type": 1,
                    "flag": "0",
                    "level": [0],
                    "x": 0,
                    "y": 32,
                    "source": null,
                    "target": null,
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-0",
                    "level": [0, 0],
                    "x": 88,
                    "y": 0,
                    "source": [22, 48],
                    "target": [88, 16],
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "relId": 7546217556945280,
                    "leftTagId": "7546217556945280.7546335003256192",
                    "rightParams": "5"
                  }, {
                    "flag": "0-1",
                    "level": [0, 1],
                    "source": [22, 48],
                    "target": [88, 112],
                    "type": 1,
                    "logic": 1,
                    "x": 88,
                    "y": 96
                  }, {
                    "flag": "0-1-0",
                    "level": [0, 1, 0],
                    "source": [110, 112],
                    "target": [176, 80],
                    "type": 2,
                    "x": 176,
                    "y": 64,
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "relId": 7546217556945280,
                    "leftTagId": "7546217556945280.7546335001879936",
                    "rightParams": "5",
                    "isEnd": false
                  }, {
                    "flag": "0-1-1",
                    "level": [0, 1, 1],
                    "source": [110, 112],
                    "target": [176, 144],
                    "type": 2,
                    "x": 176,
                    "y": 128,
                    "isEnd": true,
                    "relId": 7546217556945280,
                    "leftFunction": "标签值",
                    "leftTagId": "7546217556945280.7546335005287808",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "6"
                  }]
                }
              }]
            },
            "0-1-0-2": {
              "selfCon": 1,
              "rule": [{
                "flag": "0",
                "logic": 1,
                "pos": {
                  "0-0": [{
                    "type": 1,
                    "flag": "0",
                    "level": [0],
                    "x": 0,
                    "y": 32,
                    "source": null,
                    "target": null,
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-0",
                    "level": [0, 0],
                    "x": 88,
                    "y": 0,
                    "source": [22, 48],
                    "target": [88, 16],
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "leftTagId": "7546259769731456.7632317493060864",
                    "rightParams": "66",
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-1",
                    "level": [0, 1],
                    "x": 88,
                    "y": 64,
                    "source": [22, 48],
                    "target": [88, 80],
                    "leftFunction": "标签值",
                    "leftTagId": "7546259769731456.7632317486703872",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "77",
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-2",
                    "level": [0, 2],
                    "x": 88,
                    "y": 128,
                    "source": [22, 80],
                    "target": [88, 144],
                    "leftFunction": "标签值",
                    "leftTagId": "7546259769731456.7632317489980672",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "88",
                    "logic": 1
                  }],
                  "0-1": [{
                    "type": 1,
                    "flag": "0",
                    "level": [0],
                    "x": 0,
                    "y": 32,
                    "source": null,
                    "target": null,
                    "logic": 1
                  }, {
                    "type": 2,
                    "flag": "0-0",
                    "level": [0, 0],
                    "x": 88,
                    "y": 0,
                    "source": [22, 48],
                    "target": [88, 16],
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "relId": 7546217556945280,
                    "leftTagId": "7546217556945280.7546335001879936",
                    "rightParams": "88"
                  }, {
                    "type": 2,
                    "flag": "0-1",
                    "level": [0, 1],
                    "x": 88,
                    "y": 64,
                    "source": [22, 48],
                    "target": [88, 80],
                    "relId": 7546217556945280,
                    "leftFunction": "标签值",
                    "leftTagId": "7546217556945280.7546335003256192",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "99"
                  }, {
                    "flag": "0-2",
                    "level": [0, 2],
                    "source": [22, 80],
                    "target": [88, 176],
                    "type": 1,
                    "logic": 1,
                    "x": 88,
                    "y": 160
                  }, {
                    "flag": "0-2-0",
                    "level": [0, 2, 0],
                    "source": [110, 176],
                    "target": [176, 144],
                    "type": 2,
                    "x": 176,
                    "y": 128,
                    "leftFunction": "标签值",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "relId": 7546217556945280,
                    "leftTagId": "7546217556945280.7546335005287808",
                    "rightParams": "99",
                    "isEnd": false
                  }, {
                    "flag": "0-2-1",
                    "level": [0, 2, 1],
                    "source": [110, 176],
                    "target": [176, 208],
                    "type": 2,
                    "x": 176,
                    "y": 192,
                    "isEnd": true,
                    "relId": 7546217556945280,
                    "leftFunction": "标签值",
                    "leftTagId": "7546217556945280.7546335001879936",
                    "comparision": "=",
                    "rightFunction": "固定值",
                    "rightParams": "77"
                  }]
                }
              }]
            }
          },
          "whereMap": {
            "0-1-0-0": {
              "logic": 1,
              "comparisionList": [],
              "childList": [{
                "x": 0,
                "logic": 1,
                "comparisionList": [{
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317493060864"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["4"]
                  }
                }, {
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317486703872"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["4"]
                  }
                }, {
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317486703872"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["5"]
                  }
                }]
              }, {
                "x": 0,
                "logic": 1,
                "comparisionList": [{
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546217556945280.7546335003256192"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["5"]
                  }
                }],
                "childList": [{
                  "logic": 1,
                  "x": 88,
                  "comparisionList": [{
                    "comparision": "=",
                    "left": {
                      "function": "标签值",
                      "params": ["7546217556945280.7546335001879936"]
                    },
                    "right": {
                      "function": "固定值",
                      "params": ["5"]
                    }
                  }, {
                    "comparision": "=",
                    "left": {
                      "function": "标签值",
                      "params": ["7546217556945280.7546335005287808"]
                    },
                    "right": {
                      "function": "固定值",
                      "params": ["6"]
                    }
                  }]
                }]
              }]
            },
            "0-1-0-2": {
              "logic": 1,
              "comparisionList": [],
              "childList": [{
                "x": 0,
                "logic": 1,
                "comparisionList": [{
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317493060864"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["66"]
                  }
                }, {
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317486703872"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["77"]
                  }
                }, {
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546259769731456.7632317489980672"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["88"]
                  }
                }]
              }, {
                "x": 0,
                "logic": 1,
                "comparisionList": [{
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546217556945280.7546335001879936"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["88"]
                  }
                }, {
                  "comparision": "=",
                  "left": {
                    "function": "标签值",
                    "params": ["7546217556945280.7546335003256192"]
                  },
                  "right": {
                    "function": "固定值",
                    "params": ["99"]
                  }
                }],
                "childList": [{
                  "logic": 1,
                  "x": 88,
                  "comparisionList": [{
                    "comparision": "=",
                    "left": {
                      "function": "标签值",
                      "params": ["7546217556945280.7546335005287808"]
                    },
                    "right": {
                      "function": "固定值",
                      "params": ["99"]
                    }
                  }, {
                    "comparision": "=",
                    "left": {
                      "function": "标签值",
                      "params": ["7546217556945280.7546335001879936"]
                    },
                    "right": {
                      "function": "固定值",
                      "params": ["77"]
                    }
                  }]
                }]
              }]
            }
          },
          "selfCon": 1,
          "rule": [{
            "flag": "0",
            "logic": 1,
            "pos": {
              "0-0": [{
                "type": 1,
                "flag": "0",
                "level": [0],
                "x": 0,
                "y": 32,
                "source": null,
                "target": null,
                "logic": 1
              }, {
                "type": 2,
                "flag": "0-0",
                "level": [0, 0],
                "x": 88,
                "y": 0,
                "source": [22, 48],
                "target": [88, 16],
                "leftFunction": "标签值",
                "comparision": "=",
                "rightFunction": "固定值",
                "leftTagId": "7546215319119232.7632289467442432",
                "rightParams": "4",
                "logic": 1
              }, {
                "type": 2,
                "flag": "0-1",
                "level": [0, 1],
                "x": 88,
                "y": 64,
                "source": [22, 48],
                "target": [88, 80],
                "leftFunction": "标签值",
                "leftTagId": "7546215319119232.7632289456432384",
                "comparision": "=",
                "rightFunction": "固定值",
                "rightParams": "5",
                "logic": 1
              }, {
                "type": 2,
                "flag": "0-2",
                "level": [0, 2],
                "x": 88,
                "y": 128,
                "source": [22, 80],
                "target": [88, 144],
                "leftFunction": "标签值",
                "leftTagId": "7546215319119232.7632289461413120",
                "comparision": "=",
                "rightFunction": "固定值",
                "rightParams": "6",
                "logic": 1
              }, {
                "type": 2,
                "flag": "0-3",
                "level": [0, 3],
                "x": 88,
                "y": 192,
                "source": [22, 144],
                "target": [88, 208],
                "leftFunction": "标签值",
                "leftTagId": "7546215319119232.7632296887035136",
                "comparision": "=",
                "rightFunction": "固定值",
                "rightParams": "7",
                "logic": 1
              }],
              "0-1": [{
                "type": 1,
                "flag": "0",
                "level": [0],
                "x": 0,
                "y": 32,
                "source": null,
                "target": null,
                "logic": 1
              }, {
                "type": 2,
                "flag": "0-0",
                "level": [0, 0],
                "x": 88,
                "y": 0,
                "source": [22, 48],
                "target": [88, 16],
                "leftFunction": "count",
                "comparision": "=",
                "rightFunction": "固定值",
                "relId": 7546259769731456,
                "leftTagId": "7546259769731456.7632317493060864",
                "rightParams": "4"
              }, {
                "type": 2,
                "flag": "0-1",
                "level": [0, 1],
                "x": 88,
                "y": 64,
                "source": [22, 48],
                "target": [88, 80],
                "relId": 7618778865706880,
                "leftFunction": "count",
                "leftTagId": "7618778865706880.7618895620777856",
                "comparision": "=",
                "rightFunction": "固定值",
                "rightParams": "55"
              }, {
                "type": 2,
                "flag": "0-2",
                "level": [0, 2],
                "x": 88,
                "y": 128,
                "source": [22, 80],
                "target": [88, 144],
                "relId": 7546259769731456,
                "leftFunction": "count",
                "leftTagId": "7546259769731456.7632317492012288",
                "comparision": "=",
                "rightFunction": "固定值",
                "rightParams": "66"
              }]
            }
          }]
        }

        this.wherePosMap = this.posList.wherePosMap // 回显
        this.whereMap = this.posList.whereMap // 添加

        this.detail = res

        if (cb) cb()
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.detailLoading = false
      })
    }
  }

  // 获取对象对应已同步的标签列表
  @action async getConfigTagList(params, cb) {
    try {
      const res = await io.getConfigTagList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.configTagList = res
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取配置筛选条件对象对应已同步的标签列表
  @action async getDrawerConfigTagList(params, cb) {
    try {
      const res = await io.getConfigTagList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.drawerConfigTagList = res
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取对象对应的关系列表
  @action async getRelList() {
    try {
      const res = await io.getRelList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
      })

      runInAction(() => {
        this.relList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取另一个实体对象
  @action async getOtherEntity(params) {
    try {
      const res = await io.getOtherEntity({
        projectId: this.projectId,
        objId: this.objId, // 实体ID
        ...params,
      })

      runInAction(() => {
        this.otherEntity = res.objId ? [res] : []
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound destroy() {
    if (this.groupId) {
      this.detail = {}
    }
    
    this.entityList.clear()
    this.configTagList.clear()
    this.otherEntity.clear()

    this.logicExper = {}
    this.posList = {}
    this.whereMap = {}
    this.wherePosMap = {}
    this.detailLoading = false
  }
}

export default new Store()
