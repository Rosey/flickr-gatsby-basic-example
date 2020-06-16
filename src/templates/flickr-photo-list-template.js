import React from 'react';
import { graphql, Link } from 'gatsby';

function renderPhoto(item) {
  let photo = item.node;
  let flickrPhotoURL = `https://www.flickr.com/photos/YOUR FLICKR USER ID HERE/${photo.photo_id}`;
  return (
    <div key={photo.id}>
      <h1>{photo.title}</h1>
      <a href={flickrPhotoURL}>
        <img src={photo.url_m} alt={photo.title} />
      </a>
      <p>{photo.description}</p>
      <p>
        <a href={flickrPhotoURL}>View on Flickr</a>
      </p>
    </div>
  );
}

export default class PhotoList extends React.Component {

  renderPagination() {
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous Page
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page →
          </Link>
        )}
      </div>
    );
  }

  render() {
    const photos = this.props.data.allFlickrPhoto.edges;
    return (
      <div>
        {photos.map(renderPhoto)}
        Page {this.props.pageContext.currentPage} of {this.props.pageContext.numPages}
        {this.renderPagination()}
      </div>
    );
  }
}

export const photoListQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allFlickrPhoto(limit:$limit, skip: $skip, sort: { order: DESC, fields: [dateupload_date] }, filter: {media: {eq: "photo"}}) {
      edges {
        node {
          id
          title
          url_m
          description
          photo_id
        }
      }
    }
  }
`

