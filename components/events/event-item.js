import classes from './event-item.module.css';
import Button from '../Ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

function eventItem(props) {
    const { title, image, date, location, id } = props;

    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const Addressdata = location.replace(',', '\n');
    const exploreLink = `/events/${id}`;
    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>
                            {readableDate}
                        </time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>
                            {Addressdata}
                        </address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>   <ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}
export default eventItem;