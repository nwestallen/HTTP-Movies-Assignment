import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Route } from 'react-router-dom';
//pass setItems as prop to update movie list on client side after server is updated
//Switch makes it so that only first matching Route is returned/rendered...omitting switch can enable us to stack Routes for e.g. admin views

const UpdateMovie = props => {

    const { getMovieList } = props;
    const [formData, setFormData] = useState({ id: '', title: '', director: '', metascore: '', stars: []});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setFormData(res.data);
        })
        .catch(err => console.log(err));
    },[id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, formData)
        .then(res => {
            console.log(res);
            getMovieList();
            history.push('/');
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Update Movie</h2>
                <label>
                    Title:
                    <input type='text' name='title' value={formData.title} onChange={handleChange}/>
                </label>
                <label>
                    Director:
                    <input type='text' name='director' value={formData.director} onChange={handleChange}/>
                </label>
                <label>
                    Metascore:
                    <input type='text' name='metascore' value={formData.metascore} onChange={handleChange}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
