import {createSelector} from "reselect";


export const selectIsUserLoggedIn = (state) => state.isUserLoggedIn
  


export const selectToken = (state) => state.token

  

export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;  

export const selectisAuthenticated = createSelector(
    [selectIsUserLoggedIn, selectToken],
    (isUserLoggedIn, token) => {
       
        
        return isUserLoggedIn && !!token;
    }
);