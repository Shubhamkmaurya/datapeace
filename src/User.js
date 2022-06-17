import React,{useState, useEffect} from "react"
import './App.css';
import Pagination from './pagination';
import {Link} from 'react-router-dom';


const Users= (props) =>{
    const[data1, setData1] = useState(props.data);
    const[inputValue, setInputValue] = useState("");
    const[showPerPage, setShowPerPage] = useState(10);
    const[pagination, setPagination] = useState({
      start:0,
      end:showPerPage
    });

    useEffect(()=>{
      fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((result)=>{
      result.json().then((resp)=>{
        setData1(resp);
      });
    });
  },[])

    const onPaginationChange = (start, end) => {
      setData1(props.data);
      setPagination({start:start, end:end})
    };


    const handleSearch = () =>{
      let arr = [];
      arr = props.data.filter((ar)=>{
        return (ar.first_name).toLowerCase() === inputValue.toLowerCase() || (ar.last_name).toLowerCase() === inputValue.toLowerCase();
      })
      console.log(arr);
      setData1(arr);
    }

    const handleSort = (type, sortBy) =>{
      let arr = data1.slice(pagination.start, pagination.end) 
        if(type ==="assending"){
          arr = arr.sort((a, b) => {
            let fa = "";
            let fb = "";
            if(sortBy === "age"){
              fa = parseInt(a[sortBy]);
              fb = parseInt(b[sortBy]);
            }else{
              fa = a[sortBy].toLowerCase();
              fb = b[sortBy].toLowerCase();
            }
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        }else {
          arr = arr.sort((a, b) => {
            let fa = "";
            let fb = "";
                if(sortBy === "age"){
                  fa = parseInt(a[sortBy]);
                  fb = parseInt(b[sortBy]);
                }else{
                  fa = a[sortBy].toLowerCase();
                  fb = b[sortBy].toLowerCase();
                }
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        });
        }
      console.log(arr);
      
    
      console.log(arr);
      setData1(arr);
    }
    return (
      <>
    {
      data1 && (
        <div className="App">
        <div className='content'>
        <h1>Users</h1> 
        <div className="hndlinpt">
        <div>
        <input type='text' className='input' value={inputValue} 
          onChange = {(e)=>{setInputValue(e.target.value);
           console.log(inputValue)}} />
        </div>
          <div><button className="btn1" onClick={handleSearch}><img src='https://www.pngall.com/wp-content/uploads/8/Magnifying-Glass-Search-PNG-Free-Download.png'/></button></div>
        </div>
          
          <table className='table'>
            <tr className='heading'>
            <div>
              <td className="head">First Name 
                  <div>
                    <button className="fbtn" onClick={()=>handleSort("assending","first_name")}>&#9650;</button><br/>
                    <button className="fbtn" onClick={()=>handleSort("dessending","first_name")}>&#9660;</button>
                    </div>
              </td>
              </div>
              <td> Last Name
                  <div>
                    <button className="fbtn" onClick={()=>handleSort("assending","last_name")}>&#9650;</button><br/>
                    <button className="fbtn" onClick={()=>handleSort("dessending","last_name")}>&#9660;</button>
                  </div>
              </td>
              <td>Age
                  <div>
                    <button className="fbtn" onClick={()=>handleSort("assending","age")}>&#9650;</button><br/>
                    <button className="fbtn" onClick={()=>handleSort("dessending","age")}>&#9660;</button>
                  </div>
              </td>
              <td>Email
                  <div>
                    <button className="fbtn" onClick={()=>handleSort("assending","email")}>&#9650;</button><br/>
                    <button className="fbtn" onClick={()=>handleSort("dessending","email")}>&#9660;</button>
                  </div>
              </td>
              <td>Website
                  <div>
                    <button className="fbtn" onClick={()=>handleSort("assending","web")}>&#9650;</button><br/>
                    <button className="fbtn" onClick={()=>handleSort("dessending","web")}>&#9660;</button>
                  </div>
              </td>
            </tr>
            {props.data.length ?
              (data1.slice(pagination.start, pagination.end).map((item)=>(
              <tr className='userdata'>
              <Link to={`/User/${item.id}`}>{item.first_name}</Link>
                <td>{item.last_name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.web}</td>
              </tr>
              
            ))):""}
          </table>
          <Pagination 
          showPerPage={showPerPage} 
          onPaginationChange={onPaginationChange}
            total={props.data.length}
          />
        </div>
        </div>
      )
     }

     </>
    )
}

export default Users;