<script setup>
import { computed, onMounted, ref } from 'vue';
import { startOfWeek, endOfWeek, subWeeks, format } from 'date-fns';
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
import FilterItem from './FilterItem.vue';

const filterItems = computed (() => {
    const thisWeekStart = format(startOfWeek(new Date()), 'd MMM');
    const thisWeekEnd = format(endOfWeek(new Date()), 'd MMM');
    const lastWeekStart = format(subWeeks(startOfWeek(new Date()), 1), 'd MMM');
    const lastWeekEnd = format(subWeeks(endOfWeek(new Date()), 1), 'd MMM');    
    return {
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: `This Week (${thisWeekStart} - ${thisWeekEnd})`,
        lastWeek: `Last Week (${lastWeekStart} - ${lastWeekEnd})`,
        thisMonth: 'This Month',
        lastMonth: 'Last Month',
    }
})
const emit = defineEmits(["update"]);
const filter = (period) => {
    activeFilterKey.value = period;
    emit('update', activeFilter.value);
}
onMounted(() => {
    emit('update', activeFilter.value);
})
const activeFilterKey = ref('lastWeek');
const activeFilter = computed(() => filterItems.value[activeFilterKey.value] || filterItems.value.thisWeek);
</script>

<template>
    <Dropdown>
        <template v-slot:trigger="{ toggleClass, toggle }">
            <DropdownTrigger class="btn btn-outline-secondary" :class="toggleClass" type="button" @click="toggle">
                {{activeFilter}}
            </DropdownTrigger>
        </template>
        <template v-slot:menu="{ toggle }">
            <DropdownItem v-for="(label, key) in filterItems" :key="key" href="#" @click.prevent="toggle(), filter(key)">
                <FilterItem :text="label" :selected="key === activeFilterKey" />
            </DropdownItem>
        </template>
    </Dropdown>
</template>