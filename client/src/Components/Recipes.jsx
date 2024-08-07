import { useLocation } from "react-router-dom";
import Card from './Card.jsx';
import '../Styles/Recipes.css';
import RecipeFinder from './RecipeFinder.jsx';
import { useState,useEffect } from "react";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Recipes({data}) {
    const [currData,setCurrData]=useState(null);
    const location = useLocation();
    useEffect(()=>{
        if(data){
            setCurrData(data);
        }else{
            if(location&&location.state){
                setCurrData(location.state.meals);
            }
        }
    },[data,location.state.meals])

    return (
        <>
        <RecipeFinder/>
        <div className="recipes">
       {currData&&currData.map((i,index) =><Card key={index} data={i}/>)}
       </div>
        </>
    )
}