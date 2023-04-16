<template>
    <div id="main">
        <LoggedNavbar></LoggedNavbar>
        <div class="over-bg">
            <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        
                    </div>
                    <div class="col-md-8">
                        
                    </div>
                </div>
                <div class="row" style="padding: 15px;">
                    <h1>Negócios adicionados</h1>
                    <div class="col-md-2"></div>
                    <div class="col-md-8 services-area">
                
                        <div v-for="servicer in servicers" :key="servicer.email" class="servicer-div">
                            <p>{{servicer.name_business}}</p>
                            <a v-on:click="openSchedule(servicer)" href="#" class="btn btn-warning" style="margin-bottom: 7px;">Ver Agenda</a>
                            <a :href="'/user/servicerview/'+servicer.email" class="btn btn-primary">Ver Perfil</a>
                            <br>
                            <button v-on:click="deleteServicer(servicer.email)" class="btn btn-danger">Remover</button>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding: 15px;">
                    <div class="col-md-3"></div>
                    <div class="col-md-6 d-flex flex-column align-items-center" style="box-shadow: 1px 1px 5px #bea562; background: #212121; border-radius: 15px; padding: 10px;">
                        <h1>Adicionar novo negócio</h1>
                        <br>
                        
                        <label>Insira o Email do negócio que deseja adicionar:</label>
                        
                        
                        <input v-model="email" style="max-width: 300px;" class="form-control" type="search" name="search-business" placeholder="Email do negócio desejado" id="">
                        <button v-on:click="sendSolicitation" style="margin-top: 10px;" class="btn btn-outline-light">Adicionar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">

                    </div>
                    <div class="col-md-6">
                        <h1>Horários Marcados</h1>
                    </div>
                </div>
                <div class="row" style="padding: 15px;">
                    <div class="col-md-3"></div>
                    <div class="col-md-6 scheduled-area">
                        
                        <div class="d-flex">
                            <div v-for="item in scheduled" :key="item.time" class="scheduled-unit">
                                <h3>{{item.description}}</h3>
                                <h4>{{item.servicer}}</h4>
                                <h3>{{minutesToHour(item.time)}}</h3>
                                <h4>{{item.date}}</h4>
                                <button v-on:click="deleteScheduled(item)" class="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="openForm == true" class="add-service-bg">
                <div class="add-service-main">
                    <h1>Agenda de {{selectedServicer.name_business}}</h1>
                    <div style="width: 100%; border-bottom: 5px solid #212121; height: 30px; border-radius: 10px;"></div>
                    <div class="select-day-div">
                        <div v-for="day in actualWeek" :key="day" class="day-to-select">
                            <a v-on:click="setSelectedDay(day)" style="text-decoration:none; color: #212121;" href="#"><h4>{{convertDay(day)}}</h4></a>
                            <div v-if="day == selectedDay" style="width: 100%; height: 4px; background: #bea562;"></div>
                        </div>
                    </div>

                    <div style="margin: 10px;" class="d-flex justify-content-center close-button-area">
                        <button v-on:click="closeSchedule()" class="btn btn-danger">Fechar</button>
                    </div>

                    <h1>horários disponíveis</h1>
                    <div v-if="selectedServicer.rawWeek[selectedDay].isOpen == true" class="schedule-area">
                        <div class="inside-schedule-area" v-for="item in selectedServicer.schedule[selectedDay]" :key="item">
                            <div v-if="item.available == 'yes'" class="inside-schedule-item">
                                <h2 v-on:click="openSchedule2(item.minutes)">{{minutesToHour(item.minutes)}}</h2>
                            </div>
                            <div v-if="item.available == 'no'" class="inside-schedule-denied">
                                <h2>{{minutesToHour(item.minutes)}}</h2>
                            </div>
                        </div>
                    </div>
                    <div v-if="openForm2 == true && selectedServicer.rawWeek[selectedDay].isOpen == true" class="open-form-2 d-flex" style="flex-direction: column; align-items: center; justify-content: center;">
                        <h1 style="margin: 20px;">agendar serviço para as {{minutesToHour(selectedService.hour)}}</h1>
                        <label style="color: #212121; box-shadow: 1px 1px 10px black; border-radius: 4px; padding: 6px;" for="select-service">escolha o serviço</label>
                        <select v-model="selectedService.description" style="margin: 20px; width: 65%; border-radius: 8px;" name="service" id="select-service">
                            <option v-for="item in selectedServicer.services" :key="item" :value="item.description + '/' + item.time">{{item.description}}</option>
                        </select>
                        
                        <button v-on:click="saveScheduled" style="margin: 20px;" class="btn btn-success">Agendar</button>
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
    name: 'LoggedHome',
    components: {
    LoggedNavbar
},  data() {
    return {
        servicers: [],
        email: '',
        scheduled: [],
        selectedServicer: {
            name_business: 'empty',
            name: 'empty2',
            email: ''

        },
        newDay: '',
        actualWeek: [],
        selectedDay: 0,
        openForm: false,
        weekDates: [],
        openForm2: false,
        selectedService: {
            description: '',
            hour: 0,
            minutes: 0,
        }
    }
},
    methods: {
        setServices: function() {
            axios.get(process.env.VUE_APP_API_URL + "/user/getservices", {
                data: {},
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                console.log(res.data);
                if(res.data.msg == 'success'){
                    this.servicers = res.data.servicers
                }else{
                    console.log(res.data.error);
                }
                console.log(this.servicers);
            }).catch(err => {
                console.log(err);
            });
        },
        
        sendSolicitation: function() {
            axios.post(process.env.VUE_APP_API_URL + "/user/solicitation", {
                email: this.email,
                name: localStorage.getItem('name')
            }, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    alert('adicionado com sucesso');
                }else{alert(res.data.error); console.log(res.data.error)}
            }).catch(err => {
                console.log(err);
                alert(err);
            });
        },

        deleteServicer: function(email) {
            axios.delete(process.env.VUE_APP_API_URL + "/user/servicer", {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
                data: {
                    email: email
                }
            }).then(res => {
                if(res.data.msg == 'sucess'){
                    alert("removido com sucesso");
                }else{
                    alert(res.data.error);   
                }

                this.setServices();
            }).catch(err => {
                console.log(err);
            })
        },

        setScheduled: function() {
            axios.get(process.env.VUE_APP_API_URL + "/user-scheduled", {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    this.scheduled = [];
                    console.log(res.data.scheduled);
                    
                    var length = res.data.scheduled.length;
                    for(var u = 0; u < length; u++){
                        for(var t = 0; t < 7; t++){
                            if(res.data.scheduled[u].date == this.weekDates[t]){
                                this.scheduled.push(res.data.scheduled[u]);
                            }
                        }
                    }
                    
                }
            }).catch(error => {
                console.log(error);
            })
        },

        convertDay: function(day) {
            
            switch(day){
                case 0: this.newDay = 'dom'; break;
                case 1: this.newDay = 'seg'; break;
                case 2: this.newDay = 'ter'; break;
                case 3: this.newDay = 'qua'; break;
                case 4: this.newDay = 'qui'; break;
                case 5: this.newDay = 'sex'; break;
                case 6: this.newDay = 'sab'; break;
            }

           

            return this.newDay;
        },

        setActualWeek: function(){
            this.actualWeek = []
            var newDate = new Date();
            var initialDay = newDate.getDay();
            this.selectedDay = initialDay;
            
            if(initialDay == 0){
                for(var i = 0; i < 7; i++){
                    this.actualWeek.push(i);
                }
            }else{
                if(initialDay > 0){
                    for(var ii = initialDay; ii < 7; ii++){
                        this.actualWeek.push(ii);
                        
                    }
                    for(var l = 0; l < initialDay; l++){
                        this.actualWeek.push(l);
                        
                    }
                }
            }
            
        },

        setSelectedDay(day){
            this.selectedDay = day;

            this.selectedService = {
                description: '',
                hour: 0,
                minutes: 0,
            }

            this.openForm2 = false;
            
        },

        openSchedule: function(servicer) {
            
            
            axios.get(process.env.VUE_APP_API_URL + "/servicer/email/" + servicer.email, {
                data: {},
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    console.log(res.data);
                    this.selectedServicer = res.data.servicer;
                    this.insertScheduledServices();
                    this.openForm = true;
                }
            }).catch(error => {
                console.log(error);
            });
        },

        closeSchedule: function() {
            this.openForm = false;
            this.selectedServicer.name_business = '';
            this.selectedServicer.name = '';
            this.selectedServicer.email = '';

            this.openForm2 = false;
            this.selectedService.hour = 0;
            this.selectedService.minutes = 0;
            this.selectedService.description = '';

            console.log(this.selectedService);
        },

        minutesToHour: function(minutes) {
            var computedMinutes = minutes % 60;
            var hour = (minutes - computedMinutes) / 60;
            if(computedMinutes < 10){
                computedMinutes = '0' + computedMinutes;

            }
            if(hour < 10){
                hour = '0' + hour;
            }
            var finalHour = `${hour}:${computedMinutes}`;
            return finalHour
        },
        insertScheduledInArray: function(scheduleds, scheduleArray) {
            
            for(let i = 0; i < scheduleds.length; i ++){
                for(let j = 0; j < 7; j++){
                    if(scheduleds[i].date == this.weekDates[j]){
                        let length1 = scheduleArray[j].length;
                        for(let k = 0; k < length1; k++){
                            if(scheduleds[i].time == scheduleArray[j][k].minutes){
                                let newObject = {
                                    available: 'no',
                                    minutes: scheduleds[i].time,
                                    description: scheduleds[i].description,
                                    user: scheduleds[i].user,
                                    date: scheduleds[i].date,
                                    time: scheduleds[i].minutes
                                }
                                scheduleArray[j][k] = newObject;
                                let lastObj = {
                                    available: 'yes',
                                    minutes: scheduleds[i].time + scheduleds[i].minutes, 
                                }
                                scheduleArray[j].splice(k +1, -1, lastObj);
                                length1 = length1 + 1;
                                
                                

                                for(let l = 0; l < length1; l ++){
                                    if(scheduleArray[j][l].minutes > newObject.minutes && scheduleArray[j][l].minutes < lastObj.minutes){
                                        scheduleArray[j].splice(l, 1);
                                        length1 = length1 -1;
                                    }
                                    if(scheduleArray[j][l - 1]){
                                        if(scheduleArray[j][l].minutes == scheduleArray[j][l - 1].minutes){
                                        scheduleArray[j].splice(l, 1);
                                        length1 = length1 -1;
                                        }
                                    }
                                    
                                }
                                for(let l = 0; l < length1; l ++){
                                    if(scheduleArray[j][l].minutes > newObject.minutes && scheduleArray[j][l].minutes < lastObj.minutes){
                                        scheduleArray[j].splice(l, 1);
                                        length1 = length1 -1;
                                    }
                                    if(scheduleArray[j][l - 1]){
                                        if(scheduleArray[j][l].minutes == scheduleArray[j][l - 1].minutes){
                                        scheduleArray[j].splice(l, 1);
                                        length1 = length1 -1;
                                        }
                                    }
                                    
                                }
                            }else{
                                if(scheduleds[i].time > scheduleArray[j][k].minutes && scheduleds[i].time < scheduleArray[j][k].minutes) {
                                    let newObject = {
                                    available: 'no',
                                    minutes: scheduleds[i].time,
                                    description: scheduleds[i].description,
                                    user: scheduleds[i].user,
                                    date: scheduleds[i].date,
                                    time: scheduleds[i].minutes
                                    }
                                    scheduleArray[j].splice(k, -1, newObject);
                                    length1 = length1 + 1;
                                    let lastObj = {
                                        available: 'yes',
                                        minutes: scheduleds[i].time + scheduleds[i].minutes, 
                                    }
                                    scheduleArray[j].splice(k +1, -1, lastObj);
                                    length1 = length1 + 1;
                                    
                                    

                                    for(let l = 0; l < length1; l++){
                                        if(scheduleArray[j][l].minutes > newObject.minutes && scheduleArray[j][l].minutes < lastObj.minutes){
                                            scheduleArray[j].splice(l, 1);
                                            length1 = length1 -1;
                                        }
                                        if(scheduleArray[j][l - 1]){
                                            if(scheduleArray[j][l].minutes == scheduleArray[j][l - 1].minutes){
                                            scheduleArray[j].splice(l, 1);
                                            length1 = length1 -1;
                                            }
                                        }
                                        
                                    }
                                    for(let l = 0; l < length1; l ++){
                                        if(scheduleArray[j][l].minutes > newObject.minutes && scheduleArray[j][l].minutes < lastObj.minutes){
                                            scheduleArray[j].splice(l, 1);
                                            length1 = length1 -1;
                                        }
                                        if(scheduleArray[j][l - 1]){
                                            if(scheduleArray[j][l].minutes == scheduleArray[j][l - 1].minutes){
                                            scheduleArray[j].splice(l, 1);
                                            length1 = length1 -1;
                                            }
                                        }
                                        
                                    }  
                                }
                            }
                        }
                    }
                }
            }

            return scheduleArray;
        },
        insertScheduledServices: function(){

            this.selectedServicer.schedule = this.insertScheduledInArray(this.selectedServicer.scheduled_services, this.selectedServicer.schedule);
            /*
            var length = this.selectedServicer.scheduled_services.length;
            for(var u = 0; u < length; u++){
                console.log("item " + u + ' do scheduled_Services --------')
                for(var k = 0; k < 7; k++){
                    console.log('comparando dia ' + k + ' da semana');
                    if(this.selectedServicer.scheduled_services[u].date == this.weekDates[k]){
                        var length2 = this.selectedServicer.schedule[k].length;
                        console.log('length ==' + length2);
                        for(var o = 0; o < length2; o++){
                            console.log('comparando item ' + o + ' do schedule');
                            
                            var result = this.selectedServicer.schedule[k][o].minutes - this.selectedServicer.scheduled_services[u].time;
                            if(result < 15 && result >= 0){
                                this.selectedServicer.schedule[k][o].available = 'no';
                                console.log('---');
                                console.log(this.selectedServicer.scheduled_services[u].minutes);
                                let p =  parseInt(this.selectedServicer.scheduled_services[u].minutes / 15);
                                console.log(p);
                                if(p >= 1) {
                                    let d = this.selectedServicer.scheduled_services[u].minutes % 15;
                                    if(d > 0){ p = p + 1;}
                                    
                                    for(let q = 1; q < p; q ++)  {
                                        this.selectedServicer.schedule[k][o + q].available = 'no'           
                                    }
                                }
                                    
                                if(this.selectedServicer.scheduled_services[u].minutes >= 30){
                                    var result2 = this.selectedServicer.scheduled_services[u].minutes / 15;
                                    result2 = parseInt(result2) -1;
                                    var a = o + 1;
                                    for(let v = 0; v < result2; v++) {
                                        if(this.selectedServicer.schedule[k][a+1].available == 'no'){
                                            console.log("pass");
                                        }else{
                                            this.selectedServicer.schedule[k].splice(a + v, 1);
                                            length2 = this.selectedServicer.schedule[k].length;
                                        }
                                    }
                                    
                                    
                                }
                            }
                        }
                    }
                }
            }*/
        },

        defineDates: function(){
            this.weekDates = [0, 0, 0, 0, 0, 0, 0];

            for(var k = 0; k < 7; k++) {
                var todayDate = new Date();
                todayDate.setDate(todayDate.getDate() + k);
                var day = todayDate.getDate();
                if(day < 10){
                    day = '0' + day;
                }
                var month = todayDate.getMonth();
                month++;
                if(month < 10){
                    month = '0' + month;
                }
                var year = todayDate.getFullYear();
                var stringDate = '' + day + '/' + month + '/' + year;
                var thatDay = todayDate.getDay();
                this.weekDates[thatDay] = stringDate;

            }

        },

        openSchedule2: function(hour) {
            this.selectedService.hour = hour;
            
            this.openForm2 = true;
        },

        saveScheduled: function() {
            var actualDate = this.weekDates[this.selectedDay];
            var length = this.selectedServicer.scheduled_services.length;
            var cancelScheduled = false
            for(var p = 0; p < length; p++){
                
                var result = this.selectedService.description.split('/');
                this.selectedService.minutes = result[1];
                
                if(this.selectedServicer.scheduled_services[p].date == actualDate && (this.selectedServicer.scheduled_services[p].time - this.selectedService.hour) < this.selectedService.minutes && (this.selectedServicer.scheduled_services[p].time - this.selectedService.hour) >=0){
                    console.log('acchou');
                    cancelScheduled = true;
                }
            }
            if(cancelScheduled == true){
                alert("esse serviço não cabe neste horário");
            }else{
                var split = this.selectedService.description.split('/');
                var description = split[0];
                var minutes = split[1];
                var newScheduled = {
                    date: actualDate,
                    description: description,
                    time: this.selectedService.hour,
                    minutes: minutes,
                    user: localStorage.getItem('email')
                }

                if(this.selectedService.description == ''){
                    alert("selecione o serviço antes de concluir o agendamento");
                }else{
                    axios.post(process.env.VUE_APP_API_URL + "/user/scheduled", {
                        servicerEmail: this.selectedServicer.email,
                        newScheduled
                    }, {
                        headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
                    }).then(res => {
                        if(res.data.msg == 'success'){
                            alert("adicionado com sucesso");
                            this.closeSchedule();
                            this.setScheduled();
                        }else{
                            console.log(res.data.error);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
                
                
                
            }

        },

        deleteScheduled: function(item){
            axios.delete(process.env.VUE_APP_API_URL + "/user/scheduled", {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
                data: {
                    item: item
                }
            }).then(res => {
                if(res.data.msg == 'success'){
                    alert("agendamento deletado com sucesso");
                    this.setScheduled();
                }else{
                    console.log(res.data.error);
                }
            }).catch(err => {
                console.log(err);
            });
        }

    },
    created() {
        this.setServices();
        this.setScheduled();
        this.setActualWeek();
        this.defineDates();
    }
}
</script>

<style scoped>
.over-bg {
    background: #212121a4;
    min-height: 92vh;
}
h1 {
    text-align: center;
    color: #bea562;
    margin-top: 20px;
    background: #212121;
    border-radius: 8px;
    border-bottom: 1px solid #bea562;
}
p {
    color: #bea562;
    background: #2121219d;
    padding: 2px;
    border-radius:4px;
    font-size: 17px;
    font-weight: bold;
}
label {
    color: white;
    margin-bottom: 7px;
}

#main {
    background: url('../../../assets/bg1.jpg');
    background-size: cover;
    background-position: top;
    min-height: 100vh;
}

.services-area {
    min-height: 50px;
    background: #212121;
    display: flex;
    justify-content: center;
    padding: 15px;
    overflow-x: auto;
    border-radius: 15px;
    box-shadow: 1px 1px 5px #bea562;
}
.servicer-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 15px;
    margin-left: 7px;
    margin-right: 7px;
    border-bottom: solid 4px #bea562;
    border-top: solid 4px #bea562;
    box-shadow: 1px 1px 5px #bea562;
}
.scheduled-area {
    padding: 10px;
    background: #212121;
    border-radius: 15px;
    box-shadow: 1px 1px 10px black;
    
    
}

