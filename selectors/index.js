
export const getRestState = store => store.restaurant;

export const restaurantFilter = (store, visibilityFilter) => {
    const resArr = getRestState(store)
    switch (visibilityFilter) {
      case 'ALL':
        return resArr;
      default:
        return []
  }
};
