// appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client();

// Configure the client
client
  .setEndpoint('http://localhost/v1') // Your Appwrite endpoint
  .setProject('671f39f200102384350a'); // Your project ID

// Initialize the account service
const account = new Account(client);

// Export the client and account for use in other files
export { client, account };
