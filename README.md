# SSD-MiniProject
Secure Software Development - Mini project (week 10 &amp; 11) by Mads Bech & Patrick Jacobsen 


Security Model for the Password Manager
In developing our password manager, we are committed to upholding the highest standards of security and privacy for our users' sensitive information. Our security model draws inspiration from the most modern technologies, but with special emphasis on Proton. 

End-to-End Encryption: Our password manager will employ end-to-end encryption as a fundamental pillar of its security architecture. This means that all critical cryptographic operations, including key generation and data encryption, will be performed exclusively on the user's device. By keeping encryption processes local, we ensure that sensitive user data remains inaccessible to anyone other than the user.

Comprehensive Data Protection: Beyond encrypting just the password field, our system will extend encryption to cover all relevant data fields, including usernames, web addresses, and additional notes. This comprehensive encryption strategy shields sensitive information from unauthorized access, enhancing overall data security.

Robust User Key Management: Each user will be assigned a unique asymmetric user key, which will undergo secure encryption using robust hashing algorithms. This key serves as the cornerstone for accessing the encrypted vault and individual items within it, bolstering user key protection.

Vault Encryption: Our password manager will generate a random vault key for each user, encrypting it securely with the users unique user key. This approach ensures that only the user possesses the necessary credentials to decrypt the vault key. This is to safeguard against unauthorized access, even in the event of a server breach.

Item-Level Encryption: To further enhance security, every item stored within the vault—whether it is login credentials, notes, or aliases, will undergo encryption using unique item keys. These keys, in turn, will be encrypted with the user's vault key, allowing for precise access control while adhering to the principle of least privilege.








