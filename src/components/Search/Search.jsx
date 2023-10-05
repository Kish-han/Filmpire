import { useState, useEffect } from "react"
import { TextField, InputAdornment } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import useStyles from "./styles"
import { searchMovie } from "../../features/currentGenreOrCategory"

const Search = () => {
    const classes = useStyles()
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const location = useLocation()
    const handleKeyPress = (event) =>{
        console.log(query)
        if(event.key === 'Enter'){
            console.log('searching')
            dispatch(searchMovie(query))
        }
    }
  return (
    <div className={classes.searchContainer}>
    <TextField 
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        varient = 'standard'
        InputProps={{
            className: classes.input,
            startAdornment:(
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
    />
    </div>
  )
}

export default Search