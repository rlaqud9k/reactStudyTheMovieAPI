import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, IMAGE_BASE_URL, API_KEY} from '../../Config';
import MainImage from './Sections/MainImage'
import GridCards from '../common/GridCards'
import {Row} from 'antd';

function LandingPage() {
    
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null); 
    const [CurrentPage, setCurrentPage] = useState(0);
    function hookFunction(hookMoviesResults, hookMainMovieImage){
        // setMovies([hookMoviesResults])
        setMainMovieImage(hookMainMovieImage)
        // setMainMovieImage(response.results[0])
        console.log(`Movies->   ${hookMoviesResults}`, `MainMovieImage->  ${hookMainMovieImage}`);
    }


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
        return () => {
            console.log("I'm dying...");
        }
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response =>{
            hookFunction(response.results, response.results[0])
            setMovies(Movies.concat(response.results))
            setCurrentPage(response.page);
        }
        )
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;

        fetchMovies(endpoint)
    }

    return (
        <>
        <div style={{width:'100%', margin:'0'}}>
        
         {/* path오류는 값을 가져오기전 랜더링해버려서 그럼 */}
         {/* MainImage */}
        {MainMovieImage &&
        <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title ={MainMovieImage.original_title}
                    text = {MainMovieImage.overview}
                    />
        }
        <div style={{width:'100%', margin:'1rem auto'}}>
            <h2>Movies by latest</h2>
            <hr/>
            {/* GridImage */}
             <Row gutter={[15,15]}>

                {Movies && Movies.map((movie, index)=>(
                    <React.Fragment key={index}>
                        <GridCards image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={movie.id}
                        movieName={movie.original_title}/>
                    </React.Fragment>
                ))}

            </Row>
            </div>
            <div style={{ display:'flex', justifyContent:'center' }}>
                <button onClick={loadMoreItems}>
                    Load More
                </button>
            </div>
        </div>
        </>
    )
}

export default LandingPage
