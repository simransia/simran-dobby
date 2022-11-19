import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './imagelist.css'

function ImageList(props) {
    const {data, handleDelete}=props;
    return (
        <>
            { data.length !== 0 ?
                data.map((item) => (
                    <div key={item._id} className="image-item">
                        <div className='image-container'>
                            <img src={item.imageURL} className="image" />
                        </div>
                        <div className='image-name'>
                            <span>{item.name}</span>
                            <input className='delete' name={item._id} onClick={handleDelete}></input>
                            <DeleteIcon />
                        </div>
                    </div>
                ))
                : <span>No images found</span>
            }
        </>
    )
}

export default ImageList