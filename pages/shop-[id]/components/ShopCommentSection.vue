<template>
    <section class="mx-auto w-full max-w-6xl px-4 py-16">
        <div class="text-title-large">Was Kunden über uns sagen</div>
        <div>
            <div class="flex items-center justify-between pt-2 text-secondary">
                <div class="flex items-center">
                    <div v-for="index in 5">
                        <Icon v-if="shop.rating >= index" name="material-symbols:star" />
                        <Icon v-else-if="shop.rating == index - 0.5" name="material-symbols:star-half" />
                        <Icon v-else name="material-symbols:star-outline" />
                    </div>
                    <!-- TODO: das shop.rating muss noch fett-gedruckt werden -->
                    <div class="pl-2 text-label-medium text-primary">{{ shop.rating }}</div>
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
            <div v-for="comment in testCommentArray" class="py-2">
                <div class="relative rounded-lg bg-user-surface-container-low px-2 py-2">
                    <div class="text-label-medium">Von {{ comment.author }} am {{ comment.date }}</div>
                    <div class="absolute right-1 top-0 flex text-secondary">
                        <div v-for="index in 5">
                            <Icon v-if="comment.rating >= index" name="material-symbols:star" size="16px" />
                            <Icon v-else name="material-symbols:star-outline" size="16px" />
                        </div>
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
    const props = defineProps<{
        shop: any
    }>()
    const moreCommentsShown = ref(false)
    const testCommentArray = [
        {
            author: "Arthur Fröhlich",
            date: "12.03.2020",
            rating: 4,
            text: "alle Hosen hier sind viel zu eng aber halt eben enorm Statussymbol vallah",
        },
        {
            author: "Arthur Fröhlich",
            date: "12.03.2020",
            rating: 4,
            text: "alle Hosen hier sind viel zu eng aber halt eben enorm Statussymbol vallah",
        },
        {
            author: "Arthur Fröhlich",
            date: "12.03.2020",
            rating: 5,
            text: "alle Hosen hier sind viel zu eng aber halt eben enorm Statussymbol vallah",
        },
        {
            author: "Arthur Fröhlich",
            date: "12.03.2020",
            rating: 1,
            text: "alle Hosen hier sind viel zu eng aber halt eben enorm Statussymbol vallah",
        },
        {
            author: "Arthur Fröhlich",
            date: "12.03.2020",
            rating: 0,
            text: "alle Hosen hier sind viel zu eng aber halt eben enorm Statussymbol vallah aber der Stoff bro is sooo whack da muss ich mich dreimal umziehen am Tag weil ich fast ne allergische Reaktion krieg man, sau cringe nicht zu empfehlen. aber halt schon sicke Jeans so is es nicht, geht immerhin mein neues Galaxy Fold vernünftig rein, auf dem die ganzen Websites noch bissl ranzig aussehen (inkl der hier lol)",
        },
    ]
</script>
