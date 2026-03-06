import { ref } from 'vue';
import { defineStore } from 'pinia';
import { tasksSummary } from ',,/http/summary-api';

defineStore('summaryStore', () => {
    const summaries = ref([])

    const fetchTasksSummary = async () => {
        const {data} = await fetchTasksSummary()
        summaries.value = response.data
    }

    return {
        summaries,
        fetchTasksSummary
    }
})
