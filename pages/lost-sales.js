import { useEffect,useState } from "react"
import useSWR from 'swr';

function LostSalesPage(props){
    const [sales,setSales] = useState(props.sales);
    const [isLoading,setLoading] = useState(true)
  
    const { data , error,} = useSWR('https://next-js-3bbeb-default-rtdb.firebaseio.com/sales.json');

    // useEffect(()=>{
       
    //     if(data){
    //         const transformedSales = [];
          
    //         for(const key in data){
    //                         transformedSales.push({
    //                             id:key,
    //                             username:data[key].username,
    //                             volume:data[key].volume
    //                         })
    //                     }
    //         setSales(transformedSales)
    //     }
    // },[data]);
    useEffect(()=>{
        setLoading(true)
        fetch('https://next-js-3bbeb-default-rtdb.firebaseio.com/sales.json').then
        ((response) => response.json())
        .then(data=>{
            const transformedSales = [];
            for(const key in data){
                console.log(data[key])
                transformedSales.push({
                    id:key,
                    username:data[key].username,
                    volume:data[key].volume
                })
            }
            setSales(transformedSales)
            setLoading(false)
        })
    },[])
    if(error){
        return <p>Failed to load</p>
    }
    if(!data && !sales){
        return <p>Loading...</p>
    }
    return(
        <ul>
            {sales.map((sale)=>(
                <li key = {sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps(){

       const response = await fetch('https://next-js-3bbeb-default-rtdb.firebaseio.com/sales.json')
       const data = await response.json();
        
        const transformedSales = [];
        for(const key in data){
            console.log(data[key])
            transformedSales.push({
                id:key,
                username:data[key].username,
                volume:data[key].volume
            })
        }
        return{
            props:{
                sales:transformedSales  
            },revalidate:10
        };

}
export default LostSalesPage