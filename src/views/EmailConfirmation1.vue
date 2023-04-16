<template>
    <div class="main">
        <h1>{{message}}</h1>
        <br>
        <a CLASS="btn btn-outline-light" href="/home">HOME</a>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'EmailConfirmation1',
        data() {
            return {
                id: this.$route.params.id,
                message: ''
            }
        },
        created(){
            axios.get(process.env.VUE_APP_API_URL + "/user/emailconfirmation/"+this.id).then(res => {
                if(res.data.msg == 'success'){
                    alert('email confirmado com sucesso, já pode realizar seu login');
                    this.message = 'email confirmado com sucesso, já pode realizar seu login';
                }else{
                    alert("aconteceu algum erro tente novamente ou recupere sua senha para confirmar novamente");
                }
            }).catch(error => {
                console.log(error);
            });
        }
        

    }
</script>

<style scoped>
.main{
    min-width: 100vw;
    min-height: 100vh;
    background: url('../assets/bg1.jpg');
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>