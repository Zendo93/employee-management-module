import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import EmployeeForm from '../EmployeeForm.vue'

describe('EmployeeForm', () => {
    it('Employee creation form renders corectly', () => {
        const wrapper = mount(EmployeeForm);
        const buttons = wrapper.findAll('button');
        expect(wrapper.find('input#name').exists()).toBe(true);
        expect(wrapper.find('input#designation').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('input#department').exists()).toBe(true);
        expect(buttons.filter(button => button.text().match('Add')).at(0).exists()).toBe(true);
        expect(buttons.filter(button => button.text().match('Cancel')).at(0).exists()).toBe(true);
    })

    it('Employee creation form name show error', () => {
        const wrapper = mount(EmployeeForm);
        wrapper.setData({
            employee: {
              name: 'J',
            },
        });
        wrapper.vm.validateName();
        expect(wrapper.vm.nameError).toBe(true);
    })

    it('Employee creation form designation show error', () => {
        const wrapper = mount(EmployeeForm);
        wrapper.setData({
            employee: {
              designation: 'JA',
            },
        });
        wrapper.vm.validateDesignation();
        expect(wrapper.vm.designationError).toBe(true);
    })

    it('Employee creation form email show error', () => {
        const wrapper = mount(EmployeeForm);
        wrapper.setData({
            employee: {
              email: 'abc@',
            },
        });
        wrapper.vm.validateEmail();
        expect(wrapper.vm.emailError).toBe(true);
    })

    it('Employee creation form department show error', () => {
        const wrapper = mount(EmployeeForm);
        wrapper.setData({
            employee: {
                department: 't',
            },
        });
        wrapper.vm.validateDepartment();
        expect(wrapper.vm.departmentError).toBe(true);
    })

    it('Employee edit form renders corectly', () => {
        const wrapper = mount(EmployeeForm, {
            data() {
                return {
                    employee: {
                        name: "Jan",
                        designation: "abc",
                        email: "abc@abc.sk",
                        department: "IT",
                  },
                  isEditMode: true,
                }
            },
        });
        const buttons = wrapper.findAll('button');
        expect(wrapper.find('input#name').exists()).toBe(true);
        expect(wrapper.find('input#designation').exists()).toBe(true);
        expect(wrapper.find('input#email').exists()).toBe(true);
        expect(wrapper.find('input#department').exists()).toBe(true);
        expect(buttons.filter(button => button.text().match('Update')).at(0).exists()).toBe(true);
        expect(buttons.filter(button => button.text().match('Cancel')).at(0).exists()).toBe(true);
    })
  })