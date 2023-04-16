<template>
  <div class="home">
    <navbarHome></navbarHome>
    <div class="d-flex justify-content-center">
  
        <div v-if="userOrServicer == 'user'" class="select-role">
          <a v-on:click="toggleUserServicer()" href="#" class="select-business">Negócio</a>
          <a href="#" class="select-customer">Cliente</a>
        </div>
  
        <div v-if="userOrServicer == 'servicer'" class="select-role">
          <a href="#" class="select-customer">Negócio</a>
          <a v-on:click="toggleUserServicer()" href="#" class="select-business">Cliente</a>
        </div>
      
      
    </div>
    <div v-if="userOrServicer == 'user'" class="section2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 d-flex justify-content-center align-items-center" style="padding: 50px;">
            <img style="max-width: 200px;" src="../assets/conforto-verified.png" alt="">
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column align-items-center justify-content-center">
              <h1 class="h12">PRIORIZE SEU CONFORTO.</h1>
              <br>
              <p class="p2">
                Não pegue filas de espera para ser atendido(a)! Marque seus horários de casa, e vá somente
                na hora marcada.
              </p>
              <a href="/login" class="btn" id="main-btn2">LOGIN</a>
              <a href="/register" class="btn" id="main-btn2">REGISTRE-SE</a>

            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div v-if="userOrServicer == 'servicer'" class="section2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 d-flex justify-content-center" style="padding: 50px;">
            <img src="../assets/barber-icon-2.jpg" alt="" class="img-fluid">
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column align-items-center">
              <h1 class="h12">ALAVANQUE-SE!</h1>
              <br>
              <p class="p2">
                Comodidade para você e para o seu cliente!
              </p>
              <a href="/servicer/login" class="btn" id="main-btn2">LOGIN</a>
              <a href="/servicer/register" class="btn" id="main-btn2">CADASTRE-SE</a>

            </div>
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

import navbarHome from '../components/NavbarHome.vue';

export default {
  name: 'HomeView',
  components: {
    navbarHome
  },
  data () {
    return {
      userOrServicer: 'user'
    }
  },
  methods: {
    toggleUserServicer: function() {

      if(this.userOrServicer == 'user'){
        this.userOrServicer = 'servicer';
      }else{
        this.userOrServicer = 'user';
      }
    }
  }
}
</script>

<style scoped>

.select-business {
  padding: 15px;
  color: #bea562;
}
.select-customer {
  padding: 15px;
  background: #bea562;
  color: #212121;
}
.select-role {
  margin-top: 30px;
  background: #212121;
  border: solid 3px #bea562;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  
}
/* section 1 specifics e some generals */
a{
  text-decoration: none;
}
.section1 {
  background-image: url('../assets/bg1.png');
  background-position: center;
  background-size: cover;
  
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 3px solid #bea562;

}
h1 {
  color: white;

}

p {
  color: white;
  text-shadow: 2 2 10;
  background: rgb(21, 21, 21, 0.8);
}

#main-btn {
        color: white;
        background: #212121;
        margin: 10px;
    }

#main-btn:hover {
        color: silver;
}

#main-btn2 {
        color: #212121;
        background: #bea562;
        margin: 10px;
    }

#main-btn2:hover {
        color: silver;
}

/* section 2 specifics */
.home {
  background-image: url("../assets/bg2.png");
  background-size: cover;

}
.section2 {
  

  padding-left: 15px;
  padding-right: 15px;
  min-height: 100vh;
}

.h12 {
  color: #bea562;

}

.p2 {
  color: #bea562;
}
</style>
