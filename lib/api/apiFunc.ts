export const getNewsList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
  return response.json();
};