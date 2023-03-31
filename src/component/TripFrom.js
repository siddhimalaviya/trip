import React, { useState, useEffect } from 'react'

const TripFrom = (props) => {
    const [member, setMember] = useState([{ name: "",paidAmt:0,diffAmt:0 }]);
    const [tripDetail, setTripDetail] = useState({ tripname: "", totalamt: 0, perPerson: 0 });
    const [allDetails, setAllDetails] = useState([])

    let addMember = () => {
        setMember([...member, { name: "",paidAmt:0,diffAmt:0  }])
    }
    let removeMember = (i) => {
        let newMember = [...member];
        newMember.splice(i, 1);
        setMember(newMember)
    }
    const handleChangeMember = (i, e) => {
        let newMem = [...member];
        newMem[i][e.target.name] = e.target.value;
        // setDetail();
        setMember(newMem)
    }

    const handleChange = (e) => {
        setTripDetail({ ...tripDetail, [e.target.name]: e.target.value })
    }

    const submitData = (e) => {
        e.preventDefault();
        let details = [...allDetails, { id: props.generateId(), tripname: tripDetail.tripname, members: [...member] }]
        localStorage.setItem("trip", JSON.stringify(details))
        setAllDetails(details);
        console.log(details);
        setTripDetail({ tripname: "" })
        setMember([{ name: "",paidAmt:0,diffAmt:0 }])

    }



    const handleDelete = (index) => {
        allDetails.splice(index, 1);
        localStorage.setItem("trip", JSON.stringify(allDetails));
        setAllDetails(JSON.parse(localStorage.getItem("trip")))
    }

    const getTripDetail = () => {
        let lsDetails = JSON.parse(localStorage.getItem("trip"))
        if (lsDetails !== null) {
            setAllDetails(lsDetails)
            console.log(lsDetails);
        }
    }

    useEffect(() => {
        getTripDetail()
    }, [])


    return (
        <div className='container mt-5'>
            <h1 className="text-center">Trip Expenses</h1>
            <form>
                <div className="row">
                    <div className="card p-5 mx-auto w-50">
                        <div className="mb-3">
                            <label htmlFor="tripname" className="form-label"><b> Trip Name: </b></label>
                            <input type="text" className="form-control" name='tripname' value={tripDetail.tripname} id="tripname" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="member" className="form-label"><b> Member : </b></label>
                                <button className="btn btn-outline-success ms-5" type='button' onClick={() => addMember()}> Add Member <i className="fa-solid fa-plus"></i></button>
                            </div>
                            {member.map((element, index) => (
                                <div className="" key={index}>
                                    <div className="d-flex justify-content-between mt-2">
                                        <b> {index}.  </b>
                                        <button type="button" className="btn btn-danger btn-sm " onClick={() => removeMember(index)} style={{ borderRadius: "50%" }}><i className="fa-sharp fa-solid fa-minus" ></i></button>
                                    </div>
                                    <input className='mt-3 form-control' type="text" name="name" value={element.name} onChange={e => handleChangeMember(index, e)} /> &nbsp;
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={submitData}>Submit</button>
                    </div>
                </div>
            </form>
            <div className="row mt-4">
                <h1 className="text-center">Trip Details</h1>
                {allDetails.map((i, index) => {
                    return <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="card pt-4 px-4 my-2">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title">Trip Name : {i.tripname}</h5>
                                <i className="fa-solid fa-trash text-danger" onClick={() => handleDelete(index)}></i>
                            </div>
                            <div className="card-body p-0">
                                {/* <p className="card-text">Member : {i.siddhi.map(x => x.name).join(", ")}</p> */}
                                <b> Member : </b>
                                {i.members.map((n,index) => {
                                    return <ul className='mb-0' key={index}>
                                        <li className="card-text">{n.name}</li>
                                    </ul>
                                })}
                            </div>
                            <button className='btn btn-sm btn-outline-info float-end my-4' onClick={() => { props.getId(i.id, i.members) }}> View Details</button>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default TripFrom