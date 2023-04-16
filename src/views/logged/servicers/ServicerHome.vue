<template>
    <div class="initial">
        <ServicerNavbar></ServicerNavbar>
        

        <ServicesArea></ServicesArea>
        <DateArea></DateArea>
        <ScheduleArea></ScheduleArea>
    </div>
</template>

<script>

import ServicerNavbar from '../../../components/ServicerNavbar.vue'
import ServicesArea from '../../../components/servicer/ServicesArea.vue'
import DateArea from '../../../components/servicer/DateArea.vue'
import ScheduleArea from '../../../components/servicer/ScheduleArea.vue'

export default {
    name: 'ServicerHome',
    components: {
    ServicerNavbar,
    ServicesArea,
    DateArea,
    ScheduleArea
    },
    data() {
        return {
            date: new Date()
        }
    }
}
</script>

<style scoped>
.initial {
    background: url('../../../assets/bg1.png');
    background-position: center;
    background-size: cover;
    padding-bottom: 100px;
    background-repeat: repeat-y;
}
</style>