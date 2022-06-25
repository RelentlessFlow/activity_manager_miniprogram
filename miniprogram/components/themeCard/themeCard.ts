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
  data: {},
  methods: {
    handleTap: function() {
      wx.navigateTo({url: `../activity/activity?themeId=${this.data.theme.id}`})
    }
  },
  lifetimes: {  
    attached: function() {
      
    }
  },
  pageLifetimes: {
  }
})
