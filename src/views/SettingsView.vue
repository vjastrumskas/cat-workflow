<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SettingsContent from '../components/SettingsContent.vue';
import AddFoodContainer from '../components/AddFoodContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';

const modalController = useModalSettingsActive();
const router = useRouter();

onMounted(() => {
  modalController.toggleYouAreAtSettings();
});

const handleLeave = () => {
  modalController.toggleYouAreAtSettings();
};

router.beforeEach(to => {
  if (to.name !== 'Settings' && modalController.getyouAreAtSettings())
    handleLeave();
});
</script>

<template>
  <AddFoodContainer />
  <FoodsContainer />
  <SettingsContent />
</template>

<style scoped></style>
