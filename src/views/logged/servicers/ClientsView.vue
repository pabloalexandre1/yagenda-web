<template>
    <div class="main">
        <ServicerNavbar></ServicerNavbar>
        <div class="solicitations1">
            <div class="container container-solicitations">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div style="background: #2121219d;" class="col-md-8 main-solicitations">
                        <div>
                            <h1>Solicitações: <span>{{solicitations.length}}</span></h1>
                            <div class="solicitations">
                                <div v-for="solicitationn in solicitations" :key="solicitationn.email" class="solicitation">
                                    <p>Nome: {{solicitationn.name}}</p>
                                    
                                    <button v-on:click="solicitation('accept', solicitationn.email)" class="btn btn-success">Aceitar</button>
                                    <button v-on:click="solicitation('reject', solicitationn.email)" class="btn btn-danger">Recusar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8 clients">
                    <h1>Meus Clientes</h1>
                    <div class="clients-list">
                        <div v-for="client in accepteds" :key="client.email" class="clients-area">
                            <p>Nome: {{client.name}}</p>
                            <p>email: {{client.email}}</p>
                            <button v-on:click="deleteClient(client.email)" class="btn btn-danger">Remover</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ServicerNavbar from '../../../components/ServicerNavbar.vue'
import axios from 'axios'

export default {
    name: 'ClientsView',
    components: {
        ServicerNavbar
    },
    data() {
        return {
            rawClients: [],
            solicitations: [],
            accepteds: [],
            l: 0,
            i: 0
        }
    },
    created() {
        this.resetClients();
    },

    methods: {
        resetClients: function() {
           axios.get(process.env.VUE_APP_API_URL + "/servicer/clients", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
        }).then(res => {
            if(res.data.msg == 'success'){
                this.rawClients = res.data.clients;
                this.solicitations = [];
                this.accepteds = [];
                
                this.l = this.rawClients.length;
                for(this.i = 0; this.i < this.l; this.i++){
                    if(this.rawClients[this.i].accepted == 'no'){
                        this.solicitations.push(this.rawClients[this.i]);
                    }
                    if(this.rawClients[this.i].accepted == 'yes'){
                        this.accepteds.push(this.rawClients[this.i]);
                    }
                }
                
            }else{
                console.log(res.data.error);
            }
        }).catch(err => {
            console.log(err);
        }); 

        },

        solicitation: function(action, email) {
            axios.put(process.env.VUE_APP_API_URL + "/servicer/solicitations", {
                action: action,
                email: email
            },{
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                console.log(res.data);
                if(res.data.msg == 'success'){
                    alert("cliente adicionado");
                    this.resetClients();
                }
                
            }).catch(err => {
                console.log(err);
            });
        },

        deleteClient: function(clientEmail) {
            axios.delete(process.env.VUE_APP_API_URL + "/servicer/user", {
                data: {clientEmail},
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    alert("deletado com sucesso");
                    this.resetClients();
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

}
</script>

<style scoped>
/* types */

h1 {
    color: #bea562;
    text-align: center;
    border-bottom: solid 3px #bea562;
    border-radius: 15px;
    box-shadow: 1px 1px 10px black;
}
p {
    color: silver;
    text-align: center;
    background: #212121;
    border-radius: 5px;
    box-shadow: 1px 1px 10px black;
}

span {
    color: #212121;
    background: #bea562;
    border-radius: 13px;
}
/* end of types */
.main {
    padding-bottom: 30px;
    background: url('../../../assets/bg-login.jpg');
    background-size: cover;
    background-position:top;
    min-height: 100vh;
    overflow-x: hidden;
}

.solicitations1 {
    
    min-height: 50px;
    
}

.container-solicitations {
    padding: 5px;
    
}
.main-solicitations {
    background: rgba(43, 43, 43, 0.904);
    padding: 5px;
}

.solicitations {
    display: flex;
    overflow-x: scroll;
    padding: 6px;
    justify-content: center;
    
}

.solicitation {
    margin: 10px;
    background: #bea562;
    border-radius: 12px;
    padding: 7px;
    box-shadow: 1px 1px 10px black;
}

.solicitations button {
    margin-left: 7px;
    margin-right: 7px;
}

.clients {
    background: #2121219d;

}
.clients-list {
    display: flex;
    flex-direction: column;
    max-width: 100vh;
    overflow-y: scroll;
    
}
.clients-area {
    background: #bea562;
    border-radius: 10px;
    box-shadow: 1px 1px 10px black;
    margin: 12px;
    padding: 7px;
    display: flex;
    flex-direction: column;
    
}
.clients-area button {
    box-shadow: 1px 1px 10px black;
}
.clients h1 {
    background: #212121dc;
}
</style>