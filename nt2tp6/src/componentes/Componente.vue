<template>

  <section class="src-componentes-componente">
    <div class="jumbotron">
      <h2>Componente muestreo de datos mockapi</h2>
      <hr>

      <!--TABLA -->
      <div v-if="usuarios.length == 0">
        <h4 class="alert alert-warning">No se ingresaron usuarios</h4>
      </div>

      <div v-if="usuarios.length" class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Correo Electronico</th>
          </tr>
          <tr v-for="(usuario, index) in usuarios" :key="index">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombre }}</td>
           <td>{{ usuario.edad }}</td> 
            <td>{{ usuario.email }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>


<script>

  export default  {
    name: 'src-componentes-formulario',
    props: [],
    mounted () {
         this.getPostAxios()
    },
    data () {
      return {
        formstate: {},
        formData : this.getInitialData(),
        usuarios : [],
          url: 'https://61902556f6bf450017484b6f.mockapi.io/usuarios2',
          peticion: false
      }
    },
    methods: {
      getInitialData(){
        return {
          nombre: '',
          edad: null,
          email: null,
        }
      },

      async getPostAxios() {
        try {
          let respuesta = await this.axios(this.url)
         this.usuarios = respuesta.data
         this.peticion = false
        }
        catch(err) {
              console.error(err)
         }
      },
        
    },
    computed: {
      
    }
}

</script>





<style scoped lang="css">
  .src-componentes-componente {

  }

    .jumbotron {
    background-color: lightgray;
    color: black;
  }

  hr {
    background-color: #fff;
  }

  pre {
    color: white;
  }
</style>