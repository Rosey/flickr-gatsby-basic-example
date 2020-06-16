module.exports = {
  pathPrefix: "/demos/basic-flickr-feed/",
  plugins: [
    {
      resolve: 'gatsby-source-flickr',
      options: {
        api_key: 'YOUR API KEY HERE',
        user_id: 'YOUR FLICKR USER ID HERE'
      }
    },
  ],
}
