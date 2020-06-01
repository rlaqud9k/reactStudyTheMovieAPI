import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import GridCards from '../common/GridCards'
import MovieInfo from './Sections/MovieInfo'
import {Row} from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;


    const [Casts, setCasts] = useState(null);
    const [Movie, setMovie] = useState(null);
    const [ActorToggle, setActorToggle] = useState(false);



    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
            // hookFunction(response)
            // console.log(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
            // hookFunction(response)
            // console.log(Movie)
        })

    }, [])

    function setActorTogglefuntion(){
        if(ActorToggle){
            setActorToggle(false);
        }else{
            setActorToggle(true);
        }
    }

    return (
        <div>
            {/* Header */}
            {Movie &&
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title ={Movie.original_title}
                    text = {Movie.overview}
                    />
        }
            {/* body */}
            <div style={{width:'85%', margin:'1rem auto'}}>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {Movie && <Favorite
                    movieInfo={Movie}
                    movieId={movieId}
                    userFrom={localStorage.getItem('userId')}/>} 
                    {/* {console.log('df',Movie,'fsdfsdf',movieId)} */}
                </div>
                {/* Movie Info */}
                    {<MovieInfo
                    movie = {Movie}/>
                    }
                <br/>
                {/*  actios grid*/}
                {/* 직접 hook박으면 에러남 */}
                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={setActorTogglefuntion}> Toggle Actor View</button>
                </div>
                {ActorToggle && <Row gutter={[15,15]}>
                    {Casts && Casts.map((casts, index)=>(
                        <React.Fragment key={index}>
                        <GridCards image={casts.profile_path ? `${IMAGE_BASE_URL}w500${casts.profile_path}` : null}
                                    characterName={casts.name}/>
                        </React.Fragment>
                    ))}
                    </Row>}

             </div>
        </div>
    )
}

export default MovieDetail
