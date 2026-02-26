// src/appwriteConfig.js
import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('YOUR_PROJECT_ID'); // Replace with your Appwrite project ID

export const account = new Account(client);
export { ID };