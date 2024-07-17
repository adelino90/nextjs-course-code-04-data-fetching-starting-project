import { promises as fs } from 'fs';
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
  const filePath = path.join(process.cwd() , 'data','dummy-backend.json')
  const JSONfile = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(JSONfile);
  console.log(data)
  return{props:{
    products:data.products
  }};
}

export default HomePage;
