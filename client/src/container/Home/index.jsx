import { Button, Card, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNotification from '../../components/AppNotification';
import Carousel, { CarouselItem } from '../../components/CustomCorousel';
import './index.scss';

const Home = () => {
    
    const [bannerList, setBannerList] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:3000/banners")
      .then(res => res.json())
      .then(
        (result) => {
          setBannerList(result)
        },
        () => {
         AppNotification('error', 'Banners', 'Error while fetching banners')
        }
      );
      fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(
        (result) => {
            setCategories(result)
        },
        () => {
         AppNotification('error', 'Categories', 'Error while fetching categories')
        }
      );
    },[]);

    return (
        <Layout className="home-container">
             <Carousel showThumbs={false}>
                 {
                   bannerList &&  bannerList.map(item => {
                         return (
                            item.bannerImageUrl &&  <CarouselItem key={item.id}>
                                 <img alt={item.bannerImageAlt} src={item.bannerImageUrl} className="img-carousel"/>
                             </CarouselItem>
                         )
                     })
                 }
             </Carousel>
             <section>
             {
                 categories  && categories.map((item, index) => {
                    return (
                        <Card key={item.id} bordered={false}>
                            <div className='display-each-card'>
                            {
                                (index%2 === 0 ) && 
                                <div>
                                    <img src={item.imageUrl} alt={`category-image_${index}`} className="avtar-img" />
                                </div>
                            }
                            <div>
                            <div className='card-title'>
                                {
                                   item.name 
                                }
                            </div>
                            <div>
                                <div className='card-desc'>{item.description}</div>
                                <div><Button className='card-btn' onClick={()=>{navigate('/products', {state: item?.id})}}>{`Explore ${item.name}`}</Button></div>
                            </div>
                            </div>
                            {
                                (index%2 !== 0 ) && 
                                <div>
                                    <img src={item.imageUrl} alt={`category-image_${index}`} className="avtar-img" />
                                </div>
                            }
                            </div>
                        </Card> 
                    )
                 })
             }
             </section>
        </Layout>
    )
}
export default  Home ;