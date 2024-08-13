import React, { useState, useEffect } from 'react';
import * as likesService from '../services/likesService.js'; // Adjust the import path as necessary

export default function Services() {
    const [likes, setLikes] = useState({
        'Haircut': 0,
        'Beard Trim': 0,
        'Mans Shave': 0,
        'Hair Dyeing': 0,
        'Mustache': 0,
        'Stacking': 0,
    });

    // Fetch likes from the server when the component mounts
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const services = ['Haircut', 'Beard Trim', 'Mans Shave', 'Hair Dyeing', 'Mustache', 'Stacking'];
                const fetchedLikes = {};

                for (let service of services) {
                    const data = await likesService.getLikes(service);
                    fetchedLikes[service] = data.likes || 0;
                }

                setLikes(fetchedLikes);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, []);

    // Function to handle likes increment
    // const handleLike = async (service) => {
    //     try {
    //         const updatedData = await likesService.incrementLike(service);
    //         setLikes((prevLikes) => ({
    //             ...prevLikes,
    //             [service]: updatedData.likes, // Assuming the server returns the updated likes count
    //         }));
    //     } catch (error) {
    //         console.error('Error incrementing like:', error);
    //     }
    // };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                    <p className="d-inline-block bg-secondary text-primary py-1 px-4">Services</p>
                    <h1 className="text-uppercase">What We Provide</h1>
                </div>
                <div className="row g-4">
                    {Object.keys(likes).map((service, index) => (
                        <div
                            key={service}
                            className="col-lg-4 col-md-6 wow fadeInUp"
                            data-wow-delay={`${index * 0.2}s`}
                        >
                            <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
                                <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                    <img className="img-fluid" src={`src/assets/img/${service.toLowerCase().replace(' ', '-')}.png`} alt={`${service}`} />
                                </div>
                                <div className="ps-4">
                                    <h3 className="text-uppercase mb-3">{service}</h3>
                                    <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
                                    <span className="text-uppercase text-primary">From $15</span>
                                    <div>
                                        
                                        <span>{likes[service]} Likes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
