import { createRxDatabase, addRxPlugin} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { ref } from 'vue';
import { validateHash } from './cryptoService';
addRxPlugin(RxDBDevModePlugin);


var db = ref()
const initDb = async () => {

    db.value = await createRxDatabase({
        name: 'mysecuredb',
        storage: getRxStorageDexie()
      });


    const authSchema = {
        version: 0,
        primaryKey: 'email',
        type: 'object',
        properties: {
            email: {
                type: 'string',
                maxLength: 1000 // <- the primary key must have set maxLength
            },
            key: {
                type: 'string'
            }
        },
        required: ['key']
    }
    const vaultSchema = {
        version: 0,
        primaryKey: 'key',
        type: 'object',
        properties: {
            key: {
                type: 'string',
                maxLength: 1000 // <- the primary key must have set maxLength
            },
            vault: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        password: {
                            type: 'string'
                        },
                        username: {
                            type: 'string'
                        },
                        url: {
                            type: 'string'
                        }
                    }
                }       
            }
        },
        required: ['key']
    }
    
    await db.value.addCollections({
        auth: {
            schema: authSchema
        },
        vault: {
            schema: vaultSchema
        }
    });
    console.log("DB INITIATED")
}



const login = async (email, password) =>{
   var user  = await db.value.auth.findOne(email).exec()
   if(!user)
    return null

   return await validateHash(user.key, email + "|"+ password)
 
}

const createUser = async (email, key) => {
    try {

        await db.value.auth.insert({
            email: email,
            key: key
        })

        await db.value.vault.insert({
            key: key,
            vault: []
            })

        return true
    } 
    catch(err){
        return false
    }
    
}

const getVault = async (vaultkey) =>{

    var dd = await db.value.vault.find().exec()
    console.log(dd)

    return await db.value.vault.findOne(vaultkey).exec() 

 }

const updateVault = async (key, items) => {
    
        var vaultDoc = await db.value.vault.findOne(key).exec()
       
        await vaultDoc.patch({
            vault: items
        })

  
}

  export {initDb, login, createUser, getVault, updateVault}
  