 const config =  {
  headers: {
            'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            } 
         }  ;

   module.exports= config;