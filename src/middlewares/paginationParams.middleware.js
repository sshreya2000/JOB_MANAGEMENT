// to set the pagination parameters
export const getPaginationParams = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = 10;
    return { limit, page };
  };