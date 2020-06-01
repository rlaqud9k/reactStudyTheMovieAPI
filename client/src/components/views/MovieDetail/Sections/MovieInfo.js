import React from 'react'
import { Descriptions } from 'antd'

function MovieInfo(props) {
    let movie = props.movie;
    return (
        <Descriptions title="Movie Info" bordered>
             <Descriptions.Item label="Title">{movie&&movie.original_title}</Descriptions.Item>
             <Descriptions.Item label="release_date">{movie&&movie.release_date}</Descriptions.Item>
             <Descriptions.Item label="revenue">{movie&&movie.revenue}</Descriptions.Item>
             <Descriptions.Item label="runtime">{movie&&movie.runtime}</Descriptions.Item>
             <Descriptions.Item label="vote_average" span ={2}>{movie&&movie.vote_average}</Descriptions.Item>
             <Descriptions.Item label="vote_count">{movie&&movie.vote_count}</Descriptions.Item>
             <Descriptions.Item label="status">{movie&&movie.status}</Descriptions.Item>
             <Descriptions.Item label="popularity">{movie&&movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
