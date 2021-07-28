const initialState = () => ({
  entries: [],
});

const entryReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'SET_ENTRIES':
      console.log(action.entries);
      return {
        entries: action.entries,
      }
    default:
      return state;
  }
};

export default entryReducer;
