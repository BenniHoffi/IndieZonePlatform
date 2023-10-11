<template>
    <section class="mx-auto w-full max-w-6xl px-4 py-12">
        <div class="text-title-large">Was Kunden über uns sagen</div>
        <div>
            <div class="flex items-center justify-between pt-2 text-secondary">
                <div class="flex items-center">
                    <RatingDisplay :rating="rating" />
                    <div class="pl-2 text-label-medium font-bold text-primary">{{ rating }}</div>
                </div>
                <Button text @click="">
                    <template #icon>
                        <Icon name="material-symbols:tune" />
                    </template>
                </Button>
            </div>
        </div>

        <div
            class="overflow-hidden text-ellipsis py-8 text-body-medium text-primary transition-[height]"
            :class="moreCommentsShown ? '' : ''">
            <div v-for="comment in comments" class="py-2">
                <div class="relative rounded-lg bg-user-surface-container-low px-2 py-2">
                    <div class="text-label-medium">Von {{ comment.author }} am {{ comment.date }}</div>
                    <div class="absolute right-1 top-0 flex text-secondary">
                        <RatingDisplay :rating="comment.rating" />
                    </div>
                    <p class="pt-1 text-body-medium">{{ comment.text }}</p>
                </div>
            </div>
        </div>

        <div class="flex justify-end pt-4">
            <button class="flex items-center" @click="moreCommentsShown = !moreCommentsShown">
                <div class="pr-1 text-body-small text-primary">weiterlesen</div>
                <div class="transition-transform" :class="moreCommentsShown ? '-rotate-90' : ''">
                    <Icon name="material-symbols:arrow-forward-ios-rounded" />
                </div>
            </button>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = withDefaults(
        defineProps<{
            title?: string
            rating: number
            comments: any[]
        }>(),
        {
            title: "Bewertungen",
        }
    )
    const moreCommentsShown = ref(false)
</script>
