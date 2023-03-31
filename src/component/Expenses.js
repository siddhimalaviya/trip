import moment from 'moment/moment';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Expenses = (props) => {
    const { id, member,setMember } = props;

    if (!id) {
        window.location.href = '/'; // redirects to the homepage
    }

    const [formValues, setFormValues] = useState({ id, membername: "", date: "", amount: "", description: "" });
    const [amt, setAmt] = useState({ totalAmt: 0, perPerson: 0 })
    const [allExp, setAllExp] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    // const date = new Date().toLocaleDateString()
    // const time = new Date().toLocaleTimeString()


    const handleChangec = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const updateData = (curItem, index) => {
        setIsEdit(true)
        setFormValues({ index, membername: curItem.membername, date: curItem.date, amount: curItem.amount, description: curItem.description })
    }

    const handleDeleteExp = (index) => {
        allExp.splice(index, 1);
        localStorage.setItem("tripExp", JSON.stringify(allExp));
        setAllExp(JSON.parse(localStorage.getItem("tripExp")))
    }

    const calcAmt = () => {
        let total = 0;
        allExp.map((bill) => {
            return total += Number(bill.amount)
        })
        let perPerson = total / member.length;
        setAmt({...amt, totalAmt: total, perPerson });
        //return total;
    }

    const paidAmt = () => {
        member.map(m => {
            let filteredExp = allExp.filter(e => e.membername === m.name);
            let total = 0;
            filteredExp.map(x => { return total += Number(x.amount) });
            m.paidAmt = total;
        });
        console.log(member);
        setMember(member)
    }

    const diffAmt = () => {
        member.map(m => {
            let total = 0;
          total = m.paidAmt - amt.perPerson;
          m.diffAmt= total;
        });
        console.log(member);
        setMember(member)
    }
    

    const submitData = (e) => {
        if (isEdit) {
            for (let index = 0; index < allExp.length; index++) {
                if (index === formValues.index) {
                    allExp[index].membername = formValues.membername;
                    allExp[index].date = formValues.date;
                    allExp[index].amount = formValues.amount;
                    allExp[index].description = formValues.description;
                }
                let exp = [...allExp]
                console.log(exp)
                setAllExp(exp)
               
                localStorage.setItem("tripExp", JSON.stringify(exp));
                setFormValues({ membername: "", date: "", amount: "", description: "" })
                setIsEdit(false)

            }


        } else {
            e.preventDefault();
    
            setIsEdit(false)
            let details = [...allExp, formValues]
            console.log(details);
            setAllExp(details)
                       
            //console.log(amt)
            localStorage.setItem("tripExp", JSON.stringify(details))
            setFormValues({ id, membername: "", date: "", amount: "", description: "" })

        }
    }


    const getData = () => {
        let lsDetails = JSON.parse(localStorage.getItem("tripExp"))
        if (lsDetails !== null) {
            setAllExp(lsDetails.filter(x => x.id === id))
        }
    }

    const getTripDetail = () => {
        getData();
    }

    useEffect(() => {
        getTripDetail();
        // eslint-disable-next-line
    }, [])

    useEffect(()=> {
        calcAmt();
        paidAmt();
        diffAmt();
        // eslint-disable-next-line
    }, [allExp])


    return (
        <>
            <div className="container mt-5">
                <h1 className='text-center'> Expenses </h1>
                <div className="row">
                    <div className="card mx-auto w-50 pt-4 px-4 mt-4 bg-secondary text-dark bg-opacity-25">
                        <div className=" my-1">
                            <div className="d-flex justify-content-between pb-2">
                            </div>

                            <label className="form-label"><b> Member Name : </b></label>
                            {/* <input className="form-control" type="text" name="membername" value={formValues.membername} onChange={e => handleChangec(index, e)} /><br /> */}

                            <select className="form-select" aria-label="Default select example" name="membername" value={formValues.membername} onChange={handleChangec}>
                                <option value='' disabled>Select Name</option>
                                {member.map((x) => {
                                    return <option value={x.name}>{x.name}</option>
                                })}
                            </select>

                            <label className="form-label"><b> Date & Time :  </b></label>
                            <input className="form-control" type="datetime-local" name="date" value={formValues.date} onChange={handleChangec} /><br />

                            <label className="form-label"><b> Amount : </b>  </label>
                            <input className="form-control" type="text" name="amount" value={formValues.amount} onChange={handleChangec} /><br />


                            <label className="form-label"><b> Description : </b></label>
                            <input className="form-control" type="text" name="description" value={formValues.description} onChange={handleChangec} /><br />

                        </div>

                        <div className='d-grid gap-2 col-6 mx-auto'>

                            <button type='button' className='btn btn-success my-3' onClick={submitData}>{isEdit ? 'Save changes' : 'Submit'}  </button>

                        </div>
                    </div>
                </div>
                <div>
                    <Link to="/" className='btn btn-danger'> Previous </Link>
                </div>
                <h1 className="text-center">
                    Expenses
                </h1>
                <table className="table table-hover border border-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">No.</th>
                            <th scope="col" className="text-center">Name</th>
                            <th scope="col" className="text-center">Date</th>
                            <th scope="col" className="text-center">Description</th>
                            <th scope="col" className="text-center">Amount</th>
                            <th scope="col" className="text-center">Edit</th>
                            <th scope="col" className="text-center">Delete</th>
                        </tr>
                    </thead>
                    {allExp.map((item, index) => {
                        return <>
                            <tbody key={index}>
                                <tr>
                                    <th className="text-center">{index + 1}.</th>
                                    <td className="text-left">{item.membername}</td>
                                    <td className="text-center">{moment(item.date).format(" MMMM Do YYYY, h:mm:ss a")}</td>
                                    <td className="text-center">{item.description}</td>
                                    <td className="text-center">{item.amount}</td>
                                    <td className="text-center"><i className="fa-solid fa-pen-to-square text-warning" onClick={() => updateData(item, index)}></i></td>
                                    <td className="text-center"><i className="fa-solid fa-trash text-danger" onClick={() => handleDeleteExp(index)}></i></td>
                                </tr>
                            </tbody>
                        </>
                    })}
                </table>

                <table className="table table-hover border border-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col" className="text-left">Name</th>
                            <th className="text-center">Paid Amount</th>
                            <th className="text-center">Per Head</th>
                            <th className="text-center">Difference Amount</th>
                        </tr>
                    </thead>

                    {member.map(item =>{
                     return   <tbody>
                            <tr >
                                <td className="text-left">
                                    {item.name}
                                </td>
                                <td className="text-center">
                                    {item.paidAmt}
                                </td>
                                <td className="text-center">
                                    {amt.perPerson}
                                </td>
                                <td className="text-center">
                                    {item.diffAmt}
                                </td>
                            </tr>
                        </tbody>
                     }) }
                </table>

                <h5 className='text-end'>Total Amount:{amt.totalAmt}</h5>
                <h5 className="text-end">Per Person : {amt.perPerson.toFixed(0)}</h5>
            </div>

        </>
    )
}

export default Expenses