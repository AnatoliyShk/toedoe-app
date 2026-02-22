import { defineStore } from 'pinia';
import { allTasks, createTask, updateTask, completeTask, removeTask } from '../http/task-api';
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


    const handleAddedTask = async (newTask) => {
        const {data: createdTask} = await createTask(newTask)
        tasks.value.unshift(createdTask.data)
    }

    const handleUpdatedTask = async (task) => {
        const {data: updatedTask} = await updateTask(task.id, {
            name: task.name
    })
    
    const currentTask = tasks.value.find(item => item.id === updatedTask.data.id);
        currentTask.name = updatedTask.data.name;
    }

    const handleCompletedTask = async (task) => {
        const {data: updatedTask} = await completeTask(task.id, {
            is_completed: task.is_completed
        })
        const currentTask = tasks.value.find(item => item.id === task.id);
        currentTask.is_completed = updatedTask.data.is_completed;
    }

    const handleRemovedTask = async (task) => {
        await removeTask(task.id);
        const index = tasks.value.findIndex(item => item.id === task.id);
        if (index !== -1) {
            tasks.value.splice(index, 1);
        }
    }


    return {
        tasks,
        completedTasks,
        uncompletedTasks,
        fetchAllTasks,
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handleRemovedTask
    }
}); 