import { makeStyles } from '@mui/styles';
export default makeStyles(() => ({
    root:{
        display: 'flex',
        height: '100%',
        backgroundColor: 'yellow',
    },
    toolbar:{
        height: '70px',
        backgroundColor: 'red',
    },
    content:{
        flexGrow: 1,
        padding: '2em',
        backgroundColor: 'green',
    }
}));