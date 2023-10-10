import '../Button/Button.css';
import { Link } from 'react-router-dom';

function Button ({
    link,
    className,
    text,
}) {
    return (
        <Link to={link} target='_blank' className={className}>{text}</Link>
    );
};

export default Button;