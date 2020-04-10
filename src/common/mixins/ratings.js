const ALL = 2
export default {
  data() {
    return {
      onlyContent: false,
      selectType: ALL
    }
  },
  computed: {
    computedRatings() {
      let ret = [];
      this.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      });
      console.log(ret);
      return ret
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    }
  }
}
