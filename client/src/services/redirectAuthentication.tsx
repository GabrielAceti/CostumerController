import react, {useState, useEffect} from 'react';
import api from './api';
import { getToken } from './auth';
import { Route, Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Authentication({component: Component, ...rest}: any){
    const [redirect, setRedirect] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        async function verify() {           
            var res = await api.post('/user/checktoken', {params: getToken()} );
            console.log(res.data)

            if(res.data.status === 200){
                setLoad(false);
                setRedirect(false);
            }
            else{
                setLoad(false);
                setRedirect(true);
            }            
        }
        verify();
        
    }, [])

    return(       
            load?<div><LinearProgress /></div>:<Route { ...rest}
        render={props => !redirect?(
            <Component { ...props } />
        ):<Redirect to={{pathname: '/admin/login', state:{from: props.location}}} />
        } />
              
    )
}