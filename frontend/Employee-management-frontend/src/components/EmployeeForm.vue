<template>
  <div class="w-full max-w-xl m-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="name"
        >
          Name
        </label>
        <input
          :class="`shadow appearance-none border rounded ${nameError ? 'border-red-500' : ''} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          id="name"
          type="text"
          placeholder="name"
          v-model="employee.name"
          @input="validateName"
        />
         <p v-if="nameError" class="text-red-500 text-xs italic">Invalid name.</p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="designation"
        >
          Designation
        </label>
        <input
          :class="`shadow appearance-none border ${designationError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          id="designation"
          type="text"
          placeholder="designation"
          v-model="employee.designation"
          @input="validateDesignation"
        />
        <p v-if="designationError" class="text-red-500 text-xs italic">Invalid designation.</p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          :class="`shadow appearance-none border ${emailError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          id="email"
          type="text"
          placeholder="email"
          v-model="employee.email"
          @input="validateEmail"
        />
        <p v-if="emailError" class="text-red-500 text-xs italic">Invalid email address.</p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="department"
        >
          Department
        </label>
        <input
          :class="`shadow appearance-none border ${departmentError ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`"
          id="department"
          type="text"
          placeholder="department"
          v-model="employee.department"
          @input="validateDepartment"
        />
        <p v-if="departmentError" class="text-red-500 text-xs italic">Invalid department.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          :class="`${ isError ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`"
          type="button"
          :disabled="isError"
        >
          {{ isEditMode ? 'Update' : 'Add' }}
        </button>
        <button
          class="inline-block align-baseline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="$router.push('/')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    employeeId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      employee: {
        name: "",
        designation: "",
        email: "",
        department: "",
      },
      isEditMode: false,
      nameError: false,
      designationError: false,
      emailError: false,
      departmentError: false,
    };
  },
  computed: {
    isError() {
        return this.nameError || this.designationError || this.emailError || this.departmentError;
    }
  },
  created() {
    if (this.employeeId) {
      this.isEditMode = true;
      this.fetchEmployeeDetails();
    }
  },
  methods: {
    validateName() {
      if (!(this.employee.name.length >= 3 && this.employee.name.length <= 30)) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }
    },
    validateDesignation() {
      if (!(this.employee.designation.length >= 3 && this.employee.designation.length <= 20)) {
        this.designationError = true;
      } else {
        this.designationError = false;
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.employee.email) || !(this.employee.email.length >= 5 && this.employee.email.length <= 50)) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
    },
    validateDepartment() {
      if (!(this.employee.department.length >= 2 && this.employee.department.length <= 10)) {
        this.departmentError = true;
      } else {
        this.departmentError = false;
      }
    },
    fetchEmployeeDetails() {
      axios
        .get(`http://localhost:8000/api/employees/${this.employeeId}`)
        .then((response) => {
          this.employee = response.data;
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
        });
    },
    handleSubmit() {
      if (this.isEditMode) {
        this.updateEmployee();
      } else {
        this.addEmployee();
      }
    },
    addEmployee() {
      axios
        .post("http://localhost:8000/api/employees", this.employee)
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    },
    updateEmployee() {
      axios
        .put(
          `http://localhost:8000/api/employees/${this.employeeId}`,
          this.employee
        )
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    },
  },
};
</script>