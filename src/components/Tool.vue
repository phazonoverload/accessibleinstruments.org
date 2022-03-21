<template>
    <div class="pb-8">
        <form @submit.prevent="submit">
            <h2 class="section-title">About You</h2>
            <div v-for="question in submitterQs" :key="question.key" class="border rounded mb-4 p-4">
                <label :for="question.key">{{ question.q }}</label>
                <input type="text" :id="question.key" v-model="answers.submitter[question.key]">
            </div>

            <h2 class="section-title">About Instrument</h2>
            <div v-for="question in instrumentQs" :key="question.key" class="border rounded mb-4 p-4">
                <label :for="question.key">{{ question.q }}</label>
                <select v-if="question.type === 'boolean'" v-model="answers.instrument[question.key]">
                    <option disabled value="">Please select value</option>
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                </select>
                <input v-else-if="question.type === 'number'" type="number" step="any" :id="question.key" v-model="answers.instrument[question.key]">
                <input v-else type="text" :id="question.key" v-model="answers.instrument[question.key]">
            </div>

            <h2 class="section-title">Evaluation Questions</h2>
            <div v-for="question in closedQs" :key="question.key" class="border rounded mb-4 p-4 pb-0">
                <div class="input-group">
                    <p>{{ question.q }}</p>
                    <div class="radio-group">
                        <div class="radio">
                            <input type="radio" :id="`${question.key}-yes`" value="Yes" v-model="answers.closed[question.key]">
                            <label :for="`${question.key}-yes`">Yes</label>
                        </div>
                        <div class="radio">
                            <input type="radio" :id="`${question.key}-no`" value="No" v-model="answers.closed[question.key]">
                            <label :for="`${question.key}-no`">No</label>
                        </div>
                    </div>
                </div>
                <details>
                    <summary class="cursor-pointer">
                        <span class="ml-2">Learn more about this question</span>
                    </summary>
                    <p>{{ question.help }}</p>
                </details>
            </div>

            <input v-if="!submitted" type="submit" @click="checkMissingAnswers" class="w-full block bg-flexible text-white px-4 py-2 text-base text-center rounded mt-8 cursor-pointer focus:outline-compatible focus:outline-2">
        </form>

        <div v-if="errors.length > 0" class="bg-red-200 p-4 border border-red-500 mt-4">
            <h2 class="font-bold text-2xl mb-2">Errors</h2>
            <ol>
                <li v-for="error in errors" :key="error" class="mt-2">{{ error }}</li>
            </ol>
        </div>

        <Results v-if="scores" class="my-8" :name="scores.instrument_name" :durability="scores.score_durability" :flexibility="scores.score_flexibility" :practicality="scores.score_practicality" :complexity="scores.score_complexity" :compatibility="scores.score_compatibility" />
    </div>
</template>

<script>
import Results from './Results.vue'

