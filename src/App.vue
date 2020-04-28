<template>
  <v-app>
    <div class="container">
      <Tareas/>
    </div>
  </v-app>
</template>

<script>
import Tareas from './components/Tareas'
export default {
  name: 'App',

  components: {
    Tareas
  },

  data: () => ({
    //
  }),
};
</script>
