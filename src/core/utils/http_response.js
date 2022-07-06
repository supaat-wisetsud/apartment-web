const HttpResponse = {
  success: (res) => {
    return { success: true, data: res?.data };
  },
  error: (error) => {
    return {
      success: false,
      error: error?.toJSON(),
    };
  },
};

export default HttpResponse;
