import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner'
import PropTypes from 'prop-types'

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
      loading : false,
      page:1
    }
    console.log(props.category)
    document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4f6bf82687341569600a26311fabd77&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
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
  cnt=1;
  render() {
    // console.log("render");

    return (
      <div className='container my-4'>
        <h1 className="text-center" style = {{margin:'40px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        {this.state.loading && <Spinner/>}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
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
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
