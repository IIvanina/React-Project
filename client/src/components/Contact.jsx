export default function Contact() {
    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-0">
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div className="bg-secondary p-5">
                        <p className="d-inline-block bg-dark text-primary py-1 px-4">Contact Us</p>
                        <h1 className="text-uppercase mb-4">Have Any Query? Please Contact Us!</h1>
                        <h5 className="mb-4">Phone: 0889 222 222</h5>
                       
                    </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
    <div className="h-100" style={{ minHeight: '400px' }}>
        <iframe
            className="google-map w-100 h-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
            style={{
                filter: 'grayscale(100%) invert(92%) contrast(83%)',
                border: '0'
            }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
        ></iframe>
    </div>
</div>
            </div>
        </div>
    </div>
    );
} 