import Vue from 'vue'
import TypeIt from 'typeit'

Vue.component('type-it', {
/*eslint-disable*/
  props: ['speed', 'values', 'loop', 'breakLines'],

  data() {
    return {
    }
  },

  template: `<span class="type-it"></span>`,
  mounted() {
    new TypeIt(this.$el, {
      strings: this.values,
      breakLines: this.breakLines,
      loop: this.loop,
      speed: this.speed
    })
  }
})
