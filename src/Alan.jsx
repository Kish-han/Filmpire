import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { fetchToken } from './utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectGenreOrCategory, searchMovie } from './features/currentGenreOrCategory';

const useAlan = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: '1677c5434b75a14affec6683f536d5aa2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, query, genres, genreOrCategory }) => {
                if (command === 'chooseGenre') {
                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                    if (foundGenre) {
                        navigate('/')
                        dispatch(selectGenreOrCategory(foundGenre.id));
                    } else {
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                        navigate('/');
                        dispatch(selectGenreOrCategory(category));
                    }
                }
                else if (command === 'login') {
                    fetchToken();
                } else if (command === 'logout') {
                    localStorage.clear();
                    navigate('/')
                } else if (command === 'search') {
                    dispatch(searchMovie(query));
                }
            }
        });
    }, []);

}

export default useAlan