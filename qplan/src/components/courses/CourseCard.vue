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
            {{ course.credits }} Credits |
            Lec:{{ course.hasLecture }}h -
            {{ (course.hasTutorial) ? " Yes " : " No " }}Tut.
            {{ (course.hasLab) ? " Yes " : " No " }}Lab |
            Math: {{ course.accreditationUnits.mathematics }}
            NS: {{ course.accreditationUnits.naturalSciences }}
            CS: {{ course.accreditationUnits.complementaryStudies }}
            ES: {{ course.accreditationUnits.engineeringSciences }}
            ED: {{ course.accreditationUnits.engineeringDesign }}        </v-card-text>
        <v-card-text>
            {{ course.description }}
        </v-card-text>
        <v-card-text>
            {{ course.professor }}
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