import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../redux/actions/searchActions';

const Search = () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.searchReducer.search);

    return(
        <div>
            <p>Search</p>
            <input
                id="search"
                onChange={(e) => dispatch(setSearch(e.target.value))}
                value={search}
            />
        </div>
    );
};

export default Search;
