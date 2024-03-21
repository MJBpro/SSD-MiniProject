# SSD-MiniProject
Secure Software Development - Mini project (week 10 &amp; 11) by Mads Bech & Patrick Jacobsen 


Security Model for the Password Manager
In developing our password manager, we are committed to upholding the highest standards of security and privacy for our users sensitive information. Our security model draws inspiration from the youtube video "How Password Managers Work - Computerphile". 

To authenticate a user of the Password Manager we will use users email and a master password. This is done by implmenting af secure hashing mechannism using PBKDF2 for encryption and verification on the client side - We will create a key with by using the mechaninsm to encrypt a concatenation of the email and master password. We will then store this encrypted key (vault key) and email. 
When the user then tries to login we will generate this encrypted key again and check against the one stored. 

When the user is authenticated the vault will be returned to the user. Inside the vault is stored an array with the saved passwords. The passwords will be encrypted using the AES-GCM and PBKDF2 key derivation where we will utilize the master password and the vault key for encryption and decryption.





![image](https://github.com/MJBpro/SSD-MiniProject/assets/104771571/33d375c8-f428-44e1-9b8f-862c921aedda)







