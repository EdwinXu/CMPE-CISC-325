
<template>
    <div class="MyCourseLists">
        <div v-if="object != null">
            <v-expansion-panel-header class="headline">{{ list }}</v-expansion-panel-header>
            <SemesterLists :courses="object"  />
        </div>

        <div v-else>
            <v-expansion-panel-header class="headline">{{ list }}</v-expansion-panel-header>
            <v-expand-transition>
                <div v-if="year.length>0">
                    <v-expansion-panel-content>
                        <div>Fall/Winter</div>
                    </v-expansion-panel-content>
                    <SemesterLists :courses="year"  />
                </div>
            </v-expand-transition>

            <v-expand-transition>
                <div v-if="fall.length>0">
                    <v-expansion-panel-content>
                        <div>Fall</div>
                    </v-expansion-panel-content>
                    <SemesterLists :courses="fall"  />
                </div>
            </v-expand-transition>

            <v-expand-transition>
                <div v-if="winter.length>0">
                    <v-expansion-panel-content>
                        <div>Winter</div>
                    </v-expansion-panel-content>
                    <SemesterLists :courses="winter" />
                </div>
            </v-expand-transition>

            <v-expand-transition>
                <div v-if="summer.length>0">
                    <v-expansion-panel-content>
                        <div>Summer</div>
                    </v-expansion-panel-content>
                    <SemesterLists :courses="summer" />
                </div>
            </v-expand-transition>

        </div>
    </div>
</template>

<script>
    import SemesterLists from "./SemesterLists";

    export default {
        props: {
            list: String,
            object: Array,
            year: Array,
            fall: Array,
            winter: Array,
            summer: Array,
        },
        components: {
            SemesterLists
        }
    };
</script>
