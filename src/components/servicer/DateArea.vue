<template>
    <div class="date-area">
        <div class="container">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8 date-area-main">
                    <h1>DIAS DE FUNCIONAMENTO</h1>
                    <div class="day-list flex-wrap">
                        <div class="day-div">
                            <p>{{convertDay(week[0])}}</p>
                            <input v-model="openDays[0]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[0] == true" class="my-time" v-model="openTime[0]" type="time" name="" id="">
                            <label v-if="openDays[0] == true" for="">fecha</label>
                            <input v-if="openDays[0] == true" class="my-time" v-model="closeTime[0]" type="time" name="" id="">

                        </div>
                        <div class="day-div">
                            <p>{{convertDay(week[1])}}</p>
                            <input v-model="openDays[1]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[1] == true" class="my-time" v-model="openTime[1]" type="time" name="" id="">
                            <label v-if="openDays[1] == true" for="">fecha</label>
                            <input v-if="openDays[1] == true" class="my-time" v-model="closeTime[1]" type="time" name="" id="">
                        </div>
                        <div class="day-div">
                            <p>{{convertDay(week[2])}}</p>
                            <input v-model="openDays[2]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[2] == true" class="my-time" v-model="openTime[2]" type="time" name="" id="">
                            <label v-if="openDays[2] == true" for="">fecha</label>
                            <input v-if="openDays[2] == true" class="my-time" v-model="closeTime[2]" type="time" name="" id="">
                        </div>
                        <div class="day-div">
                            <p>{{convertDay(week[3])}}</p>
                            <input v-model="openDays[3]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[3] == true" class="my-time" v-model="openTime[3]" type="time" name="" id="">
                            <label v-if="openDays[3] == true" for="">fecha</label>
                            <input v-if="openDays[3] == true" class="my-time" v-model="closeTime[3]" type="time" name="" id="">
                        </div>
                        <div class="day-div">
                            <p>{{convertDay(week[4])}}</p>
                            <input v-model="openDays[4]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[4] == true" class="my-time" v-model="openTime[4]" type="time" name="" id="">
                            <label v-if="openDays[4] == true" for="">fecha</label>
                            <input v-if="openDays[4] == true" class="my-time" v-model="closeTime[4]" type="time" name="" id="">
                        </div>
                        <div class="day-div d-none d-md-flex">
                            <p>{{convertDay(week[5])}}</p>
                            <input v-model="openDays[5]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[5] == true" class="my-time" v-model="openTime[5]" type="time" name="" id="">
                            <label v-if="openDays[5] == true" for="">fecha</label>
                            <input v-if="openDays[5] == true" class="my-time" v-model="closeTime[5]" type="time" name="" id="">
                        </div>
                        <div class="day-div d-none d-md-flex">
                            <p>{{convertDay(week[6])}}</p>
                            <input v-model="openDays[6]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[6] == true" class="my-time" v-model="openTime[5]" type="time" name="" id="">
                            <label v-if="openDays[6] == true" for="">fecha</label>
                            <input v-if="openDays[6] == true" class="my-time" v-model="closeTime[5]" type="time" name="" id="">
                        </div>

                        <br>

                        

                    </div>
                    <div class="mobile-area-list d-flex justify-content-center">
                        <div class="day-div d-flex d-md-none" style="max-width: 70px;">
                            <p>{{convertDay(week[5])}}</p>
                            <input v-model="openDays[5]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[5] == true" class="my-time" v-model="openTime[5]" type="time" name="" id="">
                            <label v-if="openDays[5] == true" for="">fecha</label>
                            <input v-if="openDays[5] == true" class="my-time" v-model="closeTime[5]" type="time" name="" id="">
                        </div>
                        <div class="day-div d-flex d-md-none" style="max-width: 70px;">
                            <p>{{convertDay(week[6])}}</p>
                            <input v-model="openDays[6]" class="my-checkbox" type="checkbox" name="" id="">
                            <label for="">abre</label>
                            <input v-if="openDays[6] == true" class="my-time" v-model="openTime[5]" type="time" name="" id="">
                            <label v-if="openDays[6] == true" for="">fecha</label>
                            <input v-if="openDays[6] == true" class="my-time" v-model="closeTime[5]" type="time" name="" id="">
                        </div>
                    </div>
                    <div class="save-area d-flex justify-content-evenly" style="margin-top: 20px;">
                        <button v-on:click="save" class="btn btn-outline-warning">Salvar</button>
                        <button v-on:click="resetWeek" class="btn btn-outline-danger">Voltar</button>
                    </div>
                    <div class="save-area d-flex justify-content-center" style="margin-top: 20px;">
                        
                    </div>
                    

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'DateArea',
    created() {
        this.date = new Date();
        this.weekDay = this.date.getDay();
        this.week = [];

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
        console.log(this.week);

        this.resetWeek();
    },
    data(){
        return {
            newDay: '',
            date: '',
            weekDay: 0,
            week: [],
            i: 0,
            j: 0,
            
            //week days open variables
            openDays: [true, true, true, true, true, true, true],
            openTime: ["08:00", "08:00", "08:00", "08:00", "08:00", "08:00", "08:00"],
            closeTime: ["18:00", "18:00", "18:00", "18:00", "18:00", "18:00", "18:00"],
            rawWeek: [],
            actualWeek: [],

        }
    },
    methods: {
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

        save: function() {
            this.rawWeek = [];
            this.actualWeek = [];

            for(this.i = 0; this.i <= 6; this.i++){
                this.actualWeek.push(
                {
                    open: this.openTime[this.i],
                    close: this.closeTime[this.i],
                    isOpen: this.openDays[this.i]

                });
                
            }
            console.log(this.actualWeek);
            if(this.week[0] == 0){
                this.rawWeek = this.actualWeek;
                this.j = 0;
            }else{
                //calc the indice of sunday, from where it will start to push on rawWeek
                this.j = (this.week[0] - 7) * -1;
                
                
                for(this.i = this.j; this.i <= 6; this.i++){
                    this.rawWeek.push(
                    {
                        open: this.openTime[this.i],
                        close: this.closeTime[this.i],
                        isOpen: this.openDays[this.i]
                    })
                }
                for(this.i = 0; this.i< this.j; this.i++){
                    this.rawWeek.push(
                    {
                        open: this.openTime[this.i],
                        close: this.closeTime[this.i],
                        isOpen: this.openDays[this.i]
                    })
                }
            }
            console.log(this.j);
            console.log(this.rawWeek);
            axios.put(process.env.VUE_APP_API_URL + "/servicer/rawweek",{rawWeek: this.rawWeek}, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            }).then(res => {
                console.log(res.data)
                alert("salvo com sucesso");
            }).catch(err => {
                console.log(err);
                alert("ocorreu algum erro tente novamente mais tarde");
            });


        },

        resetWeek: function() {
            axios.get(process.env.VUE_APP_API_URL + "/servicer/rawweek", {
                headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`},
                data: {

                }
            }).then(res => {
                console.log(res.data);
                if(this.weekDay == 0){
                    for(this.i = 0; this.i <=6; this.i++){
                        this.openTime[this.i] = res.data.rawWeek[this.i].open;
                        this.closeTime[this.i] = res.data.rawWeek[this.i].close;
                        this.openDays[this.i] = res.data.rawWeek[this.i].isOpen;
                    }
                }else{
                    this.openTime = [];
                    this.closeTime = [];
                    this.openDays = [];
                    for(this.i = this.weekDay; this.i <=6; this.i++){
                        this.openTime.push(res.data.rawWeek[this.i].open);
                        this.closeTime.push(res.data.rawWeek[this.i].close);
                        this.openDays.push(res.data.rawWeek[this.i].isOpen);
                    }
                    for(this.i = 0; this.i < this.weekDay; this.i++){
                        this.openTime.push(res.data.rawWeek[this.i].open);
                        this.closeTime.push(res.data.rawWeek[this.i].close);
                        this.openDays.push(res.data.rawWeek[this.i].isOpen);
                    }
                }
                console.log(this.weekDay);
            }).catch(err => {
                console.log(err);
            })
        }

    }
}

</script>

<style scoped>
/*typography*/

h1 {
    color: #bea562;
    text-align: center;
    background: #212121;
    border-radius: 15px;
    padding-bottom: 3px;
    box-shadow: 1px 1px 8px #bea562;
    font-size: 25px;
    
}

p {
    color: #bea562;
    text-align: center;
}

label {
    color: #bea562;
    font-size: 12px;
    margin: 2px;
}
/* first area */
.date-area {
    padding: 20px;
    padding-bottom: 20px;
    background: #212121;
    
    
}

.date-area-main {
    border-top: 3px solid #bea562;
    background: #313131;
    padding: 30px;
    border-radius: 15px;
    border-bottom: 3px solid #bea562;
}

.day-list {
    display: flex;
    margin-top: 15px;
}
.day-div {
    margin: 2px;
    background: #212121;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
}

.my-checkbox {
    width: 18px;
    height: 18px;
}

.my-time {
    font-size: 13px;
    
}
</style>