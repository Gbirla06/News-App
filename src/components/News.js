import { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner  from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import defaultImg from "./DefaultImage.jpg"

const News = (props) => {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) =>{
    return str[0].toUpperCase() + str.slice(1)
  }
  const  updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    props.setProgress(30);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100);
  }
  
  useEffect(() =>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  },[]) 

  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

  return (
    <>
      <h1 className="text-center" style = {{marginTop:'100px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>        
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles?articles.length:0}
        next={fetchMoreData}
        hasMore={articles ? articles.length!==totalResults : false}
        loader={<Spinner/>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element,i)=>{
              return <div className="col-md-4" key={i}>
                    <NewsItems 
                      title={element.title?element.title.slice(0,43):''} 
                      description={element.description? element.description.slice(0,88):''} 
                      imageUrl={element.urlToImage?element.urlToImage:"https://www.hindustantimes.com/ht-img/img/2023/09/02/1600x900/salaar_1693647715443_1693647715642.jpeg"} 
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name} />
                </div>
            })}

          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default News;

News.defaultProps = {
  country:'in',
  pageSize:8,
  category:'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}