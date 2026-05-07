// Exemplo mínimo de serviço de API
export const api = {
  get: (url) => fetch(url).then((res) => res.json()),
  post: (url, data) =>
    fetch(url, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }).then(
      (res) => res.json(),
    ),
};
