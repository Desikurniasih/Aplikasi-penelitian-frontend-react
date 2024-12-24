const endpoints = {
    penelitian: {
      getAll: '/api/penelitian',
      getById: (id) => `/api/penelitian/${id}`,
      create: '/api/penelitian/insert',
      update: (id) => `/api/penelitian/update/${id}`,
      delete: (id) => `/api/penelitian/delete/${id}`,
    },
  };
  
  export default endpoints;
  