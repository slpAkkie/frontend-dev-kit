const del = require( 'del' )

module.exports = ( cb ) => {
  return del( 'build' ).then( () => {
    cb()
  } )
}
