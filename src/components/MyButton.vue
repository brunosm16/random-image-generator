<template>
  <div class="button">
    <button tabindex="0" class="button" :style="buttonStyleObject" v-bind="$attrs">
      <slot />
    </button>
  </div>
</template>

<script>
import isColor from 'is-color';

export default {
  name: 'MyButton',

  props: {
    backgroundColor: {
      type: String,
      default: '#fff',
      validator: (v) => typeof v === 'string' && isColor(v),
    },

    textColor: {
      type: String,
      default: '#000',
      validator: (v) => typeof v === 'string' && isColor(v),
    },

    backgroundHoverColor: {
      type: String,
      default: '#cecece',
      validator: (v) => typeof v === 'string' && isColor(v),
    },

    backgroundHoverTextColor: {
      type: String,
      default: '#000',
      validator: (v) => typeof v === 'string' && isColor(v),
    },
  },

  computed: {
    buttonStyleObject() {
      return {
        background: this.backgroundColor,
        color: this.textColor,
        '--background-hover': this.backgroundHoverColor,
        '--background-hover-text': this.backgroundHoverTextColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/button.scss';

.button {
  font-weight: 700;
  font-size: 1.125rem;
  width: 200px;
  height: 44px;
  font-family: 'Ubuntu', sans-serif;

  &:hover {
    background: var(--background-hover) !important;
    color: var(--background-hover-text) !important;
  }
}
</style>
