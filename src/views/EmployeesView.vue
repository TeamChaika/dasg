<template>
  <div>
    <table v-if="employees">
      <tr v-for="emp in employees" :key="emp.id">
        <td>{{ emp.name }}</td>
        <td>{{ emp.position }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'

const employees = ref([])

onMounted(async () => {
  const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false })

  if (!error) employees.value = data
})
</script>