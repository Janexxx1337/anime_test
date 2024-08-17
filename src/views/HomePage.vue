<template>
  <div class="home-page">
    <form ref="formElement" @submit.prevent="handleSubmit" v-if="!isSubmitted" class="form-container">
      <h1 class="form-title">Введите имя</h1>
      <div class="input-group">
        <input v-model="username" type="text"/>
        <label class="floating-label" :class="{ 'label-active': username }">Ваше имя</label>
      </div>
      <button type="submit" class="submit-btn">Войти</button>
    </form>
    <div v-if="showError" class="error-popup" ref="errorPopup">
      Имя слишком короткое
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import anime from 'animejs';

const router = useRouter();
const username = ref('');
const showError = ref(false);
const isSubmitted = ref(false);
const formElement = ref(null);
const errorPopup = ref(null);

onMounted(() => {
  anime({
    targets: formElement.value,
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.9, 1],
    duration: 1200,
    easing: 'easeOutElastic(1, .8)',
  });
});

const handleSubmit = async () => {
  if (username.value.length < 2) {
    showError.value = true;
    await nextTick();
    anime({
      targets: errorPopup.value,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 600,
      easing: 'easeOutQuad',
    });

    setTimeout(() => {
      anime({
        targets: errorPopup.value,
        opacity: [1, 0],
        translateY: [0, 50],
        duration: 600,
        easing: 'easeInQuad',
        complete: () => {
          showError.value = false;
        },
      });
    }, 4000);
  } else {
    sessionStorage.setItem('username', username.value);
    isSubmitted.value = true;
    anime({
      targets: formElement.value,
      translateX: [-100, -window.innerWidth],
      duration: 1000,
      easing: 'easeInOutCubic',
      complete: () => {
        router.push('/greeting');
      },
    });
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.form-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.input-group {
  position: relative;
  margin-bottom: 30px;
}

input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ddd;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #ff6f91;
}

.floating-label {
  position: absolute;
  top: 0;
  left: 5px;
  color: #aaa;
  font-size: 14px;
  pointer-events: none;
  transition: 0.2s ease all;
  transform: translateY(15px);
}

.label-active {
  transform: translateY(-25px);
  font-size: 12px;
  color: #ff6f91;
}

.submit-btn {
  background-color: #ff6f91;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #ff4b6e;
}

.error-popup {
  position: fixed;
  top:20px;
  right: 20px;
  transform: translateX(-50%);
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
