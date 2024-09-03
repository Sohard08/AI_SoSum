// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const rapidApiKey = import.meta.env.VITE_RAPID_KEY;

// export const articleApi = createApi({
//     reducerPath: 'articleApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://gpt-summarization.p.rapidapi.com',
//         prepareHeaders: (headers) => {
//             headers.set('x-rapidapi-key', rapidApiKey);
//             headers.set('x-rapidapi-host', 'gpt-summarization.p.rapidapi.com');
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         }
//     }),
//     endpoints: (builder) => ({
//         getSummary: builder.mutation({
//             query: (text) => ({
//                 url: '/summarize',
//                 method: 'POST',
//                 body: JSON.stringify({ text }) // Sending extracted text
//             })
//         })
//     })
// });

// export const { useGetSummaryMutation } = articleApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Access environment variable
const rapidApiKey = import.meta.env.VITE_RAPID_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gpt-summarization.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', rapidApiKey);
            headers.set('x-rapidapi-host', 'gpt-summarization.p.rapidapi.com');
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Use a query for GET requests
        getSummary: builder.query({
            query: (article) => ({
                url: '/summarize',
                method: 'POST',
                body: JSON.stringify(article)
            })
        })
    })
});

// Export the hook for the query
export const { useLazyGetSummaryQuery } = articleApi;
