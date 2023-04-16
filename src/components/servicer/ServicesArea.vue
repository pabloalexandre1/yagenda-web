<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8 service-area">
                <h2>Seus serviços</h2>
                <div class="add-button-bg">
                    <div class="add-button">
                        <a v-if="formIsOpen == false" v-on:click="toggleForm" href="#"><h1>+</h1></a>
                        <a v-if="formIsOpen == true" v-on:click="toggleForm" href="#"><h1>-</h1></a>
                    </div>    
                </div>
                <div v-if="formIsOpen == true" class="add-service-form">
                    <label for="title">Nome ou Descrição do serviço</label>
                    <input v-model="serviceDescription" class="my-form form-control" type="text" name="title" id="" placeholder="ex: corte de cabelo">
                    <label for="minutes">Tempo de duração (Em Minutos)</label>
                    <input v-model="time" class="my-form form-control" type="number" name="minutes" id="" placeholder="tempo em minutos">
                    <a v-on:click="addService" href="#" class="my-button btn btn-outline-light">adicionar</a>
                </div>
                <div class="d-flex justify-content-center">
                    <a v-if="showServices == false" v-on:click="toggleShowServices" href="#" class="btn my-button">Mostrar</a>
                    <a v-if="showServices == true" v-on:click="toggleShowServices" href="#" class="btn my-button">Ocultar</a>
                </div>
                <div v-if="showServices == true" class="defined-services">
                    <div v-for="service in services" :key="service._id" class="service-unit">
                        <div class="service-sub-div">
                            <h3>{{service.description}}</h3>
                        </div>
                        <div class="service-sub-div">
                            <p>{{service.time}} minutos</p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <a style="margin-top: 10px;" v-on:click="deleteService(service._id)" href="#" class="btn btn-danger">Excluir</a>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>


import axios from 'axios'

    export default {
        name: 'ServiceArea',
        data() {
            return {
                serviceDescription: '',
                time: '',
                formIsOpen: false,
                services: {},
                showServices: false
            }
        },
        created() {
            axios.post(process.env.VUE_APP_API_URL + "/getservices",{},{
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.msg == 'success'){
                            this.services = res.data.services;
                        }else{alert("houve um erro ao acessar seus serviços")}
                        
                    }).catch(err => {
                        alert(err.message);
                    });
        },
        methods: {
            addService: function(){
                if(this.serviceDescription.trim() != '' && this.time > 0 ){
                    
                    
                    axios.post(process.env.VUE_APP_API_URL + "/service",{
                        serviceDescription: this.serviceDescription,
                        time: this.time
                    },{
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }).then(res => {
                        if(res.data.msg == "success"){
                            axios.post(process.env.VUE_APP_API_URL + "/getservices",{},{
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                                }
                            }).then(res => {
                                console.log(res.data);
                                if(res.data.msg == 'success'){
                                    this.services = res.data.services;
                                }else{
                                    alert("ocorreu um erro ao atualizar seus serviços");
                                }
                                
                                
                            }).catch(err => {
                                alert(err.message);
                            });
                            
                            alert("adicionado com sucesso");
                        }
                    }).catch(err => {
                        alert(err.message);
                    });

                }else{
                    alert("formulário está vazio");
                }
                
            },


            toggleForm: function() {
                if(this.formIsOpen){
                    this.formIsOpen = false;
                }else{
                    this.formIsOpen = true;
                }
            },


            toggleShowServices: function() {
                if(this.showServices){
                    this.showServices = false;
                }else{
                    this.showServices = true;
                }
            },


            deleteService: function(id) {
                axios.delete(process.env.VUE_APP_API_URL + "/service",{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    data: {
                        id: id
                    }
                },).then(res => {
                    if(res.data.msg == 'success'){
                        this.services = this.services.filter(service => service._id != id);
                        alert('deletado com sucersso');
                    }else{
                        alert("ocorreu algum erro na tentativa, tente novamente mais tarde");
                    }
                    
                }).catch(err => {
                    alert(err.message);
                });
            }
        }
    }
</script>

<style scoped>
.service-area {
    background: #2121219d;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: solid 5px #bea562;
}
a {
    text-decoration: none;
}
h2 {
    text-align: center;
    color: #bea562;
    background: #212121;
    border-bottom: solid 3px #bea562;
    border-radius: 15px;
}
.add-button-bg {
    background: #212121;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
    border-bottom: solid 3px #bea562;
    box-shadow: 2px 2px 10px black;
    
    
}
.add-button {
    background: #bea562;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items:center;
    padding-bottom: 14px;
    padding-left: 2px;
}
/* ---------------------------------------- */
.add-service-form {
    display: flex;
    flex-direction: column;
    background-color: #212121;
    border-radius: 0px 0px 15px 15px;
    
}
.my-form:focus {
    border-right: solid 10px #bea562;
    box-shadow: none;
}
.my-form {
  width: 90%;
  margin: auto;  
}
label {
    color: #bea562;
    margin: 8px;
    text-align: center;
}
.my-button {
    color: #bea562;
    border-color: #bea562;
    margin: 10px;
}
.my-button:hover {
    background-color: #bea562;
    border-color: #212121;
    color: #212121;
}
h1 {
    text-align: center;
    font-size: 100px;
    color: white;
    
}

/* ---------------defined services ---------------- */

.defined-services {
    background: #212121;
    padding: 15px;
    border-radius: 15px;
    border-top: solid 3px #bea562;
    padding-left: 25%;
    padding-right: 25%;
}

.service-unit {
    background: #3d3d3d;
    border-radius: 15px;
    margin: 12px;
    padding: 5px;
    padding-right: 45px;
    padding-left: 45px;
    box-shadow: 1px 1px 10px black;
}

.service-unit p {
    text-align: center;
    color: white;
}

.service-unit h3 {
    text-align: center;
    color: white;
}


.service-sub-div {
    border-radius: 4px;
    border-bottom: solid 3px silver;
}

</style>