import { Component } from "react"

export default class Gallery extends Component{
    state={
        pictures:[],
        error:null,
        status:'idle',
        page:1,
    }

    fetchPictures(search,page){
        this.setState({status:'pending'});
        const url=`https://api.spacexdata.com/v3/launches`;

        fetch(url).then(response=>{
            if(response.ok){
                return response.json();
            }

            return Promise.reject(new Error(`No picture with ${search} title`))
        })
        .then((pictures)=>{
            this.setState({status:'resolved'})
            this.setState((previousState)=>{
                return {
                    ...previousState,
                    pictures:[
                    ...previousState.pictures,
                    ...pictures.hits
                    ]
                }
            })
        })
        .catch((error)=>{
            this.setState({error,status:'rejected'})
        })
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.picture !== this.props.picture){
            this.fetchPictures(this.props.picture,this.props.page)
        }
    }

    handler =()=>{
        this.setState((prevState)=>{
            return {
                ...prevState,
                page:prevState + 1,
            }
        })

        this.fetchPictures(this.props.picture,this.state.page)
    }

    render(){

        const {pictures,status,error}=this.state;

        if(status==='idle'){
            return <div>Enter name of the picture</div>
        }

       if(status==='pending'){
        return <div>Loading...</div>
       }

       if(status==='error'){
        return <div>{error}</div>
       }

       if(status==='resolved'){
        return (
            <>
            <ul>
                {pictures.map(picture=><li>Hello</li>)}
            </ul>
            </>
        )
       }

    }
}