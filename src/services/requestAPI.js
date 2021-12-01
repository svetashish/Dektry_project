const URL = 'https://picsum.photos/v2/list?page=2&limit=100';

export const RequestAPI = async () => {
  const response = await fetch(URL);
  return response.json();
};
