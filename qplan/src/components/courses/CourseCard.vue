<template>
<v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on } ">
        <v-btn v-on="on" width="100%" rounded>
            {{ course.courseCode }} - {{ course.name }}
        </v-btn>
    </template>
    <v-card>
        <v-card-title primary-title>
            {{ course.courseCode }} - {{ course.name }} | {{ course.semester }} | 3.3
        </v-card-title>
        <v-card-text>
            Lecture: 2.8            Lab: 0  Tutorial: 0.5 | Mathematics: 0  Natural Sciences: 40  Complementary Studies: 0  Engineering Science: 0  Engineering Design: 0
        </v-card-text>
        <v-card-text>
            An introduction to Newtonian mechanics - a subject which is applicable to everyday engineering problems. Lecture topics are: vectors, motion of a particle, particle dynamics, work and energy, statics of rigid bodies, oscillators, waves, conservation of energy, momentum, and collisions.
        </v-card-text>
        <v-card-text>
            Professor: Dr. Tony Noble
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>

    export default {
        name: "CourseCard",
        props: {
            course: Object
        }
    }
</script>