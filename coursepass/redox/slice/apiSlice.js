// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const api = createApi({
//   baseQuery: fetchBaseQuery({
//     // Fill in your own server starting URL here
//     baseUrl: 'http://172.20.10.5:5000/api/v1/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().login.token.access
//       console.log("this is from prepareHeadres",token);
      
  
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`)
//       }
  
//       return headers
//     }
//   }),


//   endpoints: (build) => ({
//     getUser: build.query({
//         query: () => "/users"
//     }),
//     getUserId: build.query({
//       query: (id) => `user/${id}`
//   }),
//   getUserRefresh: build.query({
//     query: () => "refresh/"
// })
//   }),
// })

// export const { useGetUserQuery, useGetUserIdQuery, useGetUserRefreshQuery} = api


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { updateAccessToken , logout} from '../actions/loginActionCreator';



// Base query with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://172.20.10.5:5000/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().login.token.access;

    
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      headers.set('Content-Type', 'application/json'); // Add this line
      headers.set('Accept', 'application/json');
    }
    return headers;
  },
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);


  if (result?.error?.status === 401) {
    const refreshToken = api.getState().login.token.refresh;

    if (!refreshToken) {
      console.log('No refresh token available');
  
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', 
        },
        body: { refresh: refreshToken }, 
      },
      api,
      extraOptions
    );
    
    console.log('Refresh request details:', {
      url: 'auth/refresh',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: { refresh: refreshToken },
    });
 

    console.log("this is refresh: ", refreshResult);
    
    if (refreshResult?.data?.access) {
      access = refreshResult.data.access
      
      api.dispatch(updateAccessToken(access)); 
     
      const updateAccess = async (access) => {
        try {
          const tokenString = await AsyncStorage.getItem('token');
     
          
          if (tokenString !== null) {
            const token = JSON.parse(tokenString);
            token.access = access;

      
             
            await AsyncStorage.setItem('token', JSON.stringify(token));
            console.log("this triggered");
          }
        } catch (error) {
          console.error('Error updating access token:', error);
         
        }
      };
      await updateAccess(access)
    
     
    
  
      
      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Token refresh expired');
      api.dispatch(logout()); 
    }

  }

  return result;
};

// Create the API instance
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/users',
    }),
    getUserId: builder.query({
      query: (id) => `user/${id}`,
    }),

    getUserEnroll: builder.query({
      query: (id) => `enrollment/user/${id}`,
    }),
    enrollUser: builder.mutation({
      query: ({ userID, courseID }) => ({
        url: '/enrollment',
        method: 'POST',
        body: { userID, courseID }, 
      }),
    }),
    deEnrollUser: builder.mutation({
      query: ({  enrollID }) => ({
        
        url: `/enrollment/${enrollID}`,
        method: 'DELETE',
      
      }),
     
    }),
    
    getCourse: builder.query({
      query: (id) => `/course/${id}/outlines`,
    }),
    getAllCourse: builder.query({
      query: () => "/courses",
    }),
    getNote: builder.query({
      query: (id) => `/outline/${id}/notes`,
    }),
     getNoteSession: builder.query({
      query: ({outline, selectedValue}) => `/note/${outline}/${selectedValue}`,
    }),
  }),
});

export const { 
  useGetUserQuery, 
  useGetUserIdQuery, 
  useGetUserEnrollQuery, useGetCourseQuery, useGetAllCourseQuery, useEnrollUserMutation, useDeEnrollUserMutation, useGetNoteQuery, useGetNoteSessionQuery
} = api;