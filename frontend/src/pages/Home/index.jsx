import images from "../../assets/images";
import SectionContent from "../../components/SectionContent";
import SectionContentItem from "../../components/SectionContent/SectionContentItem";
import SliderComponent from "../../components/Slider";
import ZingChart from "../../components/ZingChart";
import './Home.scss';

function Home() {
    const dataSlider = [
        {
            link: '/',
            image: images.slider1,
        },
        {
            link: '/',
            image: images.slider2,
        },
        {
            link: '/',
            image: images.slider3,
        },
        {
            link: '/',
            image: images.slider4,
        },
        {
            link: '/',
            image: images.slider5,
        },
        {
            link: '/',
            image: images.slider6,
        },
    ];

    const fakeData = [
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
            title: '10 nghệ sĩ xuất sắc nhất 2022',
            author: 'Hoàng Thùy Linh, AMEE,MONO,Karik'
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
            title: '10 nghệ sĩ xuất sắc nhất 2022',
            author: 'Hoàng Thùy Linh, AMEE,MONO,Karik'
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
            title: '10 nghệ sĩ xuất sắc nhất 2022',
            author: 'Hoàng Thùy Linh, AMEE,MONO,Karik'
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
            title: '10 nghệ sĩ xuất sắc nhất 2022',
            author: 'Hoàng Thùy Linh, AMEE,MONO,Karik'
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg",
            title: '10 nghệ sĩ xuất sắc nhất 2022',
            author: 'Hoàng Thùy Linh, AMEE,MONO,Karik'
        }
    ];
    let dataLength = fakeData.length;
    return (
        <div className="pageContainer">
            <SliderComponent className="homePage-slider" data={dataSlider}/>
            <SectionContent all={true} title={'Nhạc Hay Ho Của 2022 ⭐'} children={
                
                fakeData.map((item,index) => (
                    <SectionContentItem key={index}
                        style={{
                            "--width":`calc(100% / ${dataLength})`,
                            "--gap":"14px"
                        }}
                        data={item}
                    />
                ))
            }/>
            <SectionContent title={'Có thể bạn muốn nghe'} children={    
                fakeData.map((item,index) => (
                    <SectionContentItem key={index}
                        style={{
                            "--width":`calc(100% / ${dataLength})`,
                            "--gap":"14px"
                        }}
                        data={item}
                    />
                ))
            }/>
            <SectionContent title={<div className="sectionContentTitle-author">
                <div className="sectionContentTitle-author-img">
                    <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/0/c/f/3/0cf36f4536237f8efb0b25a83301200b.jpg" alt="" />
                </div>
                <div className="sectionContentTitle-author-content">
                    <span className="label">Dành cho fan</span>
                    <h3 className="authorName">DatKaa</h3>
                </div>
            </div>} children={    
                fakeData.map((item,index) => (
                    <SectionContentItem key={index}
                        style={{
                            "--width":`calc(100% / ${dataLength})`,
                            "--gap":"14px"
                        }}
                        data={item}
                    />
                ))
            }/>

            <ZingChart />
        </div>
    );
}

export default Home;