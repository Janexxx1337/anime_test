<template>
  <div class="greeting-page" ref="greetingElement">
    <h1>
      <span v-for="(char, index) in splitGreeting" :key="`greeting-${index}`" class="letter">
        <span v-if="char === ' '" style="white-space: pre;">{{ char }}</span>
        <span v-else>{{ char }}</span>
      </span>
      <span v-if="username" class="highlight">
        <span v-for="(char, index) in splitUsername" :key="`username-${index}`" class="letter">{{ char }}</span>
      </span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import anime from 'animejs';

const router = useRouter();
const username = ref('');
const splitGreeting = ref([]);
const splitUsername = ref([]);
const greetingElement = ref(null);

onMounted(() => {
  username.value = sessionStorage.getItem('username') || '';
  if (!username.value) {
    router.push('/');
  } else {
    splitGreeting.value = 'Добрый день, '.split('');
    splitUsername.value = (username.value + '!').split('');

    anime({
      targets: greetingElement.value,
      opacity: [0, 1],
      translateX: [-window.innerWidth, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      complete: () => {
        const timeline = anime.timeline({
          loop: true,
          direction: 'alternate',
        });

        timeline.add({
          targets: '.letter',
          translateX: () => anime.random(-300, 300),
          translateY: () => anime.random(-300, 300),
          rotateZ: () => anime.random(-360, 360),
          scale: [1, 0.5],
          opacity: [1, 0],
          easing: 'easeOutCirc',
          duration: 1500,
          delay: anime.stagger(100),
        }).add({
          targets: '.letter',
          translateX: 0,
          translateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: [0, 1],
          easing: 'easeOutElastic(1, .5)',
          duration: 1000,
          delay: anime.stagger(50),
        });
      }
    });
  }
});
</script>

<style scoped>
.greeting-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  color: #333;
  font-size: 24px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.highlight {
  color: #ff6f91;
  font-weight: bold;
}

.letter {
  display: inline-block;
  transform-origin: center;
}
</style>
