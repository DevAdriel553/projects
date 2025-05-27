// Utlizado para salvar o local onde a API Mock está rodando.
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001', 
});
