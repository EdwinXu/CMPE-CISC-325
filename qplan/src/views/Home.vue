<template>
  <div>
    <v-expansion-panels multiple v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header class="headline">Completed Courses</v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  }
};
</script>
