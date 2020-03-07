<template>
  <v-app id="qplan">
    <Header />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
  }),
};
</script>
