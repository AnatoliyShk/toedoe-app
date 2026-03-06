<script setup>
import { computed } from 'vue';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';

const filterItems = computed (() => {
    return {
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        lastWeek: 'Last Week',
        thisMonth: 'This Month',
        lastMonth: 'Last Month',
    }
})
</script>

<template>
    <Dropdown>
        <template v-slot:trigger="{ toggleClass, toggle }">
            <DropdownTrigger class="btn btn-outline-secondary" :class="toggleClass" type="button" @click="toggle">
                Filter
            </DropdownTrigger>
        </template>
        <template v-slot:menu="{ toggle }">
            <DropdownItem v-for="(label, key) in filterItems" :key="key" @click="toggle">
                {{ label }}
            </DropdownItem>
        </template>
    </Dropdown>
</template>