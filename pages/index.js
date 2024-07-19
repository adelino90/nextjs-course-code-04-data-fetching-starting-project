import { promises as fs } from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

function HomePage(props) {
  const {products} = props;
  return (
    <ul>
      {products.map(product=><li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  );
}

export async function getStaticProps(context){
  console.log(context)
  const filePath = path.join(process.cwd() , 'data','dummy-backend.json')
  const JSONfile = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(JSONfile);
  
  if(!data){
    return {
      redirect:{
        destination:'/no-data'
      }

    }
  }
  if(data.products.length === 0 ){
    return {notFound:true};
  }

  return{props:{
          products:data.products
       },
       revalidate:10
  };
}

export default HomePage;
