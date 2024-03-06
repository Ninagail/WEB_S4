const baseURL = "https://quizzapi.jomoreschi.fr/api/v1/quiz"

async function getQuizQuestions(amount, category, difficulty) {
  let response = await fetch(`${baseURL}?&limit=${amount}&category=${category}&difficulty=${difficulty}`);
  let data = await response.json();
  return data;
}
export { getQuizQuestions };