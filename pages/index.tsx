import Link from 'next/link';
import Layout from '../components/Layout';
import Image from 'next/image';
import  Calendar from '../components/Calendar';


const IndexPage = () => (
  <Layout title="Cultural Fusion Hub">
    <header>
      <div style={{ maxHeight: '1000px', overflow: 'hidden' }} className="relative w-full">
        <Image src="/fusion.jpeg" alt='pic' height={1000} width={2000} style={{objectFit: "cover"}} quality={100} />
        <div className="absolute bottom-1/4 right-1/2 transform translate-x-1/2">
          {/* <h1 className="text-white text-4xl">Welcome to The Cultural Fusion Hub</h1> */}
        </div>
      </div>
    </header>
    <main className="height-30vh">
      <div className="bg-gray-100 p-4">
        <article className=" p-5 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius alias inventore repellendus sit quia architecto praesentium commodi deserunt consectetur. Totam molestias tempora soluta iste, rerum dicta nihil assumenda eveniet? Hic?
        </article>
      </div>
    </main>
    <div className="p-3">
      <div className="p-3">
        <Calendar />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
