import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export class admin extends Component {
   state = {
      anncs: null
   }
   componentDidMount() {
      axios.get('/anncs')
         .then(res => {
            this.setState({
               anncs: res.data
            })
         })
         .catch(err => {
            console.error(err)
         })
   }
   render() {
      let currentAnncs = this.state.anncs ? (
         this.state.anncs.map(annc => <p>{annc}</p>)
      ) : <p>Loading...</p>
      return (
         <Grid container>
            <Grid item sm={8} xs={12}>
               {currentAnncs}
            </Grid>
         </Grid>
      )
   }
}

export default admin
