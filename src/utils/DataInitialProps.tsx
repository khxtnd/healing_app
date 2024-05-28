
let initialProps: any = {};

export const DataInitialProps = {
  save: (data: any) => {
    console.log(data)
    if (data)
      initialProps = { ...data }
  },

  clear: () => {
    initialProps = {}
  },

  getToScreen: () => {
    try {
      return initialProps.ToScreen
        ? initialProps.ToScreen
        : null;
    } catch (e) {
      return null;
    }
  },
}