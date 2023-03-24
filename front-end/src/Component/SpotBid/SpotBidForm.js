import React, { useState } from 'react'
import { Button, Row, Col, Input, DatePicker, message } from 'antd';
import { api } from '../../Api';
import { useNavigate } from 'react-router-dom';

function SpotBidForm() {
    const navigate = useNavigate();
    const [usersName, setUsersName] = useState('');
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [from, setFrom] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState();
    const [charge, setCharge] = useState();

    const [pickupTime, setPickupTime] = useState(null);
    const [bidEndTime, setBidEndTime] = useState(null);


    const postData = async () => {

        if (!usersName || !email || !phoneNo || !from || !destination || !distance || !charge || !pickupTime || !bidEndTime) {
            return message.warning('All fields are compersary please fill')
          }


        let paylod = {
            name: usersName,
            email: email,
            phoneNo: phoneNo,
            from: from,
            destination: destination,
            distance: distance,
            charge: charge,
            pickupTime: pickupTime,
            bidEndTime: bidEndTime,
            bidStatus: true,

        };

        const usersdata = await api.post('/spot-bid-registation', paylod)

        if (usersdata.status === 200) {
            window.alert('Registation Sucessfull')
            navigate('/spot-bid-details')
        } else {
            window.alert('Invalid Registation')
            console.log('Invalid Registation')
        }
    }



    return (
        <>
            <Row span={24} type="flex" justify="center" align="middle" style={{ marginTop: '5%' }}>
                <Col span={8} >
                    <Row justify="center" align="middle" >
                        <h1>SPOT BID FORM</h1>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>
                        <Col span={24}>
                            <Input type='text' name='usersName' id='usersName' placeholder='Your Name'
                                value={usersName}
                                onChange={(e) => setUsersName(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='text' name='email' id='email' placeholder='Email Id'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='text' name='phoneNo' id='phoneNo' placeholder='Phone Number'
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={9} >
                            <Input type='From' name='From' id='From' placeholder='From'
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            ></Input>
                        </Col>
                        <Col span={2} style={{ margin: '0 5% 0 5%' }}>
                            To
                        </Col>
                        <Col span={9}>
                            <Input type='Destination' name='destination' id='destination' placeholder='Enter Destination'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='Number' name='distance' id='distance' placeholder='Total Distance'
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={24}>
                            <Input type='Number' name='charge' id='charge' placeholder='Total Amount in INR'
                                value={charge}
                                onChange={(e) => setCharge(e.target.value)}
                            ></Input>
                        </Col>
                    </Row>
                    <Row type="flex" style={{ marginTop: '5%' }}>

                        <Col span={12}>
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                                //   css={tw`w-full`}
                                time={pickupTime}
                                onChange={(value, dateString) => {
                                    setPickupTime(dateString);
                                }}
                            />

                        </Col>
                        <Col span={12}>
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                                //   css={tw`w-full`}
                                time={bidEndTime}
                                onChange={(value, dateString) => {
                                    setBidEndTime(dateString);
                                }}
                            />

                        </Col>
                    </Row>

                    <Row justify="center" align="middle" style={{ margin: '10%' }}>
                        <Col >
                            <Button
                                onClick={postData}
                            >SUBMIT</Button>
                        </Col>
                    </Row>

                </Col>

            </Row >
        </>
    )
}

export default SpotBidForm