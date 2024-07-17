import { promises as fs } from 'fs';
import { notFound, redirect } from 'next/navigation';
import path from 'path';

function HomePage(props) {
  const {products} = props;
  return (
    <ul>
      {products.map(product=><li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

export async function getStaticProps(){
  console.log('..Regenerating')
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
