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

