import { SwiperSlider } from "../../../typings/types/data/swiperSlider";

// components/myswiper/myswiper.ts
Component({
  options: { styleIsolation: "apply-shared" },
  properties: {
    imgs: {
      type: Array,
      value: [] as Array<SwiperSlider> 
    },
  },
  data: {

  },
  methods: {
    handleItemTap: function(e: any) {
      this.triggerEvent("itemtap", e.currentTarget.dataset)
    }
  },
})
