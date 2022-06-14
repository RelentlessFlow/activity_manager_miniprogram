import { ActivityEntity, Category } from "../../../typings/types/data/activity";

// components/activitylist/activitylist.ts
Component({
  options: { styleIsolation: "apply-shared" },
  properties: {
    activities: {
      type: Array,
      value: [] as Array<ActivityEntity>
    }
  },
  data: {
  },
  methods: {}
})
