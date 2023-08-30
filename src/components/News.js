import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {
  articles=[
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        }
    ]
  constructor(){
    super();
    console.log("Constructor from news component")
    this.state={
      articles : [],
      loading : false,
      page:1
    }
  }
  async componentDidMount(){
    // console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d4f6bf82687341569600a26311fabd77&page=1&pageSize=10`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
    console.log(parsedData);
  }

  handleNextClick = async () =>{
    console.log("Next");
    if(this.state.page+1> Math.ceil(this.state.totalResults/10)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d4f6bf82687341569600a26311fabd77&page=${this.state.page+1}&pageSize=10`
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page:this.state.page+1,
        articles:parsedData.articles
      })
    }
  }
  handlePrevClick = async () =>{
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d4f6bf82687341569600a26311fabd77&page=${this.state.page-1}&pageSize=10`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles
    })
  }
  cnt=1;
  render() {
    // console.log("render");

    return (
      <div className='container my-4'>
        <h2>NewsMonkey Top HeadLines</h2>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        <div className="row">
          {this.state.articles.map((element)=>{
             return <div className="col-md-4" key={element.url?element.url:this.cnt++}>
                  <NewsItems 
                    title={element.title?element.title.slice(0,43):''} 
                    description={element.description? element.description.slice(0,88):''} 
                    imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2018/07/Apollo-ACE-thruster-firing-June.jpg?w=1154"} 
                    newsUrl={element.url} />
              </div>
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
