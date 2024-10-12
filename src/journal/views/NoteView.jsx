import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote, messageSaved, isSaving } = useSelector((state) => state.journal);
    
    const {title, body, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote( formState ));
    }, [formState]);

    
    useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire({
                title: 'Nota actualizada',
                text: messageSaved,
                icon: "success"
            });
        }
    
    }, [messageSaved]);
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }
    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDeleteNote = () => {
        dispatch( startDeletingNote() );
    }

    

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>
                <input 
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                    ref={ fileInputRef }
                    
                />
                <IconButton
                    onClick={ () => fileInputRef.current.click() } 
                    disabled={ isSaving }
                    color="primary" 
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    color="primary" 
                    sx={{ p: 2 }}
                    onClick={ onSaveNote }
                    disabled={ isSaving } 
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió el día de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />

            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDeleteNote }
                    sx={{
                        mt: 2
                    }}
                    color="error"
                >
                    <DeleteOutline />
                    ELIMINAR
                </Button>

            </Grid>

            {/* Images gallery */}
            <ImageGallery images={ activeNote.imageUrls } />

        </Grid>
    )
}
