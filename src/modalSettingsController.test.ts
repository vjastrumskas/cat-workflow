// import { mount } from '@vue/test-utils';
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
// import GreetingMessage from './components/GreetingMessage.vue';
import { useModalSettingsActive } from './stores/modalSettingsController.ts';

// test('mount component', async () => {
//   expect(GreetingMessage).toBeTruthy();
//   const wrapper = mount(GreetingMessage);

//   expect(wrapper.text()).toContain('Hello,');
// });

describe('ModalSettingsController testing', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('new steps is active and toggling', async () => {
    const testPinia = useModalSettingsActive();
    expect(testPinia.newStepsIsActive).toBe(false);
    testPinia.toggleNewStepsIsActive();
    expect(testPinia.newStepsIsActive).toBe(true);
  });
});

// https://fadamakis.com/unit-testing-a-pinia-component-37d045582aed
