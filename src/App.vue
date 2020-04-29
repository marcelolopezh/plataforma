<template>
  <v-app>
    <div class="container">
      <h1 class="text-center col-md-12">Tareas Administrativas</h1>
      <hr>
      <Tareas/>

      <hr>
    </div>
  </v-app>
</template>

<script>
import Tareas from './components/Tareas'
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',

  components: {
    Tareas,
    HelloWorld
  },

  data: () => ({
    //
  }),
};
</script>
