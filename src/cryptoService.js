import bcrypt from 'crypto'


const generateHash = async (valueToHash) => {
 
   // Generate a random salt
   const salt = crypto.getRandomValues(new Uint8Array(16));

   // Derive a key from the password and salt
   const key = await window.crypto.subtle.importKey(
       'raw',
       new TextEncoder().encode(valueToHash),
       { name: 'PBKDF2' },
       false,
       ['deriveBits']
   );

   // Derive a 256-bit key using PBKDF2
   const derivedKey = await window.crypto.subtle.deriveBits(
       {
           name: 'PBKDF2',
           salt: salt,
           iterations: 10000,
           hash: 'SHA-256'
       },
       key,
       256
   );

   // Convert derived key to hex string
   const hashArray = Array.from(new Uint8Array(derivedKey));
   const hashedValue = hashArray.map(byte => ('0' + byte.toString(16)).slice(-2)).join('');

   console.log('Hashed Password:', hashedValue);
   console.log('Salt:', salt);

   // Return concatinated salt and hash
   return salt.toString() + "|" + hashedValue;
}

const validateHash = async (hash, password) => {
  
    // First get the salt from the value
    var saltIndex = hash.indexOf("|")
    const saltString = hash.substring(0, saltIndex)
    const salt = Uint8Array.from(saltString.split(","));

    // Derive a key from the password and salt
    const key = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    
    // Derive a 256-bit key using PBKDF2
    const derivedKey = await window.crypto.subtle.deriveBits(
    {
        name: 'PBKDF2',
        salt: salt,
        iterations: 10000,
        hash: 'SHA-256'
    },
    key,
    256
    );

    // Convert derived key to hex string
   const hashArray = Array.from(new Uint8Array(derivedKey));
   const derivedString = hashArray.map(byte => ('0' + byte.toString(16)).slice(-2)).join('');
   
   var hashWithoutSalt = hash.substring(saltIndex + 1)

   return hashWithoutSalt == derivedString ? hash : null
}

const deriveVaultKey = async (key) =>{

       return await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
}

function hexStringToUint8Array(hexString) {
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
}

function generateIV() {
    return window.crypto.getRandomValues(new Uint8Array(12));
}

// Function to encrypt a password
async function encryptPassword(password, masterpassword, vaultkey) {
    const iv = generateIV();
  
  
    var vKey = splitSaltAndHash(vaultkey)

    // Derive a encryptionKey from the masterPassword and vaultKeyHash
    var derivedKey = await derive256BitPBKDF2Key(vKey.hash + masterpassword, vKey.salt)
    const encryptionKey = await window.crypto.subtle.importKey(
        'raw',
        derivedKey,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );


    // Encrypt the password using AES-GCM algorithm
    const encryptedPassword = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        encryptionKey,
        new TextEncoder().encode(password),
    );

     // Convert derived key to hex string
   const hashArray = Array.from(new Uint8Array(encryptedPassword));
   const derivedString = hashArray.map(byte => ('0' + byte.toString(16)).slice(-2)).join('');


    // Return the encrypted password and IV

    return iv.toString() + "|" + derivedString
}

// Function to decrypt a password
async function decryptPassword(encryptedPassword, masterpassword, vaultkey) {

    console.log(encryptedPassword, masterpassword, vaultkey)
    var vKey = splitSaltAndHash(vaultkey)

    // Derive a encryptionKey from the masterPassword and vaultKeyHash
    var derivedKey = await derive256BitPBKDF2Key(vKey.hash + masterpassword, vKey.salt)

    // First get the iv and hash from the encryptedPassword
    var ivAndHash = splitSaltAndHash(encryptedPassword)


    const encryptionKey = await window.crypto.subtle.importKey(
        'raw',
        derivedKey,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    );
    

    // Decrypt the password using AES-GCM algorithm
    const decryptedPassword = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(ivAndHash.salt.split(",") )},
        encryptionKey,
        hexStringToUint8Array(ivAndHash.hash)
    )
    // Decode the decrypted password
    return new TextDecoder().decode(decryptedPassword);
}



async function derive256BitPBKDF2Key(vkey, salt){

    // Derive a key 
    const key = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(vkey),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );

    // Derive a 256-bit key using PBKDF2
    const derivedKey = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: new TextEncoder().encode(salt),
            iterations: 10000,
            hash: 'SHA-256'
        },
        key,
        256
    );

    return derivedKey

}

function splitSaltAndHash(key){
    var split = key.split("|")
    return {salt: split[0], hash: split[1]}
}

export {generateHash, validateHash, encryptPassword, decryptPassword}