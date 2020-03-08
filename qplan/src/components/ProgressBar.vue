<template>
  <div>
    <v-card class="mb-2" rounded>
      <v-progress-linear buffer-value="50" height="25" value="75" striped color="green">
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