<template>
    <li class="list-group-item py-3">
        <div
            class="d-flex justify-content-start align-items-center"
        >
            <input
                class="form-check-input mt-0"
                :class="completedClass"
                type="checkbox"
                :checked="task.is_completed"
                @change="markTaskAsCompleted"
            />
            <div
                class="ms-2 flex-grow-1"
                :class="completedClass"
                title="Double click the text to edit or remove"
                @dblclick="$event => isEdit = true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task"
                    type="text"
                    @keyup.esc="undo" v-focus
                    @keyup.enter="updateTask"
                    v-model="editingTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>
        <TaskActions
            @edit="$event => isEdit = true" class="mt-2" v-show="!isEdit"
            @remove="removeTask"/>
    </li>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';
import TaskActions from './TaskActions.vue';
const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['updated', 'completed', 'removed']);
const isEdit = ref(false)
const editingTask = ref(props.task.name);
const completedClass = computed(() => 
    props.task.is_completed ? "completed" : ""
);

const vFocus = {
    mounted(el) {
        el.focus();
    }
}

const updateTask = (event) => {
    const updateTask = {
        ...props.task,
        name: event.target.value
    }
    isEdit.value = false;
    emit('updated', updateTask);
}

const markTaskAsCompleted = (event) => {
    const updateTask = {
        ...props.task,
        is_completed: !props.task.is_completed
    }
    emit('completed', updateTask);
}

const removeTask = () => {
    if(confirm('Are you sure you want to delete this task?')) {
        emit('removed', props.task);
    }
}

const undo = () => {
    isEdit.value = false;
    editingTask.value = props.task.name;
}
</script>