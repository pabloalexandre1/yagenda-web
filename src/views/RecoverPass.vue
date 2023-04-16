<template>
    <div class="main">
        <NavbarHome></NavbarHome>
        <div class="container">
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-8 email-form-main">
                    <h1>Qual email da conta à qual deseja recuperar a senha?</h1>
                    <label for="email">Email</label>
                    
                    <br>
                    <input v-model="email" type="email" name="email" id="email" class="form-control" placeholder="email.email@example.com">
                    <br>
                    <br>

                    <button class="btn btn-success">Recuperar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'

export default {
    name: 'RecoverPass',
    components: {
        NavbarHome
    },
    data() {
        return {
            email: ''
        }
    },
    methods: {
        sendRecover: function(){

        }
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    min-width: 100vw;
    background: url('../assets/bg1.jpg');
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.email-form-main {
    background: #212121;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


h1 {color: #bea562; text-align: center;}

label {
    color: white;

}
</style>