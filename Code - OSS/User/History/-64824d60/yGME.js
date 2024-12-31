// appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client();
const account = new Account(client);

client
  .setEndpoint('http://localhost/v1') // Your Appwrite endpoint
  .setProject('671f39f200102384350a'); // Your project ID

export { client, account };
