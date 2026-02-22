import { completeTask } from '@/http/task-api';
import { defineStore } from 'pinia';
import { allTasks } from '../http/task-api';
import { ref, reactive, computed } from 'vue';
const tmp = {
    state: () => ({
        tasks: [],
    }),
    getters: {
    },
    actions: {
    }
}
export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([]);
    const task = reactive({
        id: null,
        name: null,
        is_completed: false,

    })

    const uncompletedTasks = computed(() =>
        tasks.value.filter(task => !task.is_completed)
    );

    const completedTasks = computed(() =>
        tasks.value.filter(task => task.is_completed)
    );

    const fetchAllTasks = async () => {
        try {
            const { data } = await allTasks();
            tasks.value = data.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    return {
        tasks,
        completedTasks,
        uncompletedTasks,
        fetchAllTasks
    }
}); 