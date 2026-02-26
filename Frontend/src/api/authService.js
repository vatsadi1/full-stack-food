// src/api/authService.js
import { account, ID } from '../appwriteConfig';

// Register User
export const registerUser = async (email, password, name) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    console.error('Signup Error:', error.message);
    return null;
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.error('Login Error:', error.message);
    return null;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout Error:', error.message);
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('No user logged in');
    return null;
  }
};