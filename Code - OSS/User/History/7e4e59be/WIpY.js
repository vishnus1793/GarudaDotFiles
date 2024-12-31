export const compileCode = async (language, code, input) => {
  const response = await fetch('/api/compile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ language, code, input }),
  });
  return await response.json();
};
