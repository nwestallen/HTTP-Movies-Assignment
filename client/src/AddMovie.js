import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddMovie = props => {

    const { getMovieList } = props;

    const [formData, setFormData] = useState({title: '', director: '', metascore: '', stars: ['john', 'rick']});

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault()
        axios
        .post('http://localhost:5000/api/movies', formData)
        .then(res => {
            console.log(res);
            getMovieList();
            history.push('/');
        })
        .catch(err => console.log(err));
    };

    const changeActor = e => {
        const {name, value} = e.target;
        setFormData({...formData, stars: formData.stars.map((star,index) => index === parseInt(name) ? value : star)});
    };

    const removeActor = e => {
        e.preventDefault();
        console.log(e.target.value);
        setFormData({...formData, stars: formData.stars.filter((star,index) => index !== parseInt(e.target.value))});
    };

    const addActor = e => {
        e.preventDefault();
        return null;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Movie</h2>
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
                <label>
                    Actors:
                    {formData.stars.map((actor, index) => 
                    <div>
                        <input type='text' name={index} value={actor} onChange={changeActor} />
                        <button onClick={removeActor} value={index}>Remove</button>
                    </div> 
                    )}
                    <button onClick={addActor}>Add Actor</button>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default AddMovie;
