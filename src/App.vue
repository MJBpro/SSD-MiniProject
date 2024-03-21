

<template>
<div class="w-full flex "> 

  <div v-if="showModal" class="outermodal fixed w-full  h-full bg-black/20">
  <div class="modal shadow-lg px-2 rounded text-black min-h-[18rem] ">
      <p class="font-bold">Gem nyt password</p>
      <button @click="closeModal" class="absolute right-0 top-0 px-2 h-8 rounded bg-red-300">x</button>
          <div class="flex flex-col gap-4 ">
          <div>
            <p class="">Url</p>
            <input v-model="newVaultItem.url" class="w-[20rem] p-1 rounded text-black" placeholder="password-manager.com" type="text">
          </div>

          <div>
            <p class="">Username</p>
            <input v-model="newVaultItem.username" class="w-[20rem] p-1 rounded  text-black" placeholder="sikker@mail.com" type="text">
          </div>

          <div>
            <p class="">Password</p>
            <input v-model="newVaultItem.password" class="w-[20rem] p-1 rounded  text-black" placeholder="*********" type="text">
          </div>
          <p class="text-red-400">{{modalErr}}</p>

           <div>
            <button @click="savePassword" class="px-4 p-1 bg-blue-600/60 rounded">Gem</button>
          </div>
      </div>

  </div>
</div>
  <div class="mx-auto mt-36">
    <h2 class="text-2xl text-center font-semibold">Password Manager 2.0 </h2>
    <div v-if="!loggedIn">
      <div class="flex flex-col gap-4 mt-12">
          <div>
            <p class="font-medium">Email</p>
            <input v-model="email" class="w-[20rem] p-1 rounded text-black" placeholder="password@manager.com" type="text">
          </div>

          <div>
            <p class="font-medium">Password</p>
            <input v-model="masterPassword" class="w-[20rem] p-1 rounded  text-black" placeholder="*********" type="text">
          </div>
      </div>

      <div class="mt-4 flex gap-2">
          <button @click="loginPressed" class="p-2 text-white font-semibold bg-blue-400 rounded" >Login</button>
          <button @click="signupPressed" class="p-2 bg-slate-400/20 rounded" >Create user</button>

      </div>
      <div class="text-red-400/50 mt-2">{{err}}</div>

    </div>

    <div v-if="loggedIn" class="w-[48rem] flex  mt-12">
        <button class="ml-auto" @click="showModal = true"> 
         + Add new 
        </button>
    </div>
    <div v-if="loggedIn"  class="w-[48rem] mt-2 rounded bg-slate-400 min-h-[12rem] "> 
        <div class="text-slate-900 font-bold grid grid-cols-4 justify-around px-4 py-2">
            <p class="font-bold text-center">URL</p>
            <p class="font-bold text-center">Username</p>
            <p class="font-bold text-center">Password</p>
            <div class="">
             
            </div>
        </div>
      
        <div v-for="val, i in vaultValues" :key="val" class="text-slate-700 bg-slate-500/80 grid grid-cols-4 justify-around px-4 py-2">
            <p class="font-semibold text-center">{{val.url}}</p>
            <p class="font-semibold text-center">{{val.username}}</p>
            <p class="font-semibold text-center">{{val.show ? val.password : '***************'}}</p>
            <div class=" flex justify-center  gap-2">
              <button class="bg-blue-700/50  rounded text-center px-1 ml" @click="showPassword(i)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white/60">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>

              <button @click="removePassword(i)" class="bg-red-700/50 rounded text-center px-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white/60">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </button>
            </div>

        </div>


    </div>


  </div>

</div>
<div>


</div>
</template>


<script setup>
import {login, createUser, updateVault, getVault} from "./db"
import { onMounted, ref } from 'vue';
import { generateHash, validateHash, encryptPassword, decryptPassword  } from "./cryptoService"

var err = ref("")
var email = ref("")
var masterPassword = ref("")

var newVaultItem = ref({})
var showModal = ref(false)
var modalErr = ref("")

var loggedIn = ref("")
const vaultKey = ref("")
var vaultValues = ref([])

async function loginPressed(){
  err.value = ""


  vaultKey.value = await login(email.value.toLowerCase(), masterPassword.value);
  

  if(vaultKey.value){
    setVault()
    loggedIn.value = true
  } else {
    console.log("HEP")
    err.value = "Error - Credentials not working..."
  }
}

async function setVault(){
  var res = await getVault(vaultKey.value)
  vaultValues.value = [...res.vault]
}

async function signupPressed(){
  err.value = ""

  // Create hashed key from email and password -- vault-key
  vaultKey.value = await generateHash(email.value + "|" + masterPassword.value)

  var userCreated = await createUser(email.value, vaultKey.value);

  if(userCreated){
      loggedIn.value = true
  }
  else {
      err.value = "Error - User already exist..."
  }
}


async function savePassword(){

  if(!newVaultItem.value.url || !newVaultItem.value.password || !newVaultItem.value.username){
    modalErr.value = "Udfyld venligst alle felter"
    return;
  }

  closeModal()
  
  var encryptedPass = await encryptPassword(newVaultItem.value.password, masterPassword.value, vaultKey.value)

  newVaultItem.value.password = encryptedPass
  var newValues = [...vaultValues.value, newVaultItem.value]
  
  newVaultItem.value = {}
  await updateVault(vaultKey.value, JSON.parse(JSON.stringify(newValues)))
  await setVault()

}

async function removePassword(index){
  var newValues = vaultValues.value
  newValues.splice(index, 1)
  await updateVault(vaultKey.value, JSON.parse(JSON.stringify(newValues)))
}

async function showPassword(index){

  var vault = {...vaultValues.value[index]}
  vault.password = await decryptPassword(vault.password, masterPassword.value, vaultKey.value)
  vault.show = true;
  vaultValues.value[index] = vault

}


function closeModal(){
  modalErr.value = ""
  showModal.value = false
}

</script>



<style scoped>
.modal {
  background-color: #eee;
    position: fixed;
    width: 30%;
    text-align: center;
    top: 25%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, 0);
}
</style>
