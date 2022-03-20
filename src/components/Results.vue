<template>
    <div class="border-2 rounded p-4 max-w-72">
        <p class="font-bold text-center text-xl mb-4">Evaluation for {{ name }}</p>
        <div class="stats">
            <div class="stat">
                <p>Durability</p>
                <div class="icons">
                    <Icon v-for="i in durability" :key="i" name="durability" tw="h-6 w-6" />
                    <Icon v-for="i in (4-durability)" :key="i" name="durability" tw="h-6 w-6 !text-gray-400" />
                </div>
            </div>
            <div class="stat">
                <p>Flexibility</p>
                <div class="icons">
                    <Icon v-for="i in flexibility" :key="i" name="flexibility" tw="h-6 w-6" />
                    <Icon v-for="i in (4-flexibility)" :key="i" name="flexibility" tw="h-6 w-6 !text-gray-400" />
                </div>
            </div>
            <div class="stat">
                <p>Practicality</p>
                <div class="icons">
                    <Icon v-for="i in practicality" :key="i" name="practicality" tw="h-6 w-6" />
                    <Icon v-for="i in (4-practicality)" :key="i" name="practicality" tw="h-6 w-6 !text-gray-400" />
                </div>
            </div>
            <div class="stat">
                <p>Complexity</p>
                <div class="icons">
                    <Icon v-for="i in complexity" :key="i" name="complexity" tw="h-6 w-6" />
                    <Icon v-for="i in (4-complexity)" :key="i" name="complexity" tw="h-6 w-6 !text-gray-400" />
                </div>
            </div>
            <div class="stat">
                <p>Compatibility</p>
                <div class="icons">
                    <Icon v-for="i in compatibility" :key="i" name="compatibility" tw="h-6 w-6" />
                    <Icon v-for="i in (4-compatibility)" :key="i" name="compatibility" tw="h-6 w-6 !text-gray-400" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        durability: {
            type: Number,
            required: true
        },
        flexibility: {
            type: Number,
            required: true
        },
        practicality: {
            type: Number,
            required: true
        },
        complexity: {
            type: Number,
            required: true
        },
        compatibility: {
            type: Number,
            required: true
        }
    },
    components: { Icon }
}
</script>

<style scoped>
.stats {
    @apply flex flex-wrap gap-x-8 gap-y-4 justify-center;
}

.stat p {
    @apply text-center text-lg;
}

.stat .icons {
    @apply flex gap-2;
}
/* td:nth-child(2) {
    @apply flex ml-4 space-x-2 pb-2;
} */
</style>
