import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [{
            id: 1,
            name: 'Sample Task',
            is_completed: false,
        },{
            id: 2,
            name: 'Sample Task 2',
            is_completed: true,
        }],
    }),
    getters: {
        completed: (state) => state.tasks.filter(task => task.is_completed),
        uncompleted: (state) => state.tasks.filter(task => !task.is_completed),
        uncompletedCount: (state) => state.tasks.filter(task => !task.is_completed).length,
    }
}); 