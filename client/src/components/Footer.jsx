export default function Footer() {
    return (
        <div className="container-fluid bg-secondary text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-12 col-md-12 ">
                        <h4 className="text-uppercase mb-4">Get In Touch</h4>
                        <div className="d-flex align-items-center mb-2">
                            <div className="btn-square bg-dark flex-shrink-0 me-3">
                                <span className="fa fa-map-marker-alt text-primary"></span>
                            </div>
                            <span>123 Street, New York, USA</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <div className="btn-square bg-dark flex-shrink-0 me-3">
                                <span className="fa fa-phone-alt text-primary"></span>
                            </div>
                            <span>+012 345 67890</span>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.
                        </div>
                        <div className="col-md-6 text-center text-md-end">

                            Designed By <a className="border-bottom" href="">Ivanina_ST</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}