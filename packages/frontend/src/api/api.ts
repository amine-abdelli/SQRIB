import { HttpService } from './HttpService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const apiService = new HttpService(API_BASE_URL);

export { apiService };
