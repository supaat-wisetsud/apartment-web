const HttpResponse = {
  success: (res) => {
    return { success: true, data: res?.data };
  },
  error: (error) => {
    let e = error?.toJSON()
    if (error.response) {
      e = error.response.data;
    } else if (error.request) {
      console.log(error.request);
    }
    return {
      success: false,
      error: e,
    };
  },
};

export default HttpResponse;
