<template>

  <section class="src-componentes-formulario">
    <div class="jumbotron">
      <h2>Formulario ingreso de datos</h2>
      <hr>

      <vue-form :state="formstate" @submit.prevent="enviar()">
       
        <!-- Campo NOMBRE -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model.trim="formData.nombre" required minlength="5" maxlength="15" name="nombre" autocomplete="off" class="form-control" />
    
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="minlength" class="alert alert-danger mt-1">Este campo debe poseer al menos 5 caracteres</div>
            <div v-if="formData.nombre && (formData.nombre.length == 15)" class="alert alert-danger mt-1">Este campo debe poseer como máximo 15 caracteres</div>
          </field-messages>
        </validate>
        <br>
        
        <!-- Campo EDAD -->
        <validate tag="div">
          <label for="edad">Edad</label>
          <input type="number" id="edad" v-model.number="formData.edad" required name="edad" autocomplete="off" class="form-control" />
    
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div v-if="formData.edad && (formData.edad < 18)" class="alert alert-danger mt-1">La edad mínima admitida es de 18 años</div>
            <div v-if="formData.edad && (formData.edad > 120)" class="alert alert-danger mt-1">La edad máxima admitida es de 120 años</div>
          </field-messages>
        </validate>
        <br>

        <!-- Campo EMAIL -->
        <validate tag="div">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required name="email" autocomplete="off" class="form-control" input="formDirty.email=true" />
    
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Este campo es obligatorio</div>
            <div slot="email" class="alert alert-warning mt-2">Ingrese un e-mail válido</div>
          </field-messages>
        </validate>

        <br>
        
        <button class="btn btn-success my-3" :disabled="formstate.$invalid" type="submit">Enviar</button>
      </vue-form>
      <br>
      <hr>

      <!--TABLA -->
      <br>
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

      enviar(){
        let usuario = { ...this.formData }
        this.formData =this.getInitialData()
        this.formstate._reset()
        
        let usuarioAlta = {
          nombre: usuario.nombre,
          edad: usuario.edad,
          email: usuario.email
        }
        console.log(usuario)
        this.postUsuario(usuarioAlta)
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

      async postUsuario(usuarioAlta) {
        this.peticion = true
        try {
          let { data: user } = await this.axios.post(this.url, usuarioAlta, {'content-type':'application/json'});
          this.usuarios.push(user)
          this.peticion = false
        }
        catch(err ) {
          console.error(err)
        }
      }
        
    },
    computed: {
      
    }
}

</script>






<style scoped lang="css">

  .src-componentes-formulario {
  }

    .jumbotron {
    background-color: lightgray;
    color: black;
  }

</style>