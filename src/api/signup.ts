import axiosInstance from '../api/axiosInstance';

interface SignupData {
  name: string;
  email: string;
  passwordhash: string;
}

async function signupUser(data: SignupData) {
  try {
    const response = await axiosInstance.post('/user', data);
    console.log('Signup success:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code out of 2xx
      console.error('Signup error:', error.response.data);
      throw new Error(error.response.data.error || 'Signup failed');
    } else if (error.request) {
      // No response received
      console.error('No response:', error.request);
      throw new Error('No response from server');
    } else {
      // Other errors
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}

export { signupUser };
