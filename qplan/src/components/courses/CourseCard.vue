<template>
    <div>
        <v-dialog width="1000">
            <template v-slot:activator="{ on } ">
                <v-card color="grey lighten-4" flat v-on="on" hover v-on:click="addRecent(course)">
                    <v-toolbar dense extension-height="20" style="background-color: #f5f5f5">
                        <v-icon v-if="courseWarning[0]" dense :color="alertColor" class="mr-3">mdi-alert</v-icon>
                        <v-toolbar-title class="d-inline-block text-truncate subtitle-1">
                            <b>{{ course.courseCode }} - {{ course.name }}</b>
                            <span v-if="detailed" class="ml-1">({{ course.semester }})</span>
                        </v-toolbar-title>
                        <v-spacer />
                        <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        icon
                                        small
                                        v-on:click="undoRemove(course, 'completed'); toggleStatus(course, 'completed');"
                                        v-on:click.stop
                                        v-on="on"
                                >
                                    <div v-if="course.status == 'completed'">
                                        <v-icon>mdi-check-circle</v-icon>
                                    </div>
                                    <div v-else>
                                        <v-icon>mdi-check-circle-outline</v-icon>
                                    </div>
                                </v-btn>
                            </template>
                            <span>Completed</span>
                        </v-tooltip>

                        <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        icon
                                        small
                                        v-on:click="undoRemove(course, 'inProgress'); toggleStatus(course, 'inProgress');"
                                        v-on:click.stop
                                        v-on="on"
                                >
                                    <div v-if="course.status == 'inProgress'">
                                        <v-icon>mdi-timer-sand-full</v-icon>
                                    </div>
                                    <div v-else>
                                        <v-icon>mdi-timer-sand-empty</v-icon>
                                    </div>
                                </v-btn>
                            </template>
                            <span>Currently Taking</span>
                        </v-tooltip>

                        <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        icon
                                        small
                                        v-on:click="undoRemove(course, 'saved'); toggleStatus(course, 'saved');"
                                        v-on:click.stop
                                        v-on="on"
                                >
                                    <div v-if="course.status == 'saved'">
                                        <v-icon>mdi-bookmark</v-icon>
                                    </div>
                                    <div v-else>
                                        <v-icon>mdi-bookmark-outline</v-icon>
                                    </div>
                                </v-btn>
                            </template>
                            <span>Saved</span>
                        </v-tooltip>
                        <template v-if="detailed" #extension>
                            <v-subheader class="ml-n4">
                                {{ course.credits }} Credits |
                                Lec:{{ course.lecture }}h -
                                {{ (course.tutorial) ? " Y " : " N " }}Tut.
                                {{ (course.lab) ? " Y " : " N " }}Lab |
                                Math: {{ course.accreditationUnits.mathematics }}
                                NS: {{ course.accreditationUnits.naturalSciences }}
                                CS: {{ course.accreditationUnits.complementaryStudies }}
                                ES: {{ course.accreditationUnits.engineeringSciences }}
                                ED: {{ course.accreditationUnits.engineeringDesign }}
                            </v-subheader>
                        </template>
                    </v-toolbar>
                </v-card>
            </template>
            <v-card>
                <v-card-title class="mb-n3">
                    <b class="mr-1">{{ course.courseCode }} - {{ course.name }}</b>
                    ({{ course.semester }})
                    <v-spacer />

                    <v-select
                            v-model="selectedSemester"
                            label="Select Semester"
                            dense
                            v-if="Array.isArray(semesterOptions) && semesterOptions.length > 1"
                            :items="semesterOptions"
                            class="mb-n1"
                            style="max-width: 150px;"
                    ></v-select>
