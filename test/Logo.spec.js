import { mount } from '@vue/test-utils'
import Logo from '@/components/ui/rnaexplorer-logo.vue'

describe('Logo', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Logo)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
