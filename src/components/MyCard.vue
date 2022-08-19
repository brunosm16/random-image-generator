<template>
  <div class="card">
    <div class="card__media" v-if="displayMediaContent">
      <slot v-if="$slots.media" name="media" />
      <img v-else :src="imgSrc" alt="media" class="card__media--img" />
    </div>

    <div class="card__header" v-if="displayHeaderContent">
      <slot v-if="$slots.header" name="header" class="card__header--slot" />

      <div v-else>
        <h2 class="card__header-title card__text">{{ title }}</h2>
        <h3 class="card__header-subtitle card__text">{{ subtitle }}</h3>
      </div>
    </div>

    <div
      v-if="displaySectionContent"
      class="card__section card__text"
      :class="{ 'bottom-padding': $slots.actions, 'half-padding-top': $slots.media }"
    >
      <slot v-if="$slots.default" />
      <p v-else class="card__text">{{ sectionText }}</p>
    </div>

    <div v-if="displayActionsContent" class="card__actions">
      <slot name="actions" v-if="$slots.actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  inheritAttrs: false,

  props: {
    title: {
      type: String,
      default: '',
      validator: (v) => typeof v === 'string',
    },

    subtitle: {
      type: String,
      default: '',
      validator: (v) => typeof v === 'string',
    },

    sectionText: {
      type: String,
      default: '',
      validator: (v) => typeof v === 'string',
    },

    imgSrc: {
      type: String,
      default: '',
      validator: (v) => typeof v === 'string',
    },

    displayMedia: {
      type: Boolean,
      required: false,
      default: false,
      validator: (v) => typeof v === 'boolean',
    },

    displayActions: {
      type: Boolean,
      required: false,
      default: false,
      validator: (v) => typeof v === 'boolean',
    },
  },

  computed: {
    displayMediaContent() {
      return this.displayMedia && (this.imgSrc || this.$slots.media);
    },

    displayHeaderContent() {
      return this.$slots.header || this.title || this.subtitle;
    },

    displaySectionContent() {
      return this.$slots.default || this.sectionText;
    },

    displayActionsContent() {
      return this.displayActions && this.$slots.actions;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/card.scss';

* {
  font-family: 'Ubuntu', sans-serif;
}

.card {
  width: 100%;
  max-width: 541px;
  padding: 1.5rem 1.75rem;
  border-radius: 0.875rem;
  background: $pale-spring-bud;
  display: inline-block;
  position: relative;
  box-shadow: $box-shadow-1;

  .bottom-padding {
    padding-bottom: 1.25rem !important;
  }

  .half-padding-top {
    padding-top: 0.625rem !important;
  }

  &__media {
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  &__header {
    display: block;
    position: relative;
    padding: 0.75rem;
    margin: 0.875rem;
    text-align: center;

    &-subtitle {
      text-align: center;
    }
  }

  &__section {
    display: block;
    position: relative;
    text-align: center;
  }

  &__actions {
    display: flex;
    justify-content: space-around;
  }
}
</style>
