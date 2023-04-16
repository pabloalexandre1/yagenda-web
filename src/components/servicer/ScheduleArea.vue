<template>
<div class="main-area">
    <div class="container">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8 schedule-area">
                <h1>Agenda</h1>
                <div class="day-select">
                    <div v-for="day in week" :key="day" class="day-div" v-on:click="changeDay(day)">
                        
                        <p>{{convertDay(day)}}</p>
                        <div v-if="selectedDay == day" class="select-indice"></div>
                        
                        
                    </div>
                </div>
                <br>
                <br>
                <h1>Horários</h1>
                <div class='times-area'>
                    
                    <div v-for="time in schedule[selectedDay]" :key="time.minutes" class="time-div">
                        <p>{{minutesToHour(time.minutes)}}</p>
                        <div style="border-radius:5px; padding: 6px; margin-bottom: 6px;" class="bg-warning" v-if="time.available == 'no'">
                            <p style="text-shadow: 1px 1px 10px black;color: white; margin-bottom: 0px;">{{time.description}}</p>
                            <p style="text-shadow: 1px 1px 10px black;margin: 0px;">_______</p>
                            <p style="text-shadow: 1px 1px 10px black;color: white;">{{time.user}}</p>
                        </div>
                        <button v-on:click="openForm(time.minutes, selectedDay)" class="btn btn-success" v-if="time.available == 'yes'">Editar</button>
                        <button v-on:click="deleteScheduled(weekDates[selectedDay], time.minutes, time.user)" class="btn btn-danger" v-if="time.available == 'no'">Remover</button>
                    </div>    

                </div>
        
            </div>
        </div>
    </div>
    <div v-if="formIsOpen == true" class="add-scheduled-form-bg">
        <div class="add-scheduled-form">
             <h2>Modificar horário</h2>
            <h2>{{minutesToHour(actualHour.hour)}}</h2>
            <h2>{{actualHour.date}}</h2>
            <h2>_____________</h2>
            <h2>Serviço:</h2>
            <input v-model="actualHour.description" class="form-control" type="text" name="description" id="">
            <h2>Cliente:</h2>
            <input v-model="actualHour.user" class="form-control" type="text" name="client" id="">
            <h2>tempo(em minutos)</h2>
            <input v-model="actualHour.minutes" class="form-control" type="number" name="" id="">
            <div class="d-flex">
                <button v-on:click="postNewScheduled" style="margin: 5px; margin-top: 15px;" class="btn btn-success">Salvar</button>
                <button v-on:click="closeForm" style="margin: 5px; margin-top: 15px;" class="btn btn-danger">fechar</button>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'ScheduleArea',
    data() {
        return {
            date: '',
            weekDay: 0,
            week: [],
            week2: [],
            weekDates: [],
            i: 0,
            selectedDay: 0,
            rawWeek: [],
            schedule: [],
            numberToAdd: 0,
            actualHour: {
                hour: 0,
                date: '30/09/2022',
                description: '',
                user: '',
                minutes: 0
                
            },
            formIsOpen: false
        }
    },
    created() {
        this.date = new Date();
        this.weekDay = this.date.getDay();
        this.week = [];
        
        this.selectedDay = this.weekDay;


        if(this.weekDay == 0){
            for(this.i = 0; this.i<=6; this.i++){
                this.week.push(this.i);
                
            }
        }else{
            if(this.weekDay == 6) {
                this.week.push(this.weekDay);
                for(this.i = 0; this.i < 6; this.i++){
                    this.week.push(this.i);
                    
                }
            }else{
                if(this.weekDay > 0){
                    for(this.i = this.weekDay; this.i <= 6; this.i++){
                        this.week.push(this.i);
                        
                    }
                    for(this.i = 0; this.i < this.weekDay; this.i++){
                        this.week.push(this.i);
                        
                    }
                }
            } 
            
        }
        
        // setting rawweek & rawweek data
        //getting week data from the database/api

        axios.get(process.env.VUE_APP_API_URL + "/servicer/rawweek", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
            data: {

            }
        }).then(res => {
            if(res.data.msg == 'success'){
                this.rawWeek = res.data.rawWeek;
                
                for(var k = 0; k < 7; k++){
                                
                    try{
                            var dayOpen = this.rawWeek[this.week[k]].isOpen;
                            if(dayOpen == false){
                                
                                this.week.splice(k, 1);
                                
                            }
                    }catch(err){
                        console.log(err);
                    }
                    
                    
                }

                
            }else{
                alert("algo deu errado tente novamente mais tarde")
            }
            
        }).catch(err => {
            console.log(err);
            alert(err.message)
        });
    
        this.getSchedule();
        
    },
   
    methods: {
        deleteScheduled: function(date, time, user) {
            axios.delete(process.env.VUE_APP_API_URL + "/servicer/scheduled",{
                data: {
                    date: date,
                    time: time,
                    user: user
                },
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    alert('deletado com sucesso');
                    this.getSchedule();
                }
            }).catch(error => {
                console.log(error);
            });
        },
        postNewScheduled: function(){
            var newScheduled = {
                description: this.actualHour.description,
                minutes: this.actualHour.minutes,
                user: this.actualHour.user,
                date: this.actualHour.date,
                time: this.actualHour.hour
            }
            console.log(newScheduled);
            axios.post(process.env.VUE_APP_API_URL + '/servicer/scheduled', {scheduled: newScheduled},{
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    this.closeForm();
                    alert('Adicionado com sucesso');
                    this.getSchedule();
                }
            }).catch(err => {
                console.log(err);
            });
            console.log(newScheduled);
        },
        openForm: function(hour, day) {
            this.actualHour.hour = hour;
            
            
            this.actualHour.date = this.weekDates[day];
            this.formIsOpen = true;
            
        },

        closeForm: function(){
            this.formIsOpen = false;
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
        
        changeDay: function(day) {
            this.selectedDay = day;
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

        getSchedule: async function(){
            axios.get(process.env.VUE_APP_API_URL + '/servicer/schedule', {
                data: {},
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                if(res.data.msg == 'success'){
                    this.schedule = res.data.schedule;
                    this.insertScheduledServices();
                    console.log(this.schedule);
                    
                }else{console.log(res.data.error)}
            }).catch(error => {
                console.log(error);alert
            });
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

        insertScheduledServices: function() {
            
            axios.get(process.env.VUE_APP_API_URL + "/scheduled",{
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                this.setWeek2();
                this.defineDates();
                
                
                if(res.data.msg == 'success'){
                    let newSchedule = this.insertScheduledInArray(res.data.scheduled, this.schedule);
                    this.schedule = newSchedule;
                    
                    /*
                    var length1 = res.data.scheduled.length;
                    for(var t = 0; t < length1; t++){
                        for(var v = 0; v < 7; v++){
                            
                             if(res.data.scheduled[t].date == this.weekDates[v]){
                                
                                var newObject = {
                                    available: 'no',
                                    minutes: res.data.scheduled[t].time,
                                    description: res.data.scheduled[t].description,
                                    user: res.data.scheduled[t].user,
                                    date: res.data.scheduled[t].date,
                                    time: res.data.scheduled[t].minutes

                                }
                                
                                //after found and created the new Object to be inserted, search its place and finally insert it

                                var length2 = this.schedule[v].length;
                                var indexToDelete = null;
                                var numberToDelete = null;
                                for(var b = 0; b < length2; b++){
                                    
                                    var result = this.schedule[v][b].minutes - res.data.scheduled[t].time;
                                    
                                    if(this.schedule[v][b-1] == newObject){
                                        console.log('repetido');
                                    }else{
                                        if(result == 0){
                                            if(this.schedule[v][b].extra){
                                                newObject.extra = this.schedule[v][b].extra;
                                            }
                                            this.schedule[v][b] = newObject;
                                            if(this.schedule[v][b].extra){
                                                this.schedule[v][b].time = this.schedule[v][b].time + this.schedule[v][b].extra;
                                            }
                                            if(this.schedule[v][b].time > 15){
                                                let p = this.schedule[v][b].time / 15;
                                                
                                                for(let q = 1; q < p; q ++)  {
                                                    console.log(this.schedule[v][b + q]);
                                                    if(this.schedule[v][b + q]){
                                                        this.schedule[v][b + q].available = 'no';
                                                        
                                                    }   
                                                    if(q + 1 >= p && parseInt(this.schedule[v][b].time) % 15 > 0) {
                                                        let newObj = this.schedule[v][b + q];
                                                        newObj.minutes = newObj.minutes + (parseInt(this.schedule[v][b].time) % 15);
                                                        newObj.available = 'yes';
                                                        newObj.extra = (parseInt(this.schedule[v][b].time) % 15);
                                                        this.schedule[v].splice((b + q), 0, newObj);
                                                        length2 ++;

                                                        if(this.schedule[v][b + q] == this.schedule[v][b + q + 1] || this.schedule[v][b + q] == this.schedule[v][b + q - 1]){
                                                            this.schedule[v].splice((b + q), 1);
                                                            length2 = length2 -1;
                                                        }
                                                    }
                                                
                                                }
                                            }
                                            
                                            if(this.schedule[v][b].time > 15){
                                                var result2 = parseInt(this.schedule[v][b].time)/15;
                                                var result3 = parseInt(this.schedule[v][b].time)%15;
                                                
                                                if(result2 >= 0 && result3 > 0){
                                                    
                                                    indexToDelete = (b + 1);
                                                    numberToDelete = result2;
                                                }
                                            
                                            }

                                        }else{
                                            if(result > 0 && result < 15){
                                                this.schedule[v][b] = newObject;
                                                
                                                if(this.schedule[v][b].time > 15){
                                                    let p = this.schedule[v][b].time / 15;
                                                    
                                                    for(let q = 1; q < p; q ++)  {
                                                        if(this.schedule[v][b + q]){
                                                            this.schedule[v][b + q].available = 'no';

                                                            if(q + 1 >= p && parseInt(this.schedule[v][b].time) % 15 > 0) {

                                                                let newObj = this.schedule[v][b + q];
                                                                newObj.minutes = newObj.minutes + (parseInt(this.schedule[v][b].time) % 15);
                                                                newObj.available = 'yes';
                                                                newObj.extra = (parseInt(this.schedule[v][b].time) % 15);
                                                                this.schedule[v].splice((b + q), 0, newObj);
                                                                length2 ++;

                                                                if(this.schedule[v][b + q] == this.schedule[v][b + q + 1] || this.schedule[v][b + q] == this.schedule[v][b + q - 1]){
                                                                    this.schedule[v].splice((b + q), 1);
                                                                    length2 = length2 -1;
                                                                }
                                                            }
                                                        }   
                                                    
                                                    }
                                                }

                                                if(this.schedule[v][b].time > 15){
                                                    var result4 = parseInt(this.schedule[v][b].time)/15;
                                                    var result5 = parseInt(this.schedule[v][b].time)%15;
                                                    
                                                    if(result4 >= 0 && result5 > 0){
                                                        
                                                        indexToDelete = (b + 1);
                                                        numberToDelete = result4;
                                                    }
                                                }
                                            }
                                        }

                                    }
                                    
                                }

                                console.log(indexToDelete);
                                console.log(numberToDelete);
                                for(let m = 0; m < numberToDelete; m++){
                                    //console.log(this.schedule[v][m]);
                                    if(this.schedule[v][indexToDelete + m].available == 'no'){
                                        console.log('pass');
                                    }else{
                                        //this.schedule[v].splice(indexToDelete + m, 1);
                                    }
                                    
                                }
                                
                                
                             }
                        }
                    }
                    
                    */
                }
                
        }).catch(error => {
                console.log(error);
        });

        },

        setWeek2: function() {
            this.week2 = [];

            if(this.weekDay == 0){
            for(this.i = 0; this.i<=6; this.i++){
                this.week2.push(this.i);
                
            }
            }else{
                if(this.weekDay == 6) {
                    this.week2.push(this.weekDay);
                    for(this.i = 0; this.i < 6; this.i++){
                        this.week2.push(this.i);
                    
                    }
                }else{
                    if(this.weekDay > 0){
                        for(this.i = this.weekDay; this.i <= 6; this.i++){
                            this.week2.push(this.i);
                        
                        }
                        for(this.i = 0; this.i < this.weekDay; this.i++){
                            this.week2.push(this.i);
                        
                        }
                    }
                } 
            
        }


        }

    }
}
</script>

<style scoped>
/* types */
h1 {
    color: #bea562;
    text-align: center;
    border-bottom: 3px solid #bea562;
    border-radius: 7px;
    box-shadow: 1px 1px 10px black;
}
h2 {
    color: white;
    text-shadow: 1px 1px 5px black;
}

p {
    color: #bea562;
    text-align: center;
}


/* first area */
.schedule-area {
    padding-top: 40px;
    padding-bottom: 40px;
    background: #212121c9;
}

.day-select {
    display: flex;
    
    margin-top: 20px;
}

.day-div {
    flex: 1;
    background: #212121;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 10px black;
}
.select-indice {
    width: 100%;
    height: 5px;
    background: #bea562;
    border-radius:3px;
}
.time-select {
    padding-top: 30px;
    background: silver;
    padding-bottom: 30px;
    border-radius: 10px;
}
.times-area {
    min-height: 50px;
    background: silver;
    border-radius: 7px;
    display: flex;
    overflow-x: scroll;
    padding: 12px;
}

.time-div {
    background: #212121;
    box-shadow: 1px 1px 10px black;
    border-radius: 7px;
    margin-left: 5px;
    margin-right: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* add scheduled form */
.add-scheduled-form-bg{
    width: 100vw;
    height: 180%;
    background: #212121cc;
    position: absolute;
    top: 0;
    left: 0px;
    display: flex;
    justify-content: center;
}
.add-scheduled-form {
    background: #bea562;
    max-width: 90vw;
    max-height: 90vh;
    padding: 35px;
    border-radius: 15px;
    box-shadow: 1px 1px 10px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
}
</style>