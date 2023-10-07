import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    movie: {
        padding: '10px',
        overflowX: 'hidden',
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "350px",
          },
    },
    links:{
        width: '100%',
        alignItems: 'center',
        fontWeight: 'bolder',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },
        '&:hover': {
            cursor: 'pointer',
        }
    },
    image:{
        borderRadius: '20px',
        height: '300px',
        marginBotton: '10px',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.5s ease-in-out',
        },
        [theme.breakpoints.up('xs')]: {
            height: '350px'
        },
    },
    title : {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '230px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom: '0px',
        textAlign: 'center',
    }
}))