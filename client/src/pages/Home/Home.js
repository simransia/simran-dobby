import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageContext from '../../Context/imageContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import { Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Modal from '@mui/material/Modal';
import Header from '../../components/Header/Header';
import ImageList from '../../components/ImageContainer/ImageList'
import './Home.css';


export default function TitlebarBelowImageList() {
    const context = useContext(ImageContext);
    const { images, addImage, getImages, deleteImage } = context;
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState();
    const [query, setQuery] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const inputRef = useRef();

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', image);

        if (name) {
            addImage(formData);
            setOpen(false);
            setImage('')
            setName('')
        } else {
            setError(true)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
            setError(false)
        } else {
            setImage(e.target.files[0]);
            setImageURL(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleRemove = (e) => {
        setImage('');
        setImageURL('')
    }

    const handleDelete = (e) => {
        deleteImage(e.target.name);
        // setOpen(false)
        console.log(e.target.name)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setImage('')
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());
    }

    const search = (images) => {
        if (query !== '') {
            return images.filter((item) => item.name.toLowerCase().includes(query))
        } else {
            return images;
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getImages()
        } else {
            navigate('/')
        }
    }, [])

    return (
        <>
            <Header handleModel={handleOpen} data={search(images)} handleSearch={handleSearch} />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        borderRadius: '4px',
                        boxShadow: 24,
                    }}>
                        <h3 id="modal-modal-title" className='model-title' >
                            Add New Image
                            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                        </h3>
                        <Divider />
                        {!image &&
                            <div id="modal-modal-description" className="dragAndDrop"
                                onDrop={handleChange}
                                onDragOver={handleDragOver}>
                                <p>Drag Image here</p>
                                <p>or</p>
                                <label htmlFor='imgInput'></label>
                                <input type="file" id="imgInput" ref={inputRef} name="image" hidden accept="image/*" onChange={handleChange} />
                                <button onClick={() => inputRef.current.click()} className="modalBtn">Browse</button>
                            </div>
                        }
                        {image &&
                            <div className=''>
                                <div className="preview-container">
                                    <div className='preview-container_item'>
                                        <div className='preview-container_icon' >
                                            <span onClick={handleRemove} className='cancel-icon'> </span>
                                            <HighlightOffIcon className='icon' onClick={handleRemove} />
                                        </div>
                                        <Divider />
                                        <div className='preview-container_image'>
                                            <img src={imageURL} />
                                        </div>
                                        <Divider />
                                        <div className='preview-container_details'>
                                            <span>{image.name}</span>
                                            <span>{image.size <= 1048576 ? Math.round(image.size / 1024) + 'kb' : Math.round(image.size / (1024 * 1024)) + 'mb'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='name-container'>
                                    <label htmlFor='name'><span>Name:</span>
                                        <input type='text' id='name' name="name" onChange={handleChange} />
                                        {error && <span className='error upload-error'><ErrorOutlineIcon fontSize="small" /> Name is required.</span>}
                                    </label>
                                </div>
                                <Divider />
                                <div className='btn-container'>
                                    <button onClick={handleUpload} className='modalBtn'>Upload</button>
                                </div>

                            </div>
                        }
                    </Box>
                </Modal>
            </div>
            <div className='wrapper'>
                <ImageList data={search(images)} handleDelete={handleDelete} />
            </div>
        </>
    );
}


