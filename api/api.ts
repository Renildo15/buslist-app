import axios from 'axios';
import useSWR from 'swr';

import { apiUri } from './uri';
import {
  IUser,
  IUserStudent,
  IUserStudentCreate,
  IUserStudentInfo,
  IUserStudentProfileCreate,
  IUserStudentProfileUpdate,
} from './interfaces/user';
import {
  IBusList,
  IBusListStudent,
  IBusListStudentCreate,
  IBusListWithoutStudents,
} from './interfaces/buslist';
import { IBusStop } from './interfaces/busstop';
import { INotice } from './interfaces/notice';

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

export async function updateStudent(
  token: string | null,
  studentID: string,
  data: IUserStudentProfileUpdate
) {
  const url = `${apiUri}/api/users/student/${studentID}/profile/update/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.patch<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function createStudent(
  token: string | null,
  data: IUserStudentProfileCreate
) {
  const url = `${apiUri}/api/users/student/profile/create/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.post<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function uploadAvatar(token: string | null, data: FormData) {
  const url = `${apiUri}/api/users/avatar/upload/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.patch<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
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

export function useBuslist(token: string | null, buslistID: string) {
  const url = `${apiUri}/api/buslists/students/${buslistID}/`;

  interface IResponse {
    buslist: IBusListWithoutStudents;
    students: IBusListStudent[];
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

export function useBusStops(token: string | null) {
  const url = `${apiUri}/api/busstops/bus-stop-list/`;

  interface IResponse {
    bus_stop: IBusStop[];
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

export function useNotices(
  token: string | null,
  filter?: boolean | null,
  search?: string
) {
  let url = `${apiUri}/api/buslists/notices/`;
  if (filter !== null && filter !== undefined) {
    url += `?viewed=${filter ? 'true' : 'false'}`;
  }

  if (search) {
    url +=
      filter !== null && filter !== undefined
        ? `&search=${encodeURIComponent(search)}`
        : `?search=${encodeURIComponent(search)}`;
  }

  interface IResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: INotice[];
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

export async function updateViewed(token: string | null, notice_id: string) {
  const url = `${apiUri}/api/buslists/notices/${notice_id}/viewed/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.patch<IResponse>(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function createBuslistStudent(
  token: string | null,
  data: IBusListStudentCreate,
  studentID: string,
  buslistID: string
) {
  const url = `${apiUri}/api/buslists/student/create/${buslistID}/${studentID}/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.post<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export async function deleteBuslistStudent(
  token: string | null,
  studentID: string,
  buslistID: string
) {
  const url = `${apiUri}/api/buslists/student/remove/${buslistID}/${studentID}/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.delete<IResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export function useBuslistStudent(token: string | null, buslistStudentID: string) {
  const url = `${apiUri}/api/buslists/student/detail/${buslistStudentID}/`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<IBusListStudent>(
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

export async function updateBuslistStudent(token: string, buslistStudentID: string, data: IBusListStudentCreate) {
  const url = `${apiUri}/api/buslists/students/update/${buslistStudentID}/`;

  interface IResponse {
    message: string;
  }

  try {
    const res = await axios.patch<IResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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