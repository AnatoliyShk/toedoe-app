<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask" />
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" @updated="handleUpdatedTask"/>

                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-outline-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show completed</span>
                            <span v-else>Hide completed</span>
                        </button>
                    </div>
                    <!-- show toggle button -->

                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue';
import { allTasks, createTask, updateTask } from '../http/task-api';
import Tasks from '../components/tasks/Tasks.vue';
import NewTask from '../components/tasks/NewTask.vue';
const tasks = ref([]);

onMounted(async () => {
    try {
        const {data} = await allTasks();
        tasks.value = data.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
});

const uncompletedTasks = computed(() => 
    tasks.value.filter(task => !task.is_completed)
);

const completedTasks = computed(() => 
    tasks.value.filter(task => task.is_completed)
);

const showToggleCompletedBtn = computed(() => 
    uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const completedTasksIsVisible = computed(() => 
    uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);

const showCompletedTasks = ref(completedTasksIsVisible.value)

const handleAddedTask = async (newTask) => {
    const {data: createdTask} = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
}

const handleUpdatedTask = async (task) => {
    const {data: updatedTask} = await updateTask(task.id, {
        name: task.name
    })
    const currentTask = tasks.value.find(task => task.id === updatedTask.data.id);
    currentTask.name = updatedTask.data.name;
}
</script>