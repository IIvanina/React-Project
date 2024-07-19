import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Testimonial.module.css'; // Correct import path for the CSS module

// Import images
import testimonial1 from '../assets/img/testimonial-1.jpg';
import testimonial2 from '../assets/img/testimonial-2.jpg';
import testimonial3 from '../assets/img/testimonial-3.jpg';

export default function Testimonial() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        customPaging: function(i) {
            const images = [testimonial1, testimonial2, testimonial3];
            return (
                <img src={images[i]} alt={`testimonial ${i + 1}`} className={styles.testimonialImage} />
            );
        },
        appendDots: dots => (
            <ul className={styles.slickDots}> {dots} </ul>
        ),
    };

    return (
        <div className={`container-xxl py-5 ${styles.testimonialContainer}`}>
            <div className="container">
                <div className={`text-center mx-auto mb-5 wow fadeInUp ${styles.testimonialHeader}`} data-wow-delay="0.1s">
                    <p className="d-inline-block bg-secondary text-primary py-1 px-4">Testimonial</p>
                    <h1 className="text-uppercase">What Our Clients Say!</h1>
                </div>
                <Slider {...settings} className={`testimonial-carousel wow fadeInUp`} data-wow-delay="0.1s">
                    <div className={`testimonial-item ${styles.testimonialItem}`}>
                        <h4 className="text-uppercase">Client Name</h4>
                        <p className="text-primary">Profession</p>
                        <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
                    </div>
                    <div className={`testimonial-item ${styles.testimonialItem}`}>
                        <h4 className="text-uppercase">Client Name</h4>
                        <p className="text-primary">Profession</p>
                        <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
                    </div>
                    <div className={`testimonial-item ${styles.testimonialItem}`}>
                        <h4 className="text-uppercase">Client Name</h4>
                        <p className="text-primary">Profession</p>
                        <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
                    </div>
                </Slider>
            </div>
        </div>
    );
}
