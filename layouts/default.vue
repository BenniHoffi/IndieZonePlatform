<template>
  <div class="font-montserrat flex flex-col h-screen w-full">
    <MainHeader />
    <main class="grow">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script lang="ts" setup>
</script>