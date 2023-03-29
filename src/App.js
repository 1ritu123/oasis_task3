 import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Recipe from "./RecipeFood";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from "@mui/material"; 
 
 


    

function App() {
   const APP_ID='73fb0ef6';
    const APP_KEY="0edc410333e7b54f59c2f0dd75dcd8d8";
    const [recipe,setRecipe]=useState([])
    const [RecipeName,setRecipeName]=useState('')
    const [Query,setQuery]=useState('noodles')
 
     useEffect(()=>{
      getrecipe()
      console.log(Query);
     },[Query]);

    const getrecipe= async ()=>{
      const response =await axios.get( `https://api.edamam.com/api/recipes/v2?type=public&q=${Query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      setRecipe(response.data.hits);
      console.log(response.data.hits)
        
    }

    const updateQuery=(e)=>{
      e.preventDefault();
      setQuery(RecipeName)
       
    }
  
  return ( 
    < >
     
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,margin:'10px auto' }}
      onSubmit={updateQuery}
    >
     
      <InputBase
       onChange={(event)=>setRecipeName(event.target.value)}
       value={RecipeName}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search recipe "
        inputProps={{ 'aria-label': 'search recipe' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
     
     
       <Grid container spacing={2}>
       
             
       {recipe.map((item)=>{
     
         return(
          <div style={{margin:'10px'}}>
          <Grid  item xs={12} style={{marginLeft:70}} >
        <Recipe key={item.recipe.label} 
        title={item.recipe.label}
         image={item.recipe.image} 
         calories={item.recipe.calories} 
         ingredients={item.recipe.ingredients } 
        thumbnail={item.recipe.images.THUMBNAIL.url}
        
       />
   
      </Grid> 
      </div>)
       
      })} 
      
      </Grid>
   
   
      </>
       
    
  );
  }

export default App;