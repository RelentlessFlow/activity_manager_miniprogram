Component({
  options: { styleIsolation: "apply-shared" },
  properties: {
    input: { type: String, value: "", },
  },
  data: {showPass: false, inputFucused: false},
  methods: {
    handleInput: function(e:any){
      this.setData({input: e.detail.value}, () => {
        this.triggerEvent("inputchange", {value: this.properties.input})
      })
    },
    handleFocus: function(){this.setData({inputFucused: true})},
    handleBlur: function(){this.setData({inputFucused: false})},
    handleShowPassClick: function(){
      this.setData({showPass: !this.data.showPass})
      this.setData({inputFucused: true})
    }
  }
})
