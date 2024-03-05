const baseURL = "https://quizzapi.jomoreschi.fr/api/v1/quiz"

async function getQuizQuestions(amount, category, difficulty) {
  const response = await fetch(`${baseURL}?&limit=${amount}&category=${category}&difficulty=${difficulty}`);
  const data = await response.json();
  return data;
}
export { getQuizQuestions };