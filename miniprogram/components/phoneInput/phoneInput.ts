// components/phoneInput/phoneInput.ts
Component({
  properties: {
    input: { type: String, value: "", },
  },
  data: {inputFucused: false},
  methods: {
    handleInput: function(e:any){
      this.setData({input: e.detail.value}, () => {
        this.triggerEvent("inputchange", {value: this.properties.input})
      })
    },
    handleFocus: function(){this.setData({inputFucused: true})},
    handleBlur: function(){this.setData({inputFucused: false})},
  }
})
