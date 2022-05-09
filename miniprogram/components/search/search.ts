// components/search/search.ts
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  properties: {
    input: {type: String, value: ""},
    placeholder: {type: String , value: "Search"}
  },
  data: {},
  methods: {
    handleInputChange(e:any) { // 搜索框输入内容逻辑
      this.triggerEvent("inputchange", e.detail.value)
    },
  }
})
