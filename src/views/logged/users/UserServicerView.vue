<template>
<div class="main-div">
    <LoggedNavbar></LoggedNavbar>
    <br>
    <br>
    <div class="servicer-profile container">
        <div class="row">
            <div class="col-md-6" style="box-shadow: 1px 1px 10px black; margin-bottom: 50px;">
                <h2 style="box-shadow: 1px 1px 10px #bea562;">{{servicer.name_business}}</h2>
                <p>dono: {{servicer.name}}</p>
                <div style="padding: 2px;">
                    <div>
                        <h3>Endereço</h3>
                        <p>Estado: {{servicer.address.state}}</p>
                        <p>Cidade: {{servicer.address.city}}</p>
                        <p>Bairro: {{servicer.address.district}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6" style="box-shadow: 1px 1px 10px black;">
                <h1>serviços:</h1>
                <div v-on:click="switchServices" class="d-flex justify-content-center">
                    <a href='#' style="text-decoration: none; text-align: center; font-size: 37px; border-radius: 50%; border-bottom: 3px solid #bea562; color: #bea562">+</a>
                </div>
                
                <div v-if="showServices == true">
                    <div  class="service-area" v-for="service in servicer.services" :key="service.time" >
                        <p>{{service.description}}</p>
                        <p>{{service.time}} minutos</p>
                    
                    </div>
                </div>
                
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h1>horários</h1>

                <div class="schedule-area">
                    
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>

import LoggedNavbar from '../../../components/LoggedNavbar.vue'
import axios from 'axios'

export default {
    name: 'UserServicerView',
    components: {
    LoggedNavbar
},
    data() {
        return {
            servicer: {},
            servicerEmail: this.$route.params.email,
            showServices: false
        }
    },
    created() {
        console.log(this.$route.params.email);
        axios.get(process.env.VUE_APP_API_URL + "/servicer/email/" + this.servicerEmail,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
        }).then(res => {
            console.log(res.data);
            if(res.data.msg == 'success'){
                this.servicer = res.data.servicer;
                console.log(this.servicer);
            }else{
                alert(res.data.error);
                this.$router.push("/");
            }
            
            
        }).catch(err => {
            alert(err);
        });
        
    },
    methods: {
        switchServices: function() {
            if(this.showServices == true){
                this.showServices = false;
            }else{
                this.showServices = true;
            }
        }
    }

}
</script>

<style scoped>
h1{
    color: #bea562;
    border-bottom: solid 2px #bea562;
    border-radius: 4px;
    text-align: center;
}
h2{
    color: #bea562;
    border-bottom: solid 2px #bea562;
    border-radius: 4px;
    text-align: center;
}
h3{
    color: #bea562;
    border-bottom: solid 2px #bea562;
    border-radius: 4px;
    text-align: center;
}
p{
    color: #bea562;
    text-align: center;
}
.main-div{
    background: url('../../../assets/bg1.jpg');
    background-size: cover;
    background-position: center;
    padding-bottom: 300px;
}
.servicer-profile{
    background: #212121;
    border-radius: 15px;
}
.half-profile{
    border-bottom: 3px solid, white;
    border-radius: 15px;
}
.service-area{
    margin: 5px;
    box-shadow: 1px 1px 10px #bea562;
    border-radius: 15px;
}
</style>