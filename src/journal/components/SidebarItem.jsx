import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SidebarItem = ( { title, body, id, date, imageUrls = [] } ) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.lenght > 17 
        ? title.substring(0, 17) + '...' 
        : title
    }, [title]);

    const onSelectedNote = () => {
        const noteSelected = {
            id, 
            body, 
            title, 
            date,
            imageUrls
        }

        dispatch(setActiveNote(noteSelected));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onSelectedNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid>
                    <ListItemText primary={ newTitle }/>
                    <ListItemText secondary={ body }/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
