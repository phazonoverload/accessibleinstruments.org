<template>
    <svg :class="`${colorClass} ${tw}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 512" fill="currentColor">
        <path v-if="name === 'durability'" d="M0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96z" />
        <path v-if="name === 'flexibility'" d="M506.3 417c16.33 28-4.222 63-36.1 63H42.74c-32.89 0-53.33-35.11-36.1-63l213.2-364c16.44-28 57.66-28 73.1 0L506.3 417z" />
        <path v-if="name === 'practicality'" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
        <path v-if="name === 'complexity'" d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
        <path v-if="name === 'compatibility'" d="M505.8 278.6l-105.4 179.2C392.3 471.5 377.5 480 361.4 480H150.6c-16.11 0-30.93-8.516-39.05-22.17l-105.4-179.2c-8.234-14-8.234-31.27 0-45.27l105.4-179.2C119.7 40.52 134.5 32 150.6 32h210.8c16.11 0 30.93 8.516 39.05 22.16l105.4 179.2C514.1 247.4 514.1 264.6 505.8 278.6z" />
    </svg>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        tw: {
            type: String,
            required: false,
            default: ''
        },
    },
    computed: {
        colorClass() {
            if(this.name === 'durability') return 'text-durable'
            if(this.name === 'flexibility') return 'text-flexible'
            if(this.name === 'practicality') return 'text-practical'
            if(this.name === 'complexity') return 'text-complex'
            if(this.name === 'compatibility') return 'text-compatible'
        }
    }
}
</script>
