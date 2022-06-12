// components/phoneInput/phoneInput.ts
Component({
  externalClasses: ['ph-active-class','text-class'],
  // options: { styleIsolation: "apply-shared" },
  properties: {    
    placeholder: { type: String, value: "placeholder"},
    value: { type: String, value: "" },
    lable: { type: String, value: "" },
    maxlength: { type: String, value: "40" },
    hiddenCount: {type: Boolean, value: true }, // 隐藏字数统计
    hiddenLable: {type: Boolean, value: true}, // 隐藏输入提示
    disable: {type: Boolean, value: false}, // 禁用输入框
  },
  data: {inputFucused: false, inputLength: 0},
  observers: {
    'value': function(value) {
      this.setData({
        inputLength: value.length
      })
    },
  },
  methods: {
    handleInput: function(e:any){
      this.setData({value: e.detail.value}, () => {
        this.triggerEvent("inputchange", {value: this.properties.value})
      })
    },
    handleFocus: function(){this.setData({inputFucused: true})},
    handleBlur: function(){this.setData({inputFucused: false})},
  }
})
