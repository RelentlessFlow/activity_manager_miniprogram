import { Theme } from "../../../typings/types/data/activity"
import { formatDateTime } from "../../utils/util"

Component({
  options: { 
    multipleSlots: true,
    styleIsolation: "apply-shared" 
  },
  properties: {
    theme: {
      type: Object,
      value: {} as Theme
    }
  },
  data: {
    themeDate: {} as Theme
  },
  methods: {},
  lifetimes: {  
    attached: function() {
      
    }
  },
  pageLifetimes: {
    show: function() {
      const theme = this.properties.theme as Theme
      const pp = JSON.parse(JSON.stringify(this.properties)) 
      for(let k in theme) {
        if(k === 'startTime' || k === 'endTime') {
          theme[k] = formatDateTime(new Date(theme[k]))
        }
      }
      this.setData({themeDate: theme})
    }
  }
})
