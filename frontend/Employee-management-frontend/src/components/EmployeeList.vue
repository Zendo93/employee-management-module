<script setup>
import DeletionModal from './DeletionModal.vue'
</script>

<template>
  <div class="m-5">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goToAddEmployee">Add Employee</button>
    <table class="table-auto my-5">
      <thead>
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Designation</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Department</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id" v-memo=[employee.updated_at]>
          <td class="border px-4 py-2">{{ employee.id }}</td>
          <td class="border px-4 py-2">{{ employee.name }}</td>
          <td class="border px-4 py-2">{{ employee.designation }}</td>
          <td class="border px-4 py-2">{{ employee.email }}</td>
          <td class="border px-4 py-2">{{ employee.department }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" @click="editEmployee(employee.id)">Edit</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="showDeletionModal(employee)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="space-x-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="previousPage">Previous</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="nextPage">Next</button>
    </div>
  </div>
    <DeletionModal :name="employeeToDelete.name" @delete="deleteEmployee(employeeToDelete.id)" @cancel="cancelDeletion" v-if="isDeletionModalPresent" />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      currentPage: 1,
      isDeletionModalPresent: false,
      employeeToDelete: null,
      lastPage: 1,
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    cancelDeletion() {
        this.employeeToDelete = null;
        this.isDeletionModalPresent = false;
    },
    showDeletionModal(employee) {
        this.employeeToDelete = employee;
        this.isDeletionModalPresent = true;
    },
    fetchEmployees() {
      axios.get(`http://localhost:8000/api/employees?page=${this.currentPage}`)
        .then(response => {
          this.employees = response.data.data;
          this.lastPage = response.data.last_page;  
        });
    },
    goToAddEmployee() {
      this.$router.push('/add');
    },
    editEmployee(id) {
      this.$router.push(`/edit/${id}`);
    },
    deleteEmployee(id) {
        axios.delete(`http://localhost:8000/api/employees/${id}`)
          .then(() => {
            this.isDeletionModalPresent = false;
            this.fetchEmployees();
        });
    },
    nextPage() {
        if (this.currentPage !== this.lastPage) {
            this.currentPage++;
            this.fetchEmployees();
        }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchEmployees();
      }
    },
  },
};
</script>