<!--                    <template>-->
<!--                        <v-dialog width="1000">-->
<!--                            <template v-slot:activator="{ on: dialog }">-->
<!--                                <v-tooltip bottom nudge-bottom="-6" open-delay="500">-->
<!--                                    <template v-slot:activator="{ on: tooltip }">-->
<!--                                        <v-btn icon v-on="{ ...tooltip, ...dialog }">-->
<!--                                            <v-icon :color="(calendarConflict[0]) ? alertColor : ''">mdi-calendar</v-icon>-->
<!--                                        </v-btn>-->
<!--                                    </template>-->
<!--                                    <span>Preview Schedule</span>-->
<!--                                </v-tooltip>-->
<!--                            </template>-->
<!--                            <CourseCalendar :course="course" />-->
<!--                        </v-dialog>-->
<!--                    </template>-->

                    <v-divider vertical inset class="mb-2 mr-1" />

                    <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    icon
                                    small
                                    v-on:click="undoRemove(course, 'completed'); toggleStatus(course, 'completed');"
                                    v-on:click.stop
                                    v-on="on"
                            >
                                <div v-if="course.status == 'completed'">
                                    <v-icon>mdi-check-circle</v-icon>
                                </div>
                                <div v-else>
                                    <v-icon>mdi-check-circle-outline</v-icon>
                                </div>
                            </v-btn>
                        </template>
                        <span>Completed</span>
                    </v-tooltip>

                    <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    icon
                                    small
                                    v-on:click="undoRemove(course, 'inProgress'); toggleStatus(course, 'inProgress');"
                                    v-on:click.stop
                                    v-on="on"
                            >
                                <div v-if="course.status == 'inProgress'">
                                    <v-icon>mdi-timer-sand-full</v-icon>
                                </div>
                                <div v-else>
                                    <v-icon>mdi-timer-sand-empty</v-icon>
                                </div>
                            </v-btn>
                        </template>
                        <span>Currently Taking</span>
                    </v-tooltip>

                    <v-tooltip bottom nudge-bottom="-6" open-delay="500">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    icon
                                    small
                                    v-on:click="undoRemove(course, 'saved'); toggleStatus(course, 'saved');"
                                    v-on:click.stop
                                    v-on="on"
                            >
                                <div v-if="course.status == 'saved'">
                                    <v-icon>mdi-bookmark</v-icon>
                                </div>
                                <div v-else>
                                    <v-icon>mdi-bookmark-outline</v-icon>
                                </div>
                            </v-btn>
                        </template>
                        <span>Saved</span>
                    </v-tooltip>
                </v-card-title>
                <v-card-text>
                    {{ course.credits }} Credits |
                    Lec:{{ course.lecture }}h -
                    {{ (course.tutorial) ? " Yes " : " No " }}Tut.
                    {{ (course.lab) ? " Yes " : " No " }}Lab |
                    Math: {{ course.accreditationUnits.mathematics }}
                    NS: {{ course.accreditationUnits.naturalSciences }}
                    CS: {{ course.accreditationUnits.complementaryStudies }}
                    ES: {{ course.accreditationUnits.engineeringSciences }}
                    ED: {{ course.accreditationUnits.engineeringDesign }}
                    <v-chip-group class="my-n1">
                        <v-chip small v-for="courseLabel in activeLabels" :key="courseLabel">{{ courseLabel }}</v-chip>
                    </v-chip-group>
                </v-card-text>
                <v-card-text v-if="courseWarning[0]">
                    <v-icon :color="alertColor" class="mr-2">mdi-alert</v-icon>The following conflicts exist for taking this course:
                    <br />
                    <ul class="ml-7">
                        <li v-for="(warning, index) in courseWarning[1]" :key="index">
                            {{ warning }}
                            <br />
                        </li>
                    </ul>
                </v-card-text>
                <v-card-text>{{ course.description }}</v-card-text>
                <v-card-text>Professor: {{ course.professor }}</v-card-text>
                <v-card-text>
                    Prerequisites: {{ getPrerequisiteText() }}
                    <br />Corequisites: {{ getCorequisiteText() }}
                    <br />Exclusions: {{ getExclusionText() }}
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
    import { mapState } from "vuex";
    // import CourseCalendar from "./CourseCalendar";

    export default {
        name: "CourseCard",
        data: () => ({
            alertColor: "amber accent-4",
            chosenSemester: undefined
        }),
        props: {
            course: Object,
            detailed: Boolean
        },
        // components: {
        //     CourseCalendar
        // },
        methods: {
            toggleStatus: function(course, status) {
                if (
                    status === "inProgress" &&
                    this.semesterOptions.length > 1 &&
                    this.selectedSemester === undefined &&
                    this.chosenSemester === undefined
                ) {
                    alert(
                        "Please choose which semester you want to take this course in first.  Go to the detailed course view."
                    );
                    return;
                    //TODO Make nicer
                }
                this.$store.commit("toggleStatus", [course.id, status]);
                this.$store.commit("addRecentlyViewed", course);
            },
            addRecent: function(course) {
                this.$store.commit("addRecentlyViewed", course);
            },
            getPrerequisiteText() {
                if( this.course.prerequisites.text == undefined) {
                    return ""
                } else {
                    return this.course.prerequisites.text
                }
            },
            getCorequisiteText() {
                if( this.course.corequisites.text == undefined) {
                    return ""
                } else {
                    return this.course.corequisites.text
                }
            },
            getExclusionText() {
                if( this.course.exclusions.text == undefined) {
                    return ""
                } else {
                    return this.course.exclusions.text
                }
            },
            undoRemove: function(course, status) {
                if (course.status === status) {
                    this.$store.commit("updateRemovedCourse", [course.id, course.status]);
                    if (this.$route.name == "home") {
                        this.$store.commit("updateRemovedSnackbarHome", true);
                    } else {
                        this.$store.commit("updateRemovedSnackbarProgress", true);
                    }
                }
            }
        },
        computed: {
            selectedSemester: {
                get() {
                    return this.$store.getters.course(this.course.id).chosenSemester;
                },
                set(value) {
                    this.$store.commit("updateCourseChosenSemester", [
                        this.course.id,
                        value
                    ]);
                    this.chosenSemester = value;
                }
            },
            semesterOptions() {
                return this.course.semester
                    .split("/")
                    .map(semester => this.semesterMapping[semester]);
            },
            activeLabels() {
                var labels = [];

                for (const [key, value] of Object.entries(this.course.labels)) {
                    if (value != 0) {
                        if (key in this.labelNames) {
                            labels.push(this.labelNames[key]);
                        }
                    }
                }

                return labels;
            },
            courseWarning() {
                const result =
                    this.exceedsLabelCount[0] ||
                    this.calendarConflict[0] ||
                    this.missingPrereq[0] ||
                    this.missingCoreq[0] ||
                    this.notCurrentlyOffered[0] ||
                    this.isExcluded[0];

                var message = [];
                if (this.exceedsLabelCount[0]) message.push(this.exceedsLabelCount[1]);
                if (this.calendarConflict[0]) message.push(this.calendarConflict[1]);
                if (this.missingPrereq[0]) message.push(this.missingPrereq[1]);
                if (this.missingCoreq[0]) message.push(this.missingCoreq[1]);
                if (this.isExcluded[0]) message.push(this.isExcluded[1]);
                if (this.notCurrentlyOffered[0])
                    message.push(this.notCurrentlyOffered[1]);

                return [result, message];
            },
            exceedsLabelCount() {
                const labelsExceeded = this.$store.getters.labelsExceeded;
                const labelNames = this.$store.getters.labelNames;

                var warningMessage = "";
                for (const labelInfo of labelsExceeded) {
                    const labelKey = labelInfo[0];
                    if (this.course.labels[labelKey] != 0) {
                        warningMessage +=
                            "You are taking " +
                            labelInfo[2] +
                            " too many courses with the " +
                            labelNames[labelKey] +
                            " label.  Only " +
                            labelInfo[1] +
                            " of them will count towards graduation requirements.";
                    }
                }

                if (warningMessage === "") {
                    return [false, ""];
                } else {
                    return [true, warningMessage];
                }
            },
            notCurrentlyOffered() {
                const warningMessage = "This course is offered this year.";
                if (
                    this.course.currentlyOffered === 0 &&
                    this.course.status === "inProgress"
                )
                    return [true, warningMessage];
                return [false, ""];
            },
            calendarConflict() {
                if (this.course.status !== "inProgress") return [false, ""];
                var start, end, otherStart, otherEnd;
                const warningMessage =
                    "This course has a scheduling conflict, check the calendar for details.  You will need to get the conflict approved.";

                var currentSemester;
                if (this.course.chosenSemester && this.course.chosenSemester != undefined)
                    currentSemester = this.course.chosenSemester;
                else currentSemester = this.course.semester;

                var coursesInProgress = this.$store.getters.coursesInProgress;
                const otherCourses = coursesInProgress.filter(course => {
                    var courseSemester;
                    if (course.chosenSemester && course.chosenSemester != undefined)
                        courseSemester = course.chosenSemester;
                    else courseSemester = course.semester;
                    return this.semesterMapping[courseSemester].includes(this.semesterMapping[currentSemester]);
                });

                //Iterate through all classes of current course
                if (this.course.schedule) {
                    var curCourseTimes = [];
                    var lecTimes = [];
                    if (this.course.schedule.LEC) {
                        lecTimes = this.course.schedule.LEC.times;
                    }
                    var tutTimes = [];
                    if (this.course.schedule.TUT) {
                        tutTimes = this.course.schedule.TUT.times;
                    }
                    var labTimes = [];
                    if (this.course.schedule.LAB) {
                        labTimes = this.course.schedule.LAB.times;
                    }
                    curCourseTimes = curCourseTimes.concat(lecTimes, tutTimes, labTimes);
                    for (const event of curCourseTimes) {
                        start = event[0];
                        end = event[1];
                        for (const otherCourse of otherCourses) {
                            //Check against all other courses
                            if (otherCourse.id !== this.course.id) {
                                if (otherCourse.schedule) {
                                    var otherCourseTimes = [];
                                    lecTimes = [];
                                    if (otherCourse.schedule.LEC) {
                                        lecTimes = otherCourse.schedule.LEC.times;
                                    }
                                    tutTimes = [];
                                    if (otherCourse.schedule.TUT) {
                                        tutTimes = otherCourse.schedule.TUT.times;
                                    }
                                    labTimes = [];
                                    if (otherCourse.schedule.LAB) {
                                        labTimes = otherCourse.schedule.LAB.times;
                                    }
                                    otherCourseTimes = curCourseTimes.concat(
                                        lecTimes,
                                        tutTimes,
                                        labTimes
                                    );

                                    for (const otherEvent of otherCourseTimes) {
                                        //Check against each class of the other courses
                                        otherStart = otherEvent[0];
                                        otherEnd = otherEvent[1];
                                        if (
                                            Date.parse(start) < Date.parse(otherEnd) &&
                                            Date.parse(otherStart) < Date.parse(end)
                                        ) {
                                            return [true, warningMessage]; // There is a conflict
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return [false, ""];
            },
            missingPrereq() {
                if (
                    this.course.status === "" ||
                    this.course.status === "completed" ||
                    this.course.prerequisites === undefined ||
                    this.course.prerequisites.courses === undefined
                ) {
                    return [false, ""];
                }

                // If in progress, prereq must be completed
                var eligibleCourses = this.$store.getters.coursesCompleted;
                var warningMessage =
                    "You have not completed all the required prereqs for this course yet.";

                //If saved, prereq must be planned
                if (this.course.status === "saved") {
                    eligibleCourses = eligibleCourses.concat(
                        this.$store.getters.coursesInProgress
                    );
                    warningMessage =
                        "You are not taking or have completed all the required prereqs for this course yet.";
                }
                eligibleCourses = eligibleCourses.map(course => course.courseCode);

                var missingCourseCodes = [];
                var meetsRequirement = true;
                var orFlag = false;
                var seperator = ", ";
                var path = [];

                const prereqs = this.course.prerequisites.courses;
                for (const requirement of prereqs) {
                    if (Array.isArray(requirement)) {
                        var origSeperator = seperator;
                        var origOrFlag = orFlag;
                        var meetsSubRequirements = true;
                        path.push("(");
                        for (const subRequirement of requirement) {
                            if (subRequirement === "all") {
                                if (seperator === " or " && !orFlag && origSeperator !== " or ") {
                                    meetsSubRequirements = false;
                                }
                                seperator = ", ";
                                continue;
                            }
                            if (subRequirement === "one") {
                                seperator = " or ";
                                orFlag = false;
                                continue;
                            }
                            //Requirement is a course code
                            if (!eligibleCourses.includes(subRequirement)) {
                                missingCourseCodes.push(subRequirement);
                                if (seperator === ", ") meetsSubRequirements = false;
                            } else {
                                //Course code is found
                                if (seperator === " or ") orFlag = true;
                            }
                            path.push(subRequirement);
                            path.push(seperator);
                        }
                        path.push(")");
                        if (seperator === " or ") {
                            if (origSeperator === ", " && !orFlag) {
                                meetsSubRequirements = false;
                            }
                        }
                        if (origSeperator === " or " && meetsSubRequirements) {
                            orFlag = true;
                        }
                        if (origSeperator === ", " && !meetsSubRequirements) {
                            meetsRequirement = false;
                        }
                        seperator = origSeperator;
                        orFlag = origOrFlag;
                        continue;
                    }
                    if (requirement === "all") {
                        if (seperator === " or " && !orFlag) {
                            meetsRequirement = false;
                        }
                        seperator = ", ";
                        continue;
                    }
                    if (requirement === "one") {
                        seperator = " or ";
                        orFlag = false;
                        continue;
                    }
                    //Requirement is a course code
                    if (!eligibleCourses.includes(requirement)) {
                        missingCourseCodes.push(requirement);
                        if (seperator === ", ") {
                            meetsRequirement = false;
                        }
                    } else {
                        //Course code is found
                        if (seperator === " or ") orFlag = true;
                    }
                    path.push(requirement);
                    path.push(seperator);
                }
                if (meetsRequirement && (orFlag || seperator === ", ")) {
                    return [false, ""];
                }
                return [true, warningMessage, path];
            },
            missingCoreq() {
                if (
                    this.course.status == "" ||
                    this.course.corequisites === undefined ||
                    this.course.corequisites.courses === undefined
                ) {
                    return [false, ""];
                }
                var excludedCourses = [];
                const otherCourses = this.$store.getters.coursesInProgress.map(
                    course => course.courseCode
                );
                const corequisites = this.course.corequisites.courses;
                for (const required of corequisites) {
                    if (!otherCourses.includes(required)) {
                        if(required == "one") continue;
                        //TODO handle one of cases properly
                        excludedCourses.push(required);
                    }
                }
                if (excludedCourses.length === 0) {
                    return [false, ""];
                }
                const warningMessage =
                    "This course has a corequisite with the folowing course(s): " +
                    excludedCourses.join(", ");
                return [true, warningMessage];
            },


            isExcluded() {
                if (
                    this.course.status == "" ||
                    this.course.exclusions === undefined ||
                    this.course.exclusions.courses === undefined
                ) {
                    return [false, ""];
                }
                var excludedCourses = [];
                const otherCourses = this.$store.getters.coursesPlanned.map(
                    course => course.courseCode
                );
                const exclusions = this.course.exclusions.courses;
                for (const otherCourse of otherCourses) {
                    if (exclusions.includes(otherCourse)) {
                        excludedCourses.push(otherCourse);
                    }
                }

                if (excludedCourses.length === 0) {
                    return [false, ""];
                }
                const warningMessage =
                    "This course has an exclusion with the folowing course(s): " +
                    excludedCourses.join(", ");
                return [true, warningMessage];
            },
            ...mapState(["labelNames", "semesterMapping"])
        }
    };
</script>