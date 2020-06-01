import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd'
function Favorite(props) {
    // console.log('Favorite', props.movieInfo.title)
    let userFrom = props.userFrom;    
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    

    const [FavortieNumber, setFavortieNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom : userFrom,
        movieId :movieId,
        movieTitle :movieTitle,
        moviePost :moviePost,
        movieRunTime :movieRunTime
    }
    useEffect(() => {

        // console.log(variables.moviePsot)
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
                if(response.data.success){
                    let fnumber = response.data.favoriteNumber;
                    if(fnumber == undefined){
                        fnumber = 0;
                    }
                    setFavortieNumber(response.data.favoriteNumber)
                    console.log(response.data.favoriteNumber)
                }else{
                    alert(`숫자 정보를 가져오는데 실패하였습니다.`);
                }
                

        })   
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert(`정보를 가져오는데 실패하였습니다.`);
                }
                

        })    
    }, [])

    const onClickFavorite = ()=>{
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response=>{
                if(response.data.success){
                    setFavortieNumber(FavortieNumber - 1);
                    setFavorited(!Favorited)
                }else{
                    console.log('favorite삭제에러')
                }
            })
        }else{
            Axios.post('/api/favorite/addFromFavorite', variables)
            .then(response=>{
                if(response.data.success){
                    setFavortieNumber(FavortieNumber + 1);
                    setFavorited(!Favorited)
                }else{
                    console.log('favorite추가에러')
                }
            })
        }
    }

    return (
    <button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavortieNumber} </button>
    )
}

export default Favorite
