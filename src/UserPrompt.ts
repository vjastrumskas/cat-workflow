// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import HelloWorld from './components/UserPrompt.vue';
// import GreetingMessage from './components/GreetingMessage.vue';
import { useModalActive } from './stores/modalController.ts';

describe('HelloWorld exists', async () => {
  expect(HelloWorld).toBeTruthy();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Pinia initiliazed successfully', async () => {
    const testPinia = useModalActive();
    expect(testPinia.isActive).toBe(false);
  });

  it('Mounting HelloWorld if data missing in local storage', async () => {
    const testPinia = useModalActive();
    testPinia.toggleModal();
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toContain('Hello there, stranger.');
  });

  it('Locate user name, weight input', async () => {
    const testPinia = useModalActive();

    testPinia.toggleModal();
    const wrapper = mount(HelloWorld);

    const nameById = wrapper.find('#userNameInput');
    expect(nameById.element.id).toBe('userNameInput');
    nameById.setValue('Knoxwille');
    nameById.trigger('#userNameInput');

    const weightByID = wrapper.find('#userWeightInput');
    expect(weightByID.element.id).toBe('userWeightInput');
    weightByID.setValue('85');
    weightByID.trigger('#userWeightInput');

    const ageByID = wrapper.find('#options12');
    expect(ageByID.element.id).toBe('options12');
    expect(ageByID.text()).toContain('28');
    // ageByID.setValue('28');
    // const userAge = '28';

    const buttonById = wrapper.find('#submit-user-details');
    expect(buttonById.text()).toContain('Submit');
    // await buttonById.trigger('click');
    // await wrapper.get('[data-test="form"]').trigger('submit');

    // const wrapperGreetingMessage = mount(GreetingMessage);
    // const helloMessageById = wrapperGreetingMessage.find('#greetings-message');

    // expect(helloMessageById.text()).toContain('Hello, Knoxwille');
  });
});
