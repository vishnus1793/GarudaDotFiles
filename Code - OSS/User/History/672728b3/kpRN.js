import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('671f39f200102384350acd'); 

export const database = new Databases(Client)
export const account = new Account(client);
export { ID } from 'appwrite';
