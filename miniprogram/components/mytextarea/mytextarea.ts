Component({
  externalClasses: ['ph-active-class','text-class'],
  properties: {    
    placeholder: { type: String, value: "placeholder"},
    lable: { type: String, value: ""},
    input: { type: String, value: ""},
    maxlength: { type: String, value: "300" },
    hiddenCount: {type: Boolean, value: true }, // 隐藏字数统计
    hiddenLable: {type: Boolean, value: true}, // 隐藏输入提示
    defaultTextAreaHeight: {type: Number, value: 100}, // 默认文本输入框高度
    disable: {type: Boolean, value: false}
  },
  data: {
    inputFucused: false, 
    inputLength: 0, 
    lines: 1,
    textAreaHeight: 100
  },
  observers: {
    'input': function(input) {
      this.setData({ inputLength: input.length })
      const lines = Math.floor(input.length / 38) + 1
      this.setData({ lines })
      const height = lines * 50;
      if(height > this.properties.defaultTextAreaHeight) {
        this.setData({ textAreaHeight: height })
      } else {
        this.setData({ textAreaHeight: this.data.defaultTextAreaHeight })
      }
    },
  },
  methods: {
    handleInput: function(e:any){
      this.setData({input: e.detail.value}, () => {
        this.triggerEvent("inputchange", {value: this.properties.input})
      })
    },
    handleFocus: function(){this.setData({inputFucused: true})},
    handleBlur: function(){this.setData({inputFucused: false})},
  },
  lifetimes: {
    attached() {
      // 挂载时设置默认文本框高度
      this.setData({
        textAreaHeight: this.properties.defaultTextAreaHeight
      })
    }
  }
})
