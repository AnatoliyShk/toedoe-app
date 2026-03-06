<script setup>
import Dropdown from '@/components/dropdown/Dropdown.vue';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger.vue';
import DropdownItem from '@/components/dropdown/DropdownItem.vue';
</script>

<template>
    <Dropdown>
        <template v-slot:trigger="{ toggleClass, toggle }">
            <DropdownTrigger class="btn btn-outline-secondary" :class="toggleClass" type="button" @click="toggle">
                Filter
            </DropdownTrigger>
        </template>
        <template v-slot:menu="{ toggle }">
            <DropdownItem href="#" @click.prevent="toggle">Today</DropdownItem>
            <DropdownItem href="#" @click.prevent="toggle">Yesterday</DropdownItem>
        </template>
    </Dropdown>
</template>