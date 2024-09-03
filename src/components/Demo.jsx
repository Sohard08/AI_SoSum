// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { copy, linkIcon, loader, tick } from 'D:/Projects/Summarizer/src/assets/assets';
// import { useGetSummaryMutation } from '../services/article'; // Assuming you'll use a mutation

// const Demo = () => {
//     const [article, setArticle] = useState({
//         url: "",
//         text: "",
//         summary: ""
//     });

//     const [allArticles, setAllArticles] = useState([]);
//     const [getSummary, { error, isLoading }] = useGetSummaryMutation();

//     useEffect(() => {
//         const articlesFromLocalStorage = JSON.parse(
//             localStorage.getItem('articles')
//         );
//         if (articlesFromLocalStorage) {
//             setAllArticles(articlesFromLocalStorage);
//         }
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Extract text from URL
//         const extractedText = await extractTextFromURL(article.url);

//         if (extractedText) {
//             const { data } = await getSummary({ text: extractedText });

//             if (data?.summary) {
//                 const newArticle = { ...article, text: extractedText, summary: data.summary };
//                 const updatedAllArticles = [newArticle, ...allArticles];

//                 setArticle(newArticle);
//                 setAllArticles(updatedAllArticles);

//                 localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
//             }
//         }
//     };

//     const extractTextFromURL = async (url) => {
//         try {
//             const response = await axios.get(url);
//             const html = response.data;

//             // Use DOMParser to extract text from the HTML
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(html, 'text/html');
//             return doc.body.innerText;
//         } catch (error) {
//             console.error("Error extracting text from URL:", error);
//             return null;
//         }
//     };

//     return (
//         <section className='w-full mt-15 max-w-full'>
//             {/* Search Form */}
//             <div className='flex flex-col w-full gap-2'>
//                 <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
//                     <img src={linkIcon} alt='linkIcon' className='absolute left-0 my-10 ml-4 w-5' />
//                     <input
//                         type="url"
//                         className="url_input peer"
//                         placeholder='Enter a URL'
//                         value={article.url}
//                         required
//                         onChange={(e) => setArticle({ ...article, url: e.target.value })}
//                     />
//                     <button type='submit' className='submit_btn peer-focus:border-blue-300 peer-focus:text-blue-300'>
//                         GO
//                     </button>
//                 </form>

//                 {/* History */}
//                 <div className="flex flex-col max-h-60 gap-1 overflow-y-auto">
//                     {allArticles.map((item, index) => (
//                         <div
//                             key={`link-${index}`}
//                             onClick={() => setArticle(item)}
//                             className="link_card"
//                         >
//                             <div className="copy_btn">
//                                 <img
//                                     src={copy}
//                                     alt="copy_icon"
//                                     className="w-[40%] h-[40%] object-contain"
//                                 />
//                             </div>
//                             <p className="flex-1 font-satoshi font-medium text-blue-700 text-sm truncate">
//                                 {item.url}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Results */}
//             <div className="my-10 max-w-full flex justify-center items-center">
//                 {isLoading ? (
//                     <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
//                 ) : error ? (
//                     <p className="font-inter font-bold text-black text-center">
//                         Something went wrong!
//                         <br />
//                         <span className="font-satoshi font-normal text-gray-700">
//                             {error?.data?.error}
//                         </span>
//                     </p>
//                 ) : (
//                     article.summary && (
//                         <div className="flex flex-col gap-3">
//                             <h2 className="font-satoshi font-bold text-gray-600 text-xl">
//                                 Article <span className="blue_gradient">Summary</span>
//                             </h2>
//                             <div className="summary_box">
//                                 <p className="font-inter font-medium text-sm text-gray-700">
//                                     {article.summary}
//                                 </p>
//                             </div>
//                         </div>
//                     )
//                 )}
//             </div>
//         </section>
//     );
// };

// export default Demo;

import React, { useState } from 'react';
import { useLazyGetSummaryQuery } from '../services/article';
import { loader } from 'D:/Projects/Summarizer/src/assets/assets';

const Demo = () => {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ text });

        if (data?.summary) {
            setSummary(data.summary);
            console.log(data.summary);
        }
    }

    return (
        <section className='w-full mt-15 max-w-full'>
            <div className='flex flex-col w-full gap-2'>
                <form className="relative flex justify-center items-center"
                    onSubmit={handleSubmit}>
                    <textarea
                        className="textarea_input peer"
                        placeholder="Enter the text you want summarized"
                        value={text}
                        required
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type='submit' className='submit_btn peer-focus:border-blue-300 peer-focus:text-blue-300'>
                        Summarize
                    </button>
                </form>
            </div>
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-black text-center">
                        Something went wrong
                    </p>
                ) : (
                    summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Summary
                            </h2>
                            <div className="summary_box">
                                <p className="font-inter font-medium text-sm text-gray-700">
                                    {summary}
                                </p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export default Demo;
