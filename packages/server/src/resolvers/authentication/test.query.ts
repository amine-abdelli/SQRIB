export const test = async () => {
  try {
      return {
          message: 'This is some random data returned'
      };
  } catch (e) {
      (e);
      throw e;
  }
};
