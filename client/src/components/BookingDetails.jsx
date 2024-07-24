import styles from '../components/BookingDetails.module.css';

export default function BookingDetails({
    date,
    services,
    time,
    _id
}) {
    return (
        <div className={styles.detailsBox}>
            {services.map(service => (
                        <h3 key={`${service.name}${_id}`}>
                            {service.name} - {service.price} Euro
                        </h3>
                    ))}
            <ul className={styles.timeDetails}>
                <li>Date: {new Date(date).toLocaleDateString()}</li>
                <li>Hour: {time}</li>
                
            </ul>
            <button className='btn btn-light w-100 py-3 mb-2'>Edit</button>
            <button className='btn btn-primary w-100 py-3'>Delete</button>
        </div>
    );
}
