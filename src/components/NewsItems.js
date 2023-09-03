const NewsItems = (props) => {
    
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
    <div className='my-3'>
        <div className="card">
            <div style={{display:'flex',justifyContent:'end'}}>
                <span className="position-absolute badge bg-danger" >{source}</span>
            </div>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-danger">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark" style={{cursor:"pointer"}}>Read More..</a>
            </div>
        </div>
    </div>
    )
}
export default NewsItems
