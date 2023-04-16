<template>
<div class="main-of-all">
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8 main">
                    <br>
                    <img class="img-fluid" src="../assets/yawlogo.png" alt="">
                    <h1>Digite a nova senha</h1>
                    <input v-model="password1" class="form-control" type="password" name="password" id="password">
                    <br>
                    <h1>Digite novamente a nova senha</h1>
                    <input v-model="password2" class="form-control" type="password" name="password2" id="password2">
                    <br>
                    <button v-on:click="savePassword" class="btn btn-success">Salvar</button>
                    
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

    export default {
        name: 'DefinePassword',
        data () {
            return {
                password1: '',
                password2: ''
            }
        },
        methods: {
            savePassword: function() {
                var passwordV1 = this.password1.trim();
                var passwordV2 = this.password2.trim();

                if(passwordV1 == '' || passwordV2 == ''){
                    alert('a senha não pode ser vazia')
                    
                }else{
                    if(passwordV1.length < 7 || passwordV2.length < 7){
                        alert('a senha precisa ter ao menos 6 dígitos')
                    }else{
                        if(passwordV1 != passwordV2){
                            alert('as senhas digitadas não conferem entre si');
                        }else{
                            axios.put(process.env.VUE_APP_API_URL + "/user/define-password",{
                                email: this.$route.params.email,
                                number: this.$route.params.number,
                                date: this.$route.params.date,
                                status: this.$route.params.status,
                                password: passwordV1
                            }).then(res => {
                                if(res.data.msg == 'success'){
                                    alert('senha alterada com sucesso');
                                    this.$router.push('/');
                                }
                            }).catch(error => {
                                alert(error);
                                console.log(error.message);
                            });
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
.main-of-all {
    background: url('../assets/bg1.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    min-width: 100vw;
    padding-top: 25vh;
}

.main {
    background: #212121;
    padding: 25px;
    border-radius: 15px;
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
}

h1 {
    color: #bea562;
    border-bottom: solid 2px #bea562;
    padding: 15px;
    border-radius: 15px;
}

input {
    max-width: 400px;
}

button {
    font-size: 25px;
}
img {
    max-height: 350px;
}
</style>