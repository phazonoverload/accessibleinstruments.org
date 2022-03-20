<template>
    <div>
        <!-- <div class="mb-4 bg-gray-100 p-4 text-xs"><code>{{answers}}</code></div> -->
        <form @submit.prevent="submit">
            <div class="input-group border mb-4" v-for="question in closedQs" :key="question.key">
                <p>{{ question.q }}</p>
                <div class="radio-group">
                    <div class="radio">
                        <input type="radio" id="yes" value="Yes" v-model="answers.closed[question.key]">
                        <label for="yes">Yes</label>
                    </div>
                    <div class="radio">
                        <input type="radio" id="no" value="No" v-model="answers.closed[question.key]">
                        <label for="no">No</label>
                    </div>
                </div>
                <details>
                    <summary class="cursor-pointer">
                        <span class="ml-2">Learn more about this question</span>
                    </summary>
                    <p>{{ question.help }}</p>
                </details>
            </div>
        </form>

        <Results class="mb-8" name="LeapMusic" :durability="0" :flexibility="3" :practicality="3" :complexity="1" :compatibility="0" />
    </div>
</template>

<script>
import Results from './Results.vue'

export default {
    created() {
        // load default answers
    },
    methods: {
        submit() {

        }
    },
    watch: {
        // save form when typed (autosave)
    },
    data() {
        return {
            answers: {
                submitter: {},
                instrument: {},
                closed: {},
                open: {}
            },
            submitterQs: [
                {
                    q: "",
                    key: "submitter_name"
                },
                {
                    q: "",
                    key: "submitter_email"
                },
            ],
            instrumentQs: [
                {
                    q: "",
                    key: "instrument_name"
                },
                {
                    q: "",
                    key: "instrument_description"
                },
                {
                    q: "",
                    key: "instrument_manufacturer"
                },
                {
                    q: "",
                    key: "instrument_link"
                },
                {
                    q: "",
                    key: "instrument_cost_gbp"
                },
                {
                    q: "",
                    key: "instrument_type" // iPad Application, Hardware, Software
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
            ],
            openQs: [
                {
                    q: "How does the musician interact with the DMI?",
                    help: "Think about every step of making music with the instrument. Consider the level of strength or dexterity an action may require. Note how each of the controls are operated. Try to explore if there are any situations in which the DMI would not respond to a musician's input.",
                    key: "interact"
                },
                {
                    q: "What genres of music can the DMI be used in?",
                    help: "Consider the type of interface the DMI has, what are the genres of music where it might be more commonly understood. If an instrument can be used across a wide range of genres, think about the styles of music where it might be difficult to use. Challenges could include the interface not offering a playing style that is required to achieve a certain sound or musical technique.",
                    key: "genres"
                },
                {
                    q: "Does the environment change the way a DMI works?",
                    help: "Evaluate whether anything in the environment could impact the use of the instrument. Changes in lighting are common between practice and performance spaces. In some live performance scenarios water might even be a risk factor. Think about how these environmental factors could make the interface harder to navigate.",
                    key: "environment"
                },
                {
                    q: "Would a disabled musician require some form of support to use this DMI?",
                    help: "In using an instrument a disabled musician may require some support throughout the process. Consider what kind of support, how much, and when the assistance might be required for the DMI. Think about whether a disabled musician could engage with all parts of the setup process, navigating instrument preferences, authorisation. If support is required to use the DMIs, consider whether this is likely to be only at certain times or necessary throughout.",
                    key: "support"
                },
                {
                    q: "Are the action and output sound paired in a way that is obvious to an audience?",
                    help: "Audience perception of an instrument is an important part of music performance. Think about how a musician interacts with the instrument. A DMI should aim to make the relationship between a musician's actions and the instrument output clear to an audience. Consider if any adaptations made to the instrument, or changes to the way it is used for a disabled musician could impact this. If this connection between action and output relies on the type of sound choice, think about whether any guidance is provided for the musician.",
                    key: "obvious"
                },
                {
                    q: "What elements of the DMI can be altered to suit a musician's style or needs?",
                    help: "Think about the structure of the instrument and how fixed it is. Consider how it might be adapted for different needs, this could be through changing parts of the physical interface, settings that make it more or less responsive. For a graphical user interface, this could include changing the size of interaction areas on the screen or altering a colour profile. Create a list of the potential ways the DMI could be adapted.",
                    key: "style"
                },
                {
                    q: "What are the required actions from switching on the DMI to making sound with it?",
                    help: "Create a list of all the actions involved in “setting up” the DMI for a music making session. Consider whether there is additional equipment needed for the instrument to produce sound, or extra software or updates that might need to be downloaded. If this is the case, note whether actions like downloading, authenticating, or pairing with other equipment are a one-time action on the first use or will need to occur with each use.",
                    key: "actions"
                },
                {
                    q: "How could the DMI be damaged?",
                    help: "Consider the instrument and where it has potential to be easily damaged. Wired only connections can be problematic for causing tripping hazards on stage, for example. Is there a requirement to charge the instrument regularly and as a result could it fail in long periods of use? The physicality of the DMI is also important here, think about whether there are any elements to the physical device that could be damaged beyond repair. For software instruments, think about the device used to interact with the software. Also consider the technology used to build the software and ways in which this could be fragile.",
                    key: "damage"
                },
                {
                    q: "Does the DMI rely on a single method of feedback?",
                    help: "Think about how the musician receives feedback from their actions when using the instrument. List the ways in which the DMI presents feedback to the musician. Feedback can be auditory, tactile (haptic), or visual. If the instrument uses a graphical user interface of any kind, note whether the feedback presented visually on the screen is presented in any other form.",
                    key: "feedback"
                },
                {
                    q: "How does the DMI work with Assistive Technology?",
                    help: "Some examples of assistive technology includes screen readers, magnification tools, colour overlays, guided access (available on iOS to limit the interaction areas of a screen), text enlargement, etc. When used with assistive technology, make note of how the instrument behaves. Go through the whole experience of the instrument using the assistive technology. Find any points where this differs from the experience without it.",
                    key: "assistive"
                },
            ]
        }
    },
    components: { Results }
}
</script>
