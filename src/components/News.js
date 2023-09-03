import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (str) =>{
    return str[0].toUpperCase() + str.slice(1)
  }
  constructor(props){
    super();
    // console.log("Constructor from news component")
    this.state={
      articles : [],
      loading : true,
      page:1,
      totalResults:0
    }
    console.log(props.category)
    document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.props.setProgress(30);
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }

  handleNextClick = async () =>{
    this.setState({
      page:this.state.page+1
    })
    this.updateNews();
  }
  handlePrevClick = async () =>{
    this.setState({
      page:this.state.page-1
    })
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({
      page:this.state.page+1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
    })

  };
  cnt=1;
  render() {

    return (
      <>
        <h1 className="text-center" style = {{margin:'40px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url?element.url:this.cnt++}>
                      <NewsItems 
                        title={element.title?element.title.slice(0,43):''} 
                        description={element.description? element.description.slice(0,88):''} 
                        imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2018/07/Apollo-ACE-thruster-firing-June.jpg?w=1154"} 
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
}
