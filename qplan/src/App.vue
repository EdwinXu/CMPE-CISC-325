<template>
  <v-app id="qplan">
    <Header />
    <ProgressSidebar />
    <RecentSidebar />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import ProgressSidebar from "./components/layout/ProgressSidebar";
import RecentSidebar from "./components/layout/RecentSidebar";

export default {
  name: 'App',

  components: {
    Header,
    ProgressSidebar,
    RecentSidebar,
  },

  data: () => ({
  }),
};
</script>

<style>
/* Remove the underline and blue color from links */
.v-application a {
  text-decoration: none;
  color: black !important;
}
</style>