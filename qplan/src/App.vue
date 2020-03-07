<template>
  <v-app id="qplan">
    <Header />
    <ProgressSidebar />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import ProgressSidebar from "./components/layout/ProgressSidebar";


export default {
  name: 'App',

  components: {
    Header,
    ProgressSidebar
  },

  data: () => ({
  }),
};
</script>
