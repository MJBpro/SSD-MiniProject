# SSD-MiniProject
Secure Software Development - Mini project (week 10 &amp; 11) by Mads Bech & Patrick Jacobsen 


Security Model for the Password Manager
In developing our password manager, we are committed to upholding the highest standards of security and privacy for our users sensitive information. Our security model draws inspiration from the youtube video "How Password Managers Work - Computerphile". 

To authenticate a user of the Password Manager we will use users email and a master password. This is done by implmenting af secure hashing mechannism using PBKDF2 for encryption and verification on the client side - We will create a key with by using the mechaninsm to encrypt a concatenation of the email and master password. We will then store this encrypted key (vault key) and email. 
When the user then tries to login we will generate this encrypted key again and check against the one stored. 

When the user is authenticated the vault will be returned to the user. Inside the vault is stored an array with the saved passwords. The passwords will be encrypted using the AES-GCM and PBKDF2 key derivation where we will utilize the master password and the vault key for encryption and decryption.

![Gr](https://github.com/MJBpro/SSD-MiniProject/assets/55191533/a03c75a7-4ccc-4949-91c1-108c12b80fb6)





## Preview
<img width="1546" alt="Screenshot 2024-03-21 at 15 56 38" src="https://github.com/MJBpro/SSD-MiniProject/assets/55191533/b091fd89-b211-4912-9ef3-38d598644c85">
<img width="1564" alt="Screenshot 2024-03-21 at 15 58 49" src="https://github.com/MJBpro/SSD-MiniProject/assets/55191533/842d3805-b5e7-4734-8c75-8d5c755f7fda">
<img width="1396" alt="Screenshot 2024-03-21 at 15 59 13" src="https://github.com/MJBpro/SSD-MiniProject/assets/55191533/fed8c9ab-4e1b-4ba0-bd50-de5c999ee93e">
<img width="1470" alt="Screenshot 2024-03-21 at 15 58 56" src="https://github.com/MJBpro/SSD-MiniProject/assets/55191533/7f61a821-3c28-4d3e-92c8-b5f5e06281f0">





## SETUP 
To run the password manager you can clone this repository and do the following: 
1. npm install
2. npm run dev
3. open webbrowser localhost


## Discussion 
The application is setup to run in localhost which should have been a desktop application intead. 
We use a local Database to store the credentials and info for the passwords (url, username, password) where we propably should have encrypted the other values too (especially email) - in case a attacker got access to the database. 
We did'nt get to add proper input validations - this could lead to weak passwords and thereby easier to crach the encryptions.
We store the encrytions salt and Iv along with encryption which seemed wrong but didnt now where else to store it. It still helps to prevent the use of rainbowtables to try to crack the encrytiops though.
We could have used some more iterations when generating the hashed keys, but we thought it was enough.
Instead of storeing the vaults as a key and array of (url, username, password) we should probably have encrypted the whole vault together and saved the vault as just a key. 

