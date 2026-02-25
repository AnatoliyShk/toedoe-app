<template>
    <div class="container py-5">
        <h1 class="display-4">404 Not Found</h1>
        <p class="lead">The page <code>{{ $route.params.notFound }}</code> you are looking for does not exist.</p>
        <router-link :to="{ name: 'tasks' }" class="btn btn-primary">Go to Tasks</router-link>
    </div>
</template>