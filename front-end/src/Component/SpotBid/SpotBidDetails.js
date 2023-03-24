import React, { useEffect, useState } from 'react'
import { api } from '../../Api';

const SpotBidDetails = () => {
    const [activeSpotBidData, setActiveSpotBidData] = useState([]);
    const [expireSpotBidData, setExpireSpotBidData] = useState([]);
    useEffect(() => {
        getActiveSpotBidData();
        getExpireSpotBidData();
    }, [])
    const getActiveSpotBidData = async () => {
        const datas = await api.get('/spot-bid-active-details')
        setActiveSpotBidData(datas.data)
    }
    const getExpireSpotBidData = async () => {
        const datas = await api.get('/spot-bid-expire-details')
        setExpireSpotBidData(datas.data)
    }

    return (
        <>
            <div className='product-list'>
                <h3>SpotBid Details  Active</h3>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Email I'd</li>
                    <li>Phone No</li>
                    <li>From</li>
                    <li>Destination</li>
                    <li>Distance</li>
                    <li>Bid Amount(INR)</li>
                </ul>
                {activeSpotBidData &&
                    activeSpotBidData.map((spotBid, index) =>
                        <ul key={spotBid._id}>
                            <li>{index + 1}</li>
                            <li>{spotBid.name}</li>
                            <li>{spotBid.email}</li>
                            <li>{spotBid.phoneNo}</li>
                            <li>{spotBid.from}</li>
                            <li>{spotBid.destination}</li>
                            <li>{spotBid.distance}</li>
                            <li>{spotBid.charge}</li>
                        </ul>)
                }
            </div>

            <div className='product-list'>
                <h3>SpotBid Details  (Bid Completed)</h3>
                <ul>
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Email I'd</li>
                    <li>Phone No</li>
                    <li>From</li>
                    <li>Destination</li>
                    <li>Distance</li>
                    <li>Bid Amount(INR)</li>
                </ul>
                {expireSpotBidData &&
                    expireSpotBidData.map((spotBid, index) =>
                        <ul key={spotBid._id}>
                            <li>{index + 1}</li>
                            <li>{spotBid.name}</li>
                            <li>{spotBid.email}</li>
                            <li>{spotBid.phoneNo}</li>
                            <li>{spotBid.from}</li>
                            <li>{spotBid.destination}</li>
                            <li>{spotBid.distance}</li>
                            <li>{spotBid.charge}</li>
                        </ul>)
                }
            </div>


        </>
    )
}

export default SpotBidDetails