<template>
  <div class="random-image">
    <MyCard
      class="card"
      title="Random Image"
      sectionText="Simple random image generator"
      displayActions
      displayMedia
    >
      <template #media>
        <img v-if="image" :src="image" alt="media" class="card__random-img" />
        <div v-else class="card__loading-container">
          <i class="material-icons card__loading-container--icon">cached</i>
        </div>
      </template>

      <template #actions>
        <MyButton
          class="card__button"
          backgroundColor="#283618ff"
          textColor="#faedcdff"
          backgroundHoverColor="#606c38ff"
          backgroundHoverTextColor="#fefae0ff"
          @click.stop="newRandomCat"
        >
          <div class="card__button--text">
            <span>Random Dog</span>
            <i class="material-icons">pets</i>
          </div>
        </MyButton>
        <MyButton
          class="card__button"
          backgroundColor="#2b2d42ff"
          textColor="#edf2f4ff"
          backgroundHoverColor="#bc6c25ff"
          backgroundHoverTextColor="#fefae0ff"
          @click.stop="newRandomDog"
        >
          <div class="card__button--text">
            <span>Random Dog</span>
            <i class="material-icons">pets</i>
          </div>
        </MyButton>
      </template>
    </MyCard>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard.vue';
import MyButton from '@/components/MyButton.vue';
import { getHttp } from '@/http/fetch-api';

export default {
  name: 'RandomImage',

  components: {
    MyCard,
    MyButton,
  },

  data: () => ({
    image: '',
  }),

  async beforeMount() {
    await this.newRandomCat();
  },

  computed: {
    getRandomCatURL() {
      return 'https://aws.random.cat/meow';
    },

    getRandomDogURL() {
      return 'https://dog.ceo/api/breeds/image/random';
    },
  },

  methods: {
    async getImage(url, type) {
      const json = await getHttp(url, {}, 'text');
      const result = JSON.parse(json);
      return type === 'cat' ? result.file : result.message;
    },

    resetImage() {
      if (this.image) {
        this.image = null;
      }
    },

    async newRandomCat() {
      await this.fetchImageByType(this.getRandomCatURL);
    },

    async newRandomDog() {
      await this.fetchImageByType(this.getRandomDogURL, 'dog');
    },

    async fetchImageByType(url, type = 'cat') {
      this.resetImage();
      this.image = await this.getImage(url, type);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  &__random-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &__loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    &--text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
}
</style>
