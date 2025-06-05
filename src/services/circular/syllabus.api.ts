import axios from 'axios';

// Define the API base URL (use your actual backend URL)
const BASE_URL = 'http://192.168.140.68:8000/api';

// Create an Axios instance for better reusability
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export const examCircular = async () => {
  try {
    const response = await apiClient.get('/circulars');
    // Map each returned object so that _id is renamed to id
    const data = response.data;
    console.log('response data: ', data);
    return data;
  } catch (error) {
    console.log('Error while fetching');
    throw error;
  }
};

// fetching syllabus from the vtu website

export const fetchSyllabus = async ({
  stream,
  scheme,
  year,
  branch,
}: FetchSyllabusParams): Promise<IVtuSyllabus | null> => {
  try {
    const response = await axios.get<IVtuSyllabus>(`${BASE_URL}/syllabus`, {
      params: {stream, scheme, year, branch},
    });
    console.log('Fetched syllabus data:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching syllabus:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return null;
  }
};
