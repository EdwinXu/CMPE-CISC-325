<template>
  <div>
    <v-card class="mb-2" rounded>
      <v-progress-linear buffer-value="75" height="25" value="50" striped color="indigo lighten-3">
        <span>75/100 Credits</span>
      </v-progress-linear>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProgressBar"
};
</script>

<style>
</style>