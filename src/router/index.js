import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ServicerLogin from '../views/ServicerLogin.vue'
import ServicerRegister from '../views/ServicerRegister.vue'
import RegisteredPage from '../views/RegisteredPage.vue'
import PaymentTest from '../views/PaymentTest.vue'
import SuccessPay from '../views/SuccessPay.vue'
import CancelPay from '../views/CancelPay.vue'
import ClientsView from '../views/logged/servicers/ClientsView.vue'
import UserServicerView from '../views/logged/users/UserServicerView.vue'
import RecoverPass from '../views/RecoverPass.vue'
import EmailConfirmation1 from '../views/EmailConfirmation1.vue'
import EmailConfirmation2 from '../views/EmailConfirmation2.vue'
import RecoverPassword1 from '../views/RecoverPassword1.vue'
import RecoverPassword2 from '../views/RecoverPassword2.vue'
import DefinePassword from '../views/DefinePassword.vue'
import DefinePassword2 from '../views/DefinePassword2.vue'

//import some dependencies to use

import axios from 'axios'
//user logged pages
import LoggedHome from '../views/logged/users/LoggedHome.vue'
import ServicerHome from '../views/logged/servicers/ServicerHome.vue'

//guards

var verifyUser = (to, from, next) => {
  if(localStorage.getItem('authToken') != undefined){
      axios.get(process.env.VUE_APP_API_URL + "/verifytoken/" + localStorage.getItem('authToken')).then(res => {
        if(res.data.role == 'user'){
          console.log('ok');
          next();
        }else{
          next('/');
        }
        
      }).catch(err => {
        alert(err);
        console.log(err);
      });
      
    }else{
      next("/");
    }
}

var verifyServicer = (to, from, next) => {
  if(localStorage.getItem('authToken') != undefined){
      axios.get(process.env.VUE_APP_API_URL + "/verifytoken/" + localStorage.getItem('authToken')).then(res => {
        if(res.data.role == 'servicer'){
          console.log('ok');
          next();
        }else{
          next('/');
        }
        
        
      }).catch(err => {
        alert(err);
        console.log(err);
      });
      
    }else{
      next("/");
    }
}

var alreadyLogged = (to, from, next) => {
  if(localStorage.getItem('authToken') != undefined){
    axios.get(process.env.VUE_APP_API_URL + "/verifytoken/" + localStorage.getItem('authToken')).then(res => {
      if(res.data.role == 'user'){
        next('/user/home');
      }
      if(res.data.role == 'servicer'){
        next("/servicer/home");
      }
      if(res.data.role != 'user' && res.data.role != 'servicer'){
        localStorage.clear();
        next("/")
      }
    }).catch(err => {
      alert(err);
      next();
    });
  }else{
    next();
  }
}

//routes definition
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: alreadyLogged
  },
  {
    path: '/home',
    name: 'secondaryhome',
    beforeEnter: function (to, from, next) {
      next('/');
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: alreadyLogged
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: alreadyLogged
  },
  {
    path: '/servicer/login',
    name: 'servicerLogin',
    component: ServicerLogin,
    beforeEnter: alreadyLogged
  },
  {
    path: '/servicer/register',
    name: 'servicerRegister',
    component: ServicerRegister,
    beforeEnter: alreadyLogged
  },
  {
    path: '/registered',
    name: 'registered',
    component: RegisteredPage,
    beforeEnter: alreadyLogged
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentTest
  },
  {
    path: '/successpay',
    name: 'successpay',
    component: SuccessPay
  },
  {
    path: '/cancelpay',
    name: 'cancelpay',
    component: CancelPay
  },
  {
    path: '/recover-password',
    name: 'recoverpass',
    component: RecoverPass,
    beforeEnter: alreadyLogged

  },
  {
    path: '/user/emailconfirmation/:id',
    name: 'emailconfirmation1',
    component: EmailConfirmation1,
    beforeEnter: alreadyLogged

  },
  {
    path:'/servicer/emailconfirmation/:id',
    name: 'emailconfirmation2',
    component: EmailConfirmation2,
    beforeEnter: alreadyLogged
  },
  {
    path: '/user/recover-password',
    name: 'recoverpassword1',
    component: RecoverPassword1,
    beforeEnter: alreadyLogged
  },
  {
    path: '/servicer/recover-password',
    name: 'recoverpassword2',
    component: RecoverPassword2,
    beforeEnter: alreadyLogged
  },
  {
    path: '/user/define-password/:email/:number/:date/:status',
    name: 'definepassword1',
    component: DefinePassword,
    beforeEnter: alreadyLogged
  },
  {
    path: '/servicer/define-password/:email/:number/:date/:status',
    name: 'definepassword2',
    component: DefinePassword2,
    beforeEnter: alreadyLogged
  }

  //user logged routes
  ,{
    path: '/user/home',
    name: 'userHome',
    component: LoggedHome,
    beforeEnter: verifyUser
  },{
    path: '/servicer/home',
    name: 'servicerHome',
    component: ServicerHome,
    beforeEnter: verifyServicer
  },
  {
    path:'/servicer/clients',
    name:'servicerClients',
    component: ClientsView,
    beforeEnter: verifyServicer
  },
  {
    path: '/user/servicerview/:email',
    name: 'userServicerView',
    component: UserServicerView,
    beforeEnter: verifyUser
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