/* add-service-form */

.add-service-bg{
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100vh;
    background: #2121216d;
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-service-main {
    padding: 20px;
    background: silver;
    border-radius: 15px;
    max-width: 100vw;
}

.select-day-div {
    display: flex;
    overflow-x: auto;
    padding: 10px;
    justify-content: center;
    
}

.day-to-select {
    padding: 5px;
    margin: 8px;
    box-shadow: 1px 1px 10px black;
    border-radius: 5px;
}

.inside-schedule-item {
    box-shadow: 1px 1px 10px black;
    border-radius: 5px;
    margin:6px;
    background: rgb(2, 179, 2);
    padding: 3px;

}

.inside-schedule-denied {
    box-shadow: 1px 1px 10px black;
    border-radius: 5px;
    margin:6px;
    background: red;
    padding: 3px;
}

.schedule-area {
    display: flex;
    overflow-x: auto;
    max-width: 93vw;
    
}

h2 {
    color: white;
}
.add-service-main h2{
    border-radius: 8px;
    text-align: center;
}
/* scheduled-area */

.scheduled-area {
    background: silver;
    padding: 6px;
    overflow-x: auto;
    
}

.scheduled-unit {
    background: #212121;
    margin: 6px;
    border-radius: 8px;
    box-shadow: 1px 1px 10px black;
    padding: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.scheduled-unit h3{
    color: white;
    text-decoration:underline;
    background: rgba(192, 192, 192, 0.308);
    border-radius: 6px;
    padding: 6px;
    white-space: nowrap;
}

.scheduled-unit h4{
    color: white;
    white-space: nowrap;
}
</style>