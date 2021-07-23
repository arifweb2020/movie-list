import React,{useState,useEffect} from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css'

const Trending = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    // const fetchTrending = async () => {
    //     const { data } = await axios.get(
    //       `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    //     //   'https://api.themoviedb.org/3/trending/all/day?api_key=b278160cf43c03c878828e19e9e271b0'
    //     );
    //         console.log(data.results)
    //     setContent(data.results);

    //   };

    const fetchTrending = async () =>{

        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=b278160cf43c03c878828e19e9e271b0&page=${page}`)

        const res1 = await res.json();

       // console.log(res1.results);

        const res2 = res1.results;

        setContent(res2);
        localStorage.setItem("Movie-List", JSON.stringify(res2))
    }

      useEffect(()=>{
        window.scroll(0, 0);
        fetchTrending();  
      },[page])

    return (
        <>
        <h3>Trending</h3> 
        <div className="trending">
           
        {
         content && content.map((items)=>{
                return <SingleContent key={items.id} 
                id={items.id}
                poster={items.poster_path}
              title={items.title || items.name}
              date={items.first_air_date || items.release_date}
              media_type={items.media_type}
              vote_average={items.vote_average}
                />
         })
        }
        </div>
        <CustomPagination setPage={setPage} />
        
        </>
    )
}

export default Trending
