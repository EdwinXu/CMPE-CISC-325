import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showProgressSidebar: true,
    graduationRequirements: {  //Graduation requirements for the current discipline
      totalCredits: 162.5,
      auBaseRequirements: [
        {
          name: "Mathematics (Math)",
          aus: ["mathematics"],
          value: 220,
          type: "Units"
        },
        {
          name: "Natural Sciences (NS)",
          aus: ["naturalSciences"],
          value: 200,
          type: "Units"
        },
        {
          name: "Complementary Studies (CS)",
          aus: ["complementaryStudies"],
          value: 240,
          type: "Units"
        },
        {
          name: "Engineering Sciences (ES)",
          aus: ["engineeringSciences"],
          value: 400,
          type: "Units"
        },
        {
          name: "Engineering Design (ED)",
          aus: ["engineeringDesign"],
          value: 400,
          type: "Units"
        },
      ],
      auCombinedRequirements: [
        {
          name: "ES+ED",
          aus: ["engineeringSciences", "engineeringDesign"],
          value: 1000,
          type: "Units"
        },
        {
          name: "Math+NS",
          aus: ["mathematics", "naturalSciences"],
          value: 420,
          type: "Units"
        },
        {
          name: "Total AUs",
          aus: ["mathematics", "naturalSciences", "complementaryStudies", "engineeringSciences", "engineeringDesign"],
          value: 1950,
          type: "Units"
        },
      ],
      additionalRequirements: [
        {
          name: "400 Level",
          labels: ["level400"],
          value: 5,
          type: "Courses"
        },
        {
          name: "Common Core",
          labels: ["commonCore"],
          value: 10,
          type: "Courses"
        },
        {
          name: "ECE Core",
          labels: ["eceCore"],
          value: 22,
          type: "Courses"
        },
        {
          name: "List B/C",
          labels: ["listB", "listC"],
          value: 4,
          type: "Courses"
        },
        {
          name: "Complementary Electives",
          labels: ["complementaryCredits"],
          value: 9,
          type: "Credits"
        }
      ]
    }
  },
  mutations: {
    updateProgressSidebar(state, value) {
      state.showProgressSidebar = value
    },
  },
  actions: {
  },
  getters: {
    showProgressSidebar: state => state.showProgressSidebar,
  },
})
