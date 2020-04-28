<template v-slot:default>
    <div>
        <v-simple-table>
            <thead>
            <tr>
                <th style="display:hidden">#</th>
                <th class="text-left">Encargado</th>
                <th class="text-left">Tarea</th>
                <th class="text-left">Estado</th>
                <th class="text-left">Horas</th>
                <th class="text-left">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tareas" :key="item.id">
                <td>{{ index+1 }}</td>
                <td>{{ item.encargado }}</td>
                <td>{{ item.descripcion }}</td>
                <td>{{ item.estado }}</td>
                <td>{{ item.horas }}</td>
                <td>
                <v-btn class="mx-2" fab dark small color="teal">
                    <v-icon dark @click="deleteTarea(item)">mdi-delete</v-icon>
                </v-btn>
            </td>
            </tr>
            </tbody>
            <v-btn class="mx-2 text-center" fab dark small color="indigo" @click="dialog = true">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </v-simple-table>
        <!-- MODAL PARA AGREGAR TAREAS  -->
        <v-dialog max-width="50%" v-model="dialog">
            <v-card>
                <v-container>
                    <h1>Agregar Tarea</h1>
                    <v-form @submit.prevent="">
                        <v-text-field type="text" label="Nombre Encargado" v-model="encargado"></v-text-field>
                        <v-text-field type="text" label="Tarea" v-model="tarea"></v-text-field>
                        <v-text-field type="text" label="Estado" v-model="estado"></v-text-field>
                        <v-text-field type="number" label="Horas Estimadas" v-model="horas"></v-text-field>
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="setTareas()"
                        > 
                            Ingresar Tarea
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mr-4"
                            @click="stopModal()"
                        > 
                            Cerrar
                        </v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {db} from '../main'
export default {
   data : function(){
        return {

            // VARIABLES PARA AGREGAR UN EVENTO //
            dialog : false,
            encargado : null,
            tarea : null,
            estado : null,
            horas : null,
            /////////////////////////////////////

            headers : [
            {
                text : "Descripcion",
                align : "start",
                sortable : false,
                value : "descripcion"
            },
            {text:'Encargado', value : 'encargado'},
            {text:'Estado', value : 'estado'},
            {text:'Horas', value : 'horas'}
            ],
            tareas : []
        }
   },
   mounted(){
       this.getTareas();
   },
   methods : {
       async setTareas(){
           try{
               if(this.encargado && this.tarea && this.estado && this.horas){
                   await db.collection('tareas').add({
                       encargado : this.encargado,
                       descripcion : this.tarea,
                       estado : this.estado,
                       horas : this.horas
                   });

                    this.getTareas() // -> Cuando se agreguen los datos, se vuelve a llenar nuestro array
                    this.clearVars() // -> Limpiamos las variables

               }else{
                   console.log("Campos Vacios")
               }
           }catch(error){
               console.log(error)
           }
           this.stopModal();
       },
       async getTareas(){
           try{
               const snapshot = await db.collection('tareas').get();
               const datos = [];
               snapshot.forEach(doc => {
                   let tareaData = doc.data();
                   tareaData.id = doc.id;
                   datos.push(tareaData); // GUARDAMOS LA INFO DE LA DB EN TAREAS ARRAY
               })
               this.tareas = datos
           } catch (error){
               console.log(error)
           }
       },
       async deleteTarea(item){
           try{
               await db.collection('tareas').doc(item.id).delete();
           }catch(error){
               console.log(error)
           }
           this.getTareas();
       },
       stopModal(){
           //FUNCION QUE CONDICIONA APERTURA DE MODAL
           this.dialog = false
       },
       clearVars(){
           //LIMPIAMOS LAS VARIABLES PARA QUE EN EL MODAL NO APAREZCAN ESCRITAS
           this.tareas = null
           this.encargado = null
           this.horas = null
           this.descripcion = null
       }
   }
}
</script>