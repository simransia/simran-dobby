import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './headerStyles.css'

function Header(props) {
    const {data, handleModel, handleSearch}=props;

    return (
        <div className='header'>
            <span className='images-count'>{data.length} {data.length > 1 ? 'Images' : 'Image'}</span>
            <div className='action-container'>
                <div id="wrap">
                    <input id="search" name="search" type="text" placeholder="Type the name of the image you are looking for.." className='search-input' onChange={handleSearch} />
                    <button type="submit" className='search-btn'><SearchIcon fontSize="large" /></button>
                </div>

                <button className='btn uploadBtn' onClick={handleModel}>
                    <AddCircleOutlineIcon /> <span>Upload new image</span>
                </button>
            </div>
        </div>
    )
}

export default Header