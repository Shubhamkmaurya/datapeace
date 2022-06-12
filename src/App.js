import React,{useState, useEffect} from 'react';
import './App.css';
import Pagination from './pagination';
import Userdata from './Userdata';
//import Userdata from './Userdata';
import {Link } from 'react-router-dom';

const App = () => {

    const[data, setData] = useState([]);
    const[data1, setData1] = useState([]);


    const[inputValue, setInputValue] = useState("");
    const[showPerPage, setShowPerPage] = useState(10);
    const[pagination, setPagination] = useState({
      start:0,
      end:showPerPage
    });

    const onPaginationChange = (start, end) => {
      setData1(data);
      setPagination({start:start, end:end})
    };

    useEffect(()=>{
      fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((result)=>{
        result.json().then((resp)=>{
          setData(resp);
          setData1(resp);
        });
      });
    },[]);
    console.log(data);

    const handleSearch = () =>{
      let arr = [];
      arr = data.filter((ar)=>{
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
    <div className="App">
    <div className='content'>
    <h1>Users</h1> 
    <div>
    <input type='text' className='input' value={inputValue} 
      onChange = {(e)=>{setInputValue(e.target.value);
       console.log(inputValue)}} />

      <button className='btn1' onClick={handleSearch}><img src='https://www.pngall.com/wp-content/uploads/8/Magnifying-Glass-Search-PNG-Free-Download.png'/></button>
    </div>
      
      <table className='table'>
        <tr className='heading'>
          <td>First Name 
          <button onClick={()=>handleSort("assending","first_name")}>&and;</button>
          <button onClick={()=>handleSort("dessending","first_name")}>&or;</button></td>

          <td> Last Name
          <button onClick={()=>handleSort("assending","last_name")}>&and;</button>
          <button onClick={()=>handleSort("dessending","last_name")}>&or;</button>
          </td>
          <td>Age
          <button onClick={()=>handleSort("assending","age")}>&and;</button>
          <button onClick={()=>handleSort("dessending","age")}>&or;</button>
          </td>
          <td>Email
          <button onClick={()=>handleSort("assending","email")}>&and;</button>
          <button onClick={()=>handleSort("dessending","email")}>&or;</button>
          </td>
          <td>Website
          <button onClick={()=>handleSort("assending","web")}>&and;</button>
          <button onClick={()=>handleSort("dessending","web")}>&or;</button>
          </td>
        </tr>
        {data1.length &&
          data1.slice(pagination.start, pagination.end).map((item)=>(
          <tr className='userdata'>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
            <td>{item.web}</td>
          </tr>
        ))}
      </table>
      <Pagination 
      showPerPage={showPerPage} 
      onPaginationChange={onPaginationChange}
        total={data.length}
      />
    </div>
    </div>
  );
}

export default App;
