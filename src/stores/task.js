import { completeTask } from '@/http/task-api';
import { defineStore } from 'pinia';
import { allTasks } from '../http/task-api';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
    }),
    getters: {
        completedTasks: (state) => state.tasks.filter(task => task.is_completed),
        uncompletedTasks: (state) => state.tasks.filter(task => !task.is_completed),
    },
    actions: {
        async fetchAllTasks() {
            try {
                const { data } = await allTasks();
                this.tasks = data.data;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
    }
}); 