export default {
    created() {
        // load saved answers
    },
    methods: {
        async submit() {
            const errors = this.checkMissingAnswers()
            if(errors) return

            try {
                this.scores = await fetch('/.netlify/functions/submit', {
                    method: 'POST',
                    body: JSON.stringify(this.payload)
                }).then(r => r.json())
                this.submitted = true
            } catch(error) {
                console.log({ error })
                alert('There has been a problem.')
            }
        },
        checkMissingAnswers() {
            this.errors = []
            const questions = [...this.submitterQs, ...this.instrumentQs, ...this.closedQs].filter(q => !q.optional)
            const answers = [
                Object.entries(this.answers.submitter).map(item => ({ [item[0]]: item[1] })),
                Object.entries(this.answers.instrument).map(item => ({ [item[0]]: item[1] })),
                Object.entries(this.answers.closed).map(item => ({ [item[0]]: item[1] })),
            ].flat()

            const missing = questions.filter(question => {
                const foundAnswer = answers.find(answer => answer[question.key])
                return !foundAnswer
            })

            this.errors = missing.map(m => `Answer required for "${m.q}"`)
            return this.errors.length > 0
        }
    },
    watch: {
        // save form when typed (autosave)
    },
    data() {
        return {
            errors: [],
            answers: {
                submitter: {},
                instrument: {},
                closed: {}
            },
            submitted: false,
            scores: false,
            submitterQs: [
                {
                    q: "What is your name?",
                    key: "submitter_name"
                },
                {
                    q: "What is your email address?",
                    key: "submitter_email"
                },
            ],
            instrumentQs: [
                {
                    q: "What is the name of the instrument?",
                    key: "instrument_name"
                },
                {
                    q: "Can you provide a short description of the instrument?",
                    key: "instrument_description"
                },
                {
                    q: "Who manufactures the instrument?",
                    key: "instrument_manufacturer"
                },
                {
                    q: "Is the instrument publicly available for others to buy?",
                    key: "instrument_public",
                    type: 'boolean',
                    optional: true
                },
                {
                    q: "Please provide a link where people can learn more about the instrument (optional)",
                    key: "instrument_link",
                    optional: true
                },
                {
                    q: "What is the cost of the instrument in GBP (£)? (optional)",
                    key: "instrument_cost_gbp",
                    type: 'number',
                    optional: true
                },

            ],
            closedQs: [
                {
                    q: "Can the instrument be used as a MIDI controller?",
                    help: "This means the instrument can communicate with other software and hardware using the most up to date MIDI protocols (either wired or wirelessly). Using a DMI as a MIDI controller can provide a more accessible way for disabled musicians to interact with other music software and hardware.",
                    key: "midi"
                },
                {
                    q: "Does the instrument require additional set up before first time use?",
                    help: "Set up is a term that can include product authorisation, downloading paired applications or software, setting user preferences, etc. DMIs that have set up processes containing many steps can be problematic for disabled musicians. The more steps involved the more likely it is that one of those steps is inaccessible. If a step is inaccessible, it can take much longer to start using the instrument or prevent it from being used.",
                    key: "setup"
                },
                {
                    q: "Does the instrument only work with preset sounds?",
                    help: "This means an instrument only has a limited selection of sounds and cannot be used with other software or hardware that might extend this. Using a list of preset or 'built-in' sounds could limit an instrument's use for disabled musicians. For example, a person with a sensory disability may not be able to find a suitable sound within the limited choice.",
                    key: "preset"
                },
                {
                    q: "Can the instrument be used wirelessly?",
                    help: "Wireless in this context is inclusive of all connections including power and audio cables. An instrument connected to multiple cables can be hazardous in some situations, especially for disabled musicians with sudden involuntary movements.",
                    key: "wireless"
                },
                {
                    q: "Can the instrument produce sound independently?",
                    help: "This means the DMI can produce sound without being connected to any other hardware or software, apart from headphones or an amplifier. Requiring additional software or hardware to produce sound increases the possibility of part of this system being inaccessible in some way. It also adds to the complexity of the instrument. This can make it difficult for a disabled musician to integrate the DMI into their current setup and practices.",
                    key: "independent_use"
                },
                {
                    q: "Can the instrument be mounted on a stand?",
                    help: "This could be using a general or specialist stand attachment. Being able to mount a DMI on a stand can be helpful for disabled musicians who use a wheelchair, as well as musicians with disabilities that impact their dexterity or ability to grip and hold an item.",
                    key: "mountable"
                },
                {
                    q: "Can the input sensitivity of the instrument interface be adjusted?",
                    help: "Being able to adjust an instrument's sensitivity to input can be very important for a musician's playing style and ability. A disabled musician with limited movement may want to adjust the input so that the output can be scaled from a smaller range of movement.",
                    key: "sensitivity_adjust"
                },
                {
                    q: "Can a musician store and load custom settings?",
                    help: "The ability to load an instrument's previously used settings or set up a custom profile and preferences is useful. This can reduce time for disabled musicians that otherwise may need to navigate potentially inaccessible settings and preference menus.",
                    key: "store_settings"
                },
                {
                    q: "Can the instrument interface be adapted?",
                    help: "This refers to the ability to change the physical controllers on hardware or adjust the visual interface of software. For many disabled musicians this can reduce the complexity of an interface. It can also provide a way of creating an interface that is easier to physically interact with.",
                    key: "interface_adapt"
                },
                {
                    q: "Can a musician adjust the colours used in the instrument's interface?",
                    help: "Colour can be present in many visual interfaces, this includes LED lights on hardware controllers. For musicians with a visual disability, changing the colour can be extremely important and in some cases make or break the interaction.",
                    key: "color_change"
                },
                {
                    q: "Does the instrument interface support high contrast?",
                    help: "High contrast allows a musician to invert foreground and background colours. For software this can be supported as an accessibility feature or through colour profiles. For hardware this can mean offering a secondary version of a product with the colours inverted. Musicians with visual disabilities may require a high contrast interface to be able to use it comfortably.",
                    key: "high_contrast"
                },
                {
                    q: "Does the instrument interface work with screen reading technology?",
                    help: "Screen reading technologies can be present in both hardware and software instruments. Disabled musicians who use a screen reader may not be able to use equipment that does not provide speech output.",
                    key: "screenreader"
                },
                {
                    q: "If the instrument were to be accidentally knocked to the floor (from a 1 metre height or more), would it still function in the same way?",
                    help: "It can be of benefit if an instrument can withstand reasonable damage and remain functional. For software instruments the physical device used to access them should be considered. Disabled musicians that have sudden involuntary movements are more likely to accidentally drop or knock an instrument unintentionally.",
                    key: "damage"
                },
                {
                    q: "Can the instrument operate consistently for longer than 2 hours?",
                    help: "This refers to an instrument being able to continuously operate for long periods of time with minimal risk of processing or buffer issues that may impact performance. In inclusive music settings, creative and practice sessions can take much longer than anticipated. Technology that needs to be recharged or that becomes temperamental during long sessions can be restrictive.",
                    key: "use_period_2h"
                },
                {
                    q: "Are protective accessories for transport available for the instrument?",
                    help: "Protective accessories refers to all types of accessory designed to protect the physicality of the instrument. This could include cases, silicone covers, cloth protectors, etc.  Having additional protective accessories can minimise 'wear and tear' of an instrument. Especially in some contexts, like inclusive music sessions, where the likelihood of accidental damage is high.",
                    key: "protective_accessories"
                },
                {
                    q: "Do instrument controls of the same type behave in the same way?",
                    help: "If an instrument has multiple controls of the same type, for example a fader on a channel strip, these controls should operate in the same way. For musicians with cognitive disabilities having multiple controls that look similar but behave differently could cause frustration and confusion.",
                    key: "control_consistency"
                },
                {
                    q: "Are proprietary adaptors and/or cables required to use the instrument with live sound equipment?",
                    help: "Live sound equipment refers to PA systems, DI boxes, audio interfaces, etc. Having to remember to always carry and connect additional adaptors for equipment can be tricky for musicians with a range of disabilities.",
                    key: "adapters"
                },
                {
                    q: "Does the instrument operate the same in practice and performance?",
                    help: "Performance environments can be challenging for some instruments. Changes in lighting for example, can impact the ability to see the instrument interface and this may require adjustment. The need to switch between a practice and performance mode or setting can be difficult for some disabled musicians.",
                    key: "practice_performance"
                },
                {
                    q: "Is feedback from a musician's action presented in more than one way?",
                    help: "A musician's action can result in many forms of feedback. Sound output is not always present as there are many actions that relate to other instrument functions like changing the type of sound or mode. If these actions are only communicated by one type of feedback, for example visually by an LED, the result can be 'invisible' to musicians with a visual disability.",
                    key: "various_feedbacks"
                },
                {
                    q: "Can a musician pause, stop, hide or control elements of an instrument that may be distracting?",
                    help: "Moving, blinking, or auto-updates to an interface can be distracting. A musician should be able remove any distracting actions apart from those that may be considered essential, for example a blinking LED indicating tempo. Musicians with certain types of cognitive disability can struggle to use interfaces with lots of distracting elements such as lights or animations.",
                    key: "hide_distractions"
                },
            ]
        }
    },
    computed: {
        payload() {
            const allAnswers = [
                Object.entries(this.answers.submitter).map(item => ({ [item[0]]: item[1] })),
                Object.entries(this.answers.instrument).map(item => ({ [item[0]]: item[1] })),
                Object.entries(this.answers.closed).map(item => ({ [item[0]]: item[1] })),
            ].flat()

            const answers = {}
            for(let answer of allAnswers) {
                const key = Object.keys(answer)[0]
                answers[key] = answer[key]
            }
            return answers
        }
    },
    components: { Results }
}
</script>

<style scoped>
.section-title {
    @apply font-bold text-2xl mb-2 mt-8;
}
.input-group {
    @apply flex flex-col sm:flex-row flex-wrap justify-between gap-x-6 gap-y-4;
}
details {
    @apply w-full mb-4 mt-2;
}
.input-group > p {
   @apply font-bold flex-1;
}
.radio-group {
    @apply flex gap-4 justify-end;
}
.radio-group label {
    @apply ml-2;
}
input[type=text], input[type=number], select {
    @apply border block w-full px-2 py-1;
}
</style>
