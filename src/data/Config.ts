var config = {  
  server: 'localhost',  
  authentication: {
      type: 'default',
      options: {
          userName: 'sa', 
          password: 'masterkey'  
      }
  },
  options: {
     
      encrypt: true,
      database: 'DB'  
  }
}; 

export default config;
