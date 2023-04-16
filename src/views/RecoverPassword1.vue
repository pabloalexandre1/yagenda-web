<template>
    <div class='main'>
        <NavbarHome></NavbarHome>
        <h1>Insira o e-mail da conta que deseja recuperar a senha</h1>
        <br>
        <input v-model="email" class="form-control" type="email" name="email" id="" placeholder="email@example.com">
        <br>
        <button v-on:click="sendRecoverLink" class="btn btn-success">Recuperar Senha</button>
    </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome.vue'
import axios from 'axios'

    export default {
        name: 'recover-password1',
        components: {
            NavbarHome
        },
        data() {
            return {
                email: ''
            }
        },
        methods: {
            sendRecoverLink: function() {
                axios.post(process.env.VUE_APP_API_URL + "/user/recover-password", {
                    email: this.email
                }).then(res => {
                    if(res.data.msg == 'success'){
                        alert('link para recuperação de senha foi enviado ao seu Email com sucesso');
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }
        
    }

</script>

<style scoped>
.main{
    min-width: 100vw;
    min-height: 100vh;
    background: url('../assets/bg1.jpg');
    background-size: cover;
    background-position: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input{
    max-width: 350px;
    box-shadow: 0px 0px 15px black;
}

h1{
    color: #bea562;
    text-align: center;
    text-shadow: 1px 1px 10px black;
    background: #212121;
    padding: 10px;
    box-shadow: 1px 1px 10px black;
    border-radius: 8px;

}

button{
    box-shadow: 1px 1px 10px black;
}
</style>