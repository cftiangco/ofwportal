if(process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: 'mongodb://ofwportalprod:pacita30@ds053449.mlab.com:53449/ofw-portal-prod'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/ofw_portal'}
}