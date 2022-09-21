import './DeviceListing.css';

export default function DeviceListing(props) {
    let items = [];
    if (props.isLoading) {
        items.push(<div key={0}>Loading...</div>);
    } else {
        props.devices.forEach((d) => items.push(
            <div key={d._id} className='listview-item device' onClick={() => props.onChange(d)}>
                <div className='header'>
                    {d.basicParams.name}
                </div>
                <div className='desc'>{d._id}</div>
            </div>
        ));
    }
    return <div className='listview devices'>
        {items}
    </div>
}