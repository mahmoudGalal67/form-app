import { CircularProgress, Container,  Paper,   Slider,  TextField, Grid, makeStyles, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BootcampCard from '../components/bootcampCard'
import {useLocation, useHistory} from "react-router-dom"


const useStyles = makeStyles({
  root:{
    marginTop:70,
  },
  loader:{
    width: "100%",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
  },
  filters:{
    padding: "15px"
  },
  filtersb:{
    padding: " 20px 0"
  },
  display:{
    display: "flex",
    justifyContent:"space-between"
  }

})

function Bootcamp() {
const classes = useStyles() 
const history = useHistory()
const [bootcamps , setbootcamps] = useState([])
const [loading , setloading] = useState(false)
const [slidermax , setslidermax] = useState(1000)
const [sliderrange , setsliderrange] =useState([0 , 800])
const[urlrange , seturlrange] =useState("")

const [radiosorting , setradiosorting] = useState("descending")
const [pricesorting , setpricesorting] = useState("")
const uselocation = useLocation()
const params = uselocation.search

const updateuivalues = (values)=>{
setslidermax(Number(values.maxprice))
setsliderrange([0 , Number(values.maxprice)])
if(values.filtering){
  setsliderrange([Number(values.filtering.price.gte) , Number(values.filtering.price.lte)])
}
// if(values.filter){
//   console.log(values.filter.price);
//   setradiosorting(values.filter.price)
// }
}

const onslidercomitted = ()=>{
const url = `?price[gte]=${sliderrange[0]}&price[lte]=${sliderrange[1]}`
seturlrange(url)
history.push(url)
}
const handletextfield = ()=>{
const url = `?price[gte]=${sliderrange[0]}&price[lte]=${sliderrange[1]}`
seturlrange(url)
history.push(url)
}

const handleradiosorting = (e)=>{
  if(e.target.value==="descending"){
    setradiosorting(e.target.value)
    setpricesorting("price")
    
  }
  else{
    setradiosorting(e.target.value)
    setpricesorting("-price")
    
  }
}


const base_url = "http://localhost:5000"
useEffect(()=>{
  let cancel
  const fetchdata = async()=> {
    setloading(true)
    try{

      let query
      if(params && !urlrange ){
        query = params
      }
      else{
        query = urlrange
      }
      if(pricesorting.length!==0){
        if(query.length===0){
          query=`?sort=${pricesorting}`
        }
        else{
          query = query + "&sort=" + pricesorting  
        }
      }
        const {data} = await axios({
        url:base_url +"/api/bootcamps" + query,
        method:"GET",
        cancelToken: new axios.CancelToken((c)=> cancel=c)})
      setbootcamps(data.data)
      setloading(false)
      updateuivalues(data.uivalues)
    }
    catch(err){
  if(axios.isCancel(err))return
  // console.log(err.response.data);
}
}
fetchdata()
return ()=> cancel()
},[urlrange,params,pricesorting])

const textfieldrange = (e ,type)=>{
  if(type ==="lower"){
    const textrange = [...sliderrange]
    textrange[0]=Number(e.target.value)
    setsliderrange(textrange)
  }else if(type === "upper"){
    const textrange = [...sliderrange]
    textrange[1]=Number(e.target.value)
    setsliderrange(textrange)
  }
}
  return (
    <Container className={classes.root} >
    <Paper >
      <Grid container >
        <Grid  item xs={12} sm={6}  className={classes.filters}>
          <Typography  gutterBottom> Filters</Typography>
          <div>
            <Slider className={classes.filtersb}
            min={0}
            max={slidermax} 
            value={sliderrange}
            valueLabelDisplay="auto"
            onChange={(e,newvalue)=>setsliderrange(newvalue)}
            onChangeCommitted={onslidercomitted}
            />
          </div>  
          <div className={classes.display}>
            <TextField 
            size='small'
            id='upper'
            label="min-price"
            variant='outlined'
            type="number"
            disabled={loading}
            value={sliderrange[0]}
            onChange={(e)=>textfieldrange(e , "lower")}
            onBlur={handletextfield}
            />
            <TextField 
            size='small'
            id='lower'
            label="max-price" 
            variant='outlined'
            type="number"
            disabled={loading}
            value={sliderrange[1]}
            onChange={(e)=>textfieldrange(e , "upper")}
            onBlur={handletextfield}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By</Typography>

            <FormControl component="fieldset"   >
              <RadioGroup
                aria-label="price-order"
                name="price-order"
                value={radiosorting}
                onChange={handleradiosorting}
              >
                <FormControlLabel
                  value="descending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Lowest - Highest"
                />

                <FormControlLabel
                  value="ascending"
                  disabled={loading}
                  control={<Radio />}
                  label="Price: Highest - Lowest"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
      </Grid>
    </Paper>
      <Grid container spacing={2} className={classes.root}>
        {loading ? (
          <div className={classes.loader} >
          <CircularProgress size="3rem" thickness={5}/>
          </div>
        )
        :(
          bootcamps.map((bootcamp) =>(
            <Grid item lg={3} md={4} sm={6} xs={12}  key={bootcamp._id}>
              <BootcampCard bootcamp={bootcamp}/>
            </Grid>
          ) )
        )
        }
      </Grid>
    </Container>
  )
}

export default Bootcamp