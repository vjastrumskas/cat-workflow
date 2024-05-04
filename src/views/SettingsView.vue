<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SettingsContent from '../components/SettingsContent.vue';
import AddFoodContainer from '../components/AddFoodContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';

const katinass = useModalSettingsActive();
const router = useRouter();

onMounted(() => {
  katinass.toggleYouAreAtSettings();
});

const handleLeave = () => {
  katinass.toggleYouAreAtSettings();
};

router.beforeEach(to => {
  if (to.name !== 'Settings' && katinass.getyouAreAtSettings()) handleLeave();
});
</script>

<template>
  <AddFoodContainer />
  <FoodsContainer />

  <SettingsContent />
</template>

<style scoped>
.container-settings {
  min-height: 300px;
  width: 300px;
  background-color: white;
  margin-top: 10px;
}
</style>
