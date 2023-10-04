<template>
    <section class="mx-auto w-full max-w-4xl px-4 py-16">
        <div class="pb-2 pt-4 text-title-large text-primary">Wer wir sind</div>
        <p
            class="overflow-hidden text-ellipsis text-body-medium text-primary transition-[height]"
            :class="moreDescriptionShown ? '' : 'h-36'">
            <!-- TODO: text langsamer! aufklappen -->
            Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute
            iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor
            incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.
            Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.w Excepteur sint obcaecat
            cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div class="flex justify-end pt-4">
            <button class="flex items-center" @click="moreDescriptionShown = !moreDescriptionShown">
                <div class="pr-1 text-body-small text-primary">weiterlesen</div>
                <div class="transition-transform" :class="moreDescriptionShown ? '-rotate-90' : ''">
                    <Icon name="material-symbols:arrow-forward-ios-rounded" />
                </div>
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const moreDescriptionShown = ref(false)
</script>
