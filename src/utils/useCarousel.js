import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const CarouselPortfolio = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <>
            <StyledSlider {...settings}>
                <img src="./images/portfolio/cyland.jpg" alt="carousel" />
                <img src="./images/portfolio/pagination.jpg" alt="carousel" />
                <img src="./images/portfolio/pokemon.jpg" alt="carousel" />
                <img src="./images/portfolio/movieapp.jpg" alt="carousel" />
                <img src="./images/portfolio/todo.jpg" alt="carousel" />
                <img src="./images/portfolio/genesis.jpg" alt="carousel" />
                <img src="./images/portfolio/flag.jpg" alt="carousel" />
                <img src="./images/portfolio/huge.jpg" alt="carousel" />
                <img src="./images/portfolio/netflix.jpg" alt="carousel" />
                <img src="./images/portfolio/naver.jpg" alt="carousel" />
                <img src="./images/portfolio/vom.jpg" alt="carousel" />
            </StyledSlider>
        </>
    )
}

export const CarouselStory = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <>
            <StyledSlider {...settings} style={{ width: '480px' }}>
                <div>
                    <img src="./images/story/beijing.jpg" alt="beijing" />
                    <h6>China - Beijing</h6>
                </div>
                <div>
                    <img src="./images/story/bangkok.jpg" alt="bangkok" />
                    <h6>Thailand - Bangkok</h6>
                </div>
                <div>
                    <img src="./images/story/pataya.jpg" alt="pataya" />
                    <h6>Thailand - Pataya</h6>
                </div>
                <div>
                    <img src="./images/story/cebu.jpg" alt="cebu" />
                    <h6>Philippines - Cebu</h6>
                </div>
                <div>
                    <img src="./images/story/tokyo.jpg" alt="tokyo" />
                    <h6>Japan - Tokyo</h6>
                </div>
                <div>
                    <img src="./images/story/rotenburg.jpg" alt="rotenburg" />
                    <h6>Germany - Rotenburg</h6>
                </div>
                <div>
                    <img src="./images/story/munchen.jpg" alt="munchen" />
                    <h6>Germany - München</h6>
                </div>
                <div>
                    <img src="./images/story/salzburg.jpg" alt="salzburg" />
                    <h6>Austria - Salzburg</h6>
                </div>
                <div>
                    <img src="./images/story/salzgammergut.jpg" alt="salzgammergut" />
                    <h6>Austria - Salzgammergut</h6>
                </div>
                <div>
                    <img src="./images/story/hallstatt.jpg" alt="hallstatt" />
                    <h6>Austria - Hallstatt</h6>
                </div>
                <div>
                    <img src="./images/story/vienna.jpg" alt="vienna" />
                    <h6>Austria - Vienna</h6>
                </div>
                <div>
                    <img src="./images/story/praha.jpg" alt="praha" />
                    <h6>Czech - Praha</h6>
                </div>
                <div>
                    <img src="./images/story/bamberg.jpg" alt="bamberg" />
                    <h6>Germany - Bamberg</h6>
                </div>
                <div>
                    <img src="./images/story/wurzburg.jpg" alt="wurzburg" />
                    <h6>Germany - Würzburg</h6>
                </div>
                <div>
                    <img src="./images/story/astana.jpg" alt="astana" />
                    <h6>Kazahstan - Astana</h6>
                </div>
                <div>
                    <img src="./images/story/danang.jpg" alt="danang" />
                    <h6>Viet Nam - Danang</h6>
                </div>
                <div>
                    <img src="./images/story/hue.jpg" alt="hue" />
                    <h6>Viet Nam - Hue</h6>
                </div>
                <div>
                    <img src="./images/story/hoian.jpg" alt="hoian" />
                    <h6>Viet Nam - Hoi an</h6>
                </div>
                <div>
                    <img src="./images/story/jangjiajie.jpg" alt="jangjiajie" />
                    <h6>China - Jangjiajie</h6>
                </div>
            </StyledSlider>
        </>
    )
}

const StyledSlider = styled(Slider)`
    width : 330px;
    
    .slick-prev, .slick-next {
        z-index : 1;
    }

    .slick-prev {left : 0;}
    .slick-next {right : 0;}

    .slick-prev:before, .slick-next:before {
        color : #f1f1f1;
    }

    img {width : 100%;}
    h6 {text-align : center;}
`;