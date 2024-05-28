const initialState = {
    count2: 0
  };
  
  const counterReducer = (state1 = initialState, action: any) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state1,
          count2: state1.count2 + 1
        };
      case 'DECREMENT':
        return {
          ...state1,
          count2: state1.count2 - 1
        };
      default:
        return state1;
    }
  };
  
  export default counterReducer;
  