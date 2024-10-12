import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null, 
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true; 
        },
        addNewEmptyNote: (state,  action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action ) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action ) => {
            state.notes = action.payload;
        },
        setSavingNote: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, { payload } ) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if(note.id === payload.id){
                  return payload; 
                }
                return note;
            });

            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, { payload } ) => {
            state.notes = state.notes.filter((note) => note.id !== payload);
            state.activeNote = null;
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote, 
    clearNotesLogout, 
    deleteNoteById, 
    savingNewNote,
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote,
    setSavingNote, 
    updateNote,
} = journalSlice.actions;