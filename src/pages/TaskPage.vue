<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <div class="relative">
                        <input
                            type="text"
                            class="form-control form-control-lg padding-right-lg"
                            placeholder="+ Add new task. Press enter to save."
                        />
                    </div>
                    <!-- List of tasks -->
                    <div class="card mt-2">
                        <ul class="list-group list-group-flush">
                            <Task
                                v-for="task in tasks"
                                :key="task.id"
                                :task="task"
                            />
                        </ul>
                    </div>
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />

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
import { allTasks } from '../http/task-api';
import Tasks from '../components/tasks/Tasks.vue';
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
</script>