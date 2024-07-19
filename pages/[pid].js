import { Fragment } from "react";
import { promises as fs } from 'fs';
import path from 'path';

function ProductDetailPage(props){
    const { loadedProduct } = props;
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

    const filePath = path.join(process.cwd() , 'data','dummy-backend.json')
    const JSONfile = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(JSONfile);

    const product = data.products.find(product => product.id ===productId);
    return{
        props:{loadedProduct:product}
    }

}

export async function getStaticPaths(){
    return {
        paths:[
            {params:{pid:'p1'}},
            {params:{pid:'p2'}},
            {params:{pid:'p3'}},
            {params:{pid:'p4'}}
        ],
        fallback:false
    }
}
export default ProductDetailPage