<template>
  <div
    :class="{
      'progress-bar--overflow': overflow,
    }"
    class="progress-bar"
  >
    <div
      :style="{
        [orientationStyle]: `${valuePercentage}%`,
      }"
      class="progress-bar__progress"
    />
    <div
      class="progress-bar__max"
    />
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    orientation: {
      type: String,
      required: false,
      default: 'h',
      validator: value => ['v', 'h'].includes(value),
    },
  },
  computed: {
    orientationStyle() {
      return this.orientation === 'v' ? 'height' : 'width'
    },
    valuePercentage() {
      return (!this.overflow ? (this.value / this.max) : (this.max / this.value)) * 100
    },
    overflow() {
      return this.value > this.max
    }
  },
}
</script>

<style>
.progress-bar {
  border: 1px solid gray;
  height: 50px;
}

.progress-bar--overflow {
  background-color: red;
}

.progress-bar__progress {
  background-color: green;
  height: 100%;
  width: 100%;
}
</style>
