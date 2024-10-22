import axios from 'axios';
import useSWR from 'swr';

import { apiUri } from './uri';
import {
  IUser,
  IUserStudent,
  IUserStudentCreate,
  IUserStudentInfo,
} from './interfaces/user';
import { IBusList } from './interfaces/buslist';

async function fetcher(url: string, token?: string | null) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
}

async function fetcherSimple(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function useWhoAmI(token: string | null) {
  const url = `${apiUri}/api/users/whoami/`;

  interface IResponse {
    user: IUserStudent;
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IResponse>(
    [url],
    () => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useHealthCheck() {
  const url = `${apiUri}/api/health-check/`;

  interface IResponse {
    status: string;
    database: string;
    response_time: number;
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IResponse>(
    url,
    fetcherSimple
  );
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export async function getStudentInfo(matric: string) {
  const url = `${apiUri}/api/users/student/info/`;

  interface IResponse {
    student: IUserStudentInfo;
  }

  try {
    const res = await axios.post<IResponse>(url, { matric });
    return res.data.student;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function register(data: IUserStudentCreate, matric: string) {
  const url = `${apiUri}/api/users/student/register/${matric}/`;

  interface IResponse {
    message: string;
    refresh_token: string;
    access_token: string;
    student: IUserStudent;
  }

  try {
    const res = await axios.post<IResponse>(url, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function login(username: string, password: string) {
  interface IResponse {
    refresh: string;
    access: string;
    user: IUser;
  }
  try {
    const res = await axios.post<IResponse>(
      `${apiUri}/api/login/`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.debug('Axios error message:', error.message);
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.debug('Response data:', error.response.data);
        console.debug('Response status:', error.response.status);
        console.debug('Response headers:', error.response.headers);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Request data:', error.request);
      } else {
        // Algo deu errado ao configurar a requisição
        console.error('Error setting up request:', error.message);
      }
    } else {
      // Se o erro não for do Axios
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export function useBuslistToday(token: string | null, date: string) {
  let url = `${apiUri}/api/buslists/list/enable/`;

  if (date !== '' && date !== undefined) {
    url += `?date=${date}`;
  }

  interface IResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IBusList[];
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IResponse>(
    [url],
    () => fetcher(url, token)
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
