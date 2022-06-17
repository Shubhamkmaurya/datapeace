import React, { useEffect, useState } from "react";
import './Userdata.css';
import { useParams } from 'react-router-dom';

const Userdata = (props) => {

  const [useDetail, setUserDetail] = useState([]);
  const params = useParams()

  useEffect(() => {
    let arr = [];

    arr = props.data.filter((a) => {
      return a.id == params.id
    })

    setUserDetail(arr);

  }, [])


  return (
    <div className="main">


      <div className=" content">
        <button className="backbtn" onClick={() => {
          window.location.href = "/";
        }}>&larr;</button>
        <h1 className="head">Detail: {(useDetail.length ? useDetail[0].first_name : "") + " " + (useDetail.length ? useDetail[0].last_name : "")} </h1>
        <div className="userdetail">First Name: <b> {useDetail.length ? useDetail[0].first_name : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail"> Last Name: <b>{useDetail.length ? useDetail[0].last_name : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">Age: <b>{useDetail.length ? useDetail[0].age : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">Email: <b>{useDetail.length ? useDetail[0].email : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">Web: <b>{useDetail.length ? useDetail[0].web : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">Company Name: <b>{useDetail.length ? useDetail[0].company_name : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">City: <b>{useDetail.length ? useDetail[0].city : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">State: <b>{useDetail.length ? useDetail[0].state : ""}</b></div>
        <hr className="hline" />
        <div className="userdetail">Zip: <b>{useDetail.length ? useDetail[0].zip : ""}</b></div>

      </div>
    </div>
  )
}

export default Userdata;