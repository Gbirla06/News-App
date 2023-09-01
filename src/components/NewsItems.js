import React, { Component } from 'react'

export class NewsItems extends Component {
    
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
        <div className='my-3'>
            <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"93%"} }>{source}</span>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p class="card-text"><small className="text-danger">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" style={{cursor:"pointer"}}>Read More..</a>
                </div>
            </div>
        </div>
        )
    }
}

export default NewsItems
