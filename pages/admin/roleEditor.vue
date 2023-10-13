<template>
    <div>
        <DataTable :value="roles" data-key="id" :loading="rolesPending"> </DataTable>
        <pre>{{ roles }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const { roles, refreshRoles, rolesPending } = await useRoles()
</script>
