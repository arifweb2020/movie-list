import React,{useState,useEffect} from 'react'
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from './../../components/Pagination/CustomPagination';
import Genres from "./../../components/Genres/Genres";
import useGenre from "./../../hooks/useGenre";

const Movies = () => {

    const [page,setPage]=useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () =>{

        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b278160cf43c03c878828e19e9e271b0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`) 
        const res1 = await res.json();

        //console.log(res1.results)

        const res2 = res1.results

        setContent(res2)
        setNumOfPages(res1.total_pages)

    }

    useEffect(()=>{

        fetchMovies();
    },[genreforURL,page])

    return (
        <>
            <span className="pageTitle">Movies</span>
            <Genres 
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
       
      />

     
            <div className="trending">
          
        {
         content && content.map((items)=>{
                return <SingleContent key={items.id} 
                id={items.id}
                poster={items.poster_path}
              title={items.title || items.name}
              date={items.first_air_date || items.release_date}
              media_type="movie"
              vote_average={items.vote_average}
                />
         })
        }
        </div>
        {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
        </>
    )
}

export default Movies
