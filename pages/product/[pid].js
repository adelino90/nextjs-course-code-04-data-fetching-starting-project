import { Fragment } from "react";
import { promises as fs } from 'fs';
import path from 'path';

function ProductDetailPage(props){
    const { loadedProduct } = props;

    if(!loadedProduct){
        return <p>Product Not Found</p>;
    }
    return (
    <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
    )
}
export async function getStaticProps(context){
    const { params } = context;
    const productId = params.pid;
    const data = await getData();


    const product = data.products.find(product => product.id ===productId);
    if (!product){
        return { notFound:true};
    }
    return{
        props:{loadedProduct:product}
    }

}

async function getData(){
    const filePath = path.join(process.cwd() , 'data','dummy-backend.json')
    const JSONfile = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(JSONfile);
    return data;
}
export async function getStaticPaths(){
    const data = await getData();

    const ids = data.products.map((product) => product.id);

    const pathswithParams = ids.map((id) => ({params:{pid:id}}))
    return {
        paths:pathswithParams,
        fallback:true
    }
}
export default ProductDetailPage