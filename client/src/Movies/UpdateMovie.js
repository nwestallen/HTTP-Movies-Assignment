import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
//pass setItems as prop to update movie list on client side after server is updated
//Switch makes it so that only first matching Route is returned/rendered...omitting switch can enable us to stack Routes for e.g. admin views

const UpdateMovie = props => {

    const { movieID } = props;
    const [formData, setFormData] = useState({ id: '', title: '', director: '', metascore: '', stars: []});
    const { id } = useParams();

    useEffect(() => {
        Axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setFormData(res.data);
        })
        .catch(err => console.log(err));
    })

    return (
        <div>
            <form>
                <h2>Update Movie</h2>
                <label>
                    Title:
                    <input type='text' name='title' value={formData.title} />
                </label>
                <label>
                    Director:
                    <input type='text' name='director' value={formData.director} />
                </label>
                <label>
                    Metascore:
                    <input type='text' name='metascore' value={formData.metascore} />
                </label>
            </form>
        </div>
    )
}

export default UpdateMovie;
