import React, { useEffect, useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import{Popover} from 'antd'
import{IMAGE_BASE_URL} from '../../Config'


function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);
    useEffect(()=>{
        Axios.post('/api/favorite/getFavoredMovie', {userFrom:localStorage.getItem('userId')})
        .then(response =>{
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.favorites)
            }else{
                console.log('영화정보 가저오는데 실패했습니다.');
            }
        })
    },[])

function tbodyfunction(){
    const content = (favorite)=>(
        <div>
            {console.log(favorite)}
            {favorite.moviePost ?
            <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/>: 'no Image'}
        </div>
    )

function favoriteRemove(favorite){
    console.log(favorite)
    fetch('/api/favorite/removeFromFavorite',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
        movieId : favorite.movieId,
        userFrom : favorite.userFrom
        })
    })
    .then(response => response.json())
    .then(response => console.log(response));
    
}
    return(
          Favorites.map((favorite, index)=>(

        
                        <tr  key={index}>
                            <Popover content={content(favorite)} title={`${favorite.movieTitle}`}>
                            <td>{favorite.movieTitle}</td>
                            </Popover>
                            <td>{favorite.movieRunTime}</td>
                            <td><button onClick={() =>favoriteRemove(favorite)} >Remove</button></td>
                        </tr>
                    )
                    )
    )
}

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>Favorite Movies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                  {tbodyfunction()}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
