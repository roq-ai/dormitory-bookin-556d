import axios from 'axios';
import queryString from 'query-string';
import { DormitoryInterface, DormitoryGetQueryInterface } from 'interfaces/dormitory';
import { GetQueryInterface } from '../../interfaces';

export const getDormitories = async (query?: DormitoryGetQueryInterface) => {
  const response = await axios.get(`/api/dormitories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDormitory = async (dormitory: DormitoryInterface) => {
  const response = await axios.post('/api/dormitories', dormitory);
  return response.data;
};

export const updateDormitoryById = async (id: string, dormitory: DormitoryInterface) => {
  const response = await axios.put(`/api/dormitories/${id}`, dormitory);
  return response.data;
};

export const getDormitoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dormitories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDormitoryById = async (id: string) => {
  const response = await axios.delete(`/api/dormitories/${id}`);
  return response.data;
};
