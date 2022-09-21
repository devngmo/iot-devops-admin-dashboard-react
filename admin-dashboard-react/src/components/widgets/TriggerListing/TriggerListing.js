import './TriggerListing.css';

export default function TriggerListing(props) {
    let items = [];
    if (props.isLoading) {
        items.push(<div>Loading...</div>);
    } else {
        props.triggers.forEach((t) => items.push(
            <div key={t._id} className='listview-item trigger' onClick={() => props.onChange(t)}>
                <div className='header'>
                    {t.name}
                </div>
                <div className='desc'>{t._id}</div>
            </div>
        ));
    }
    return <div className='listview triggers'>
        {items}
    </div>
}