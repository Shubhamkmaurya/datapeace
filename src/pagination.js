import React,{useState, useEffect} from "react";
import './pagination.css';

const Pagination = ({showPerPage, onPaginationChange, total}) => {
    
    const[count, setCount] = useState(1);
    const[numberOfButtons, setNumberOfButtons] = useState(Math.ceil(total/showPerPage));
    const[pages, setPages] = useState([1,2,3,4,5]);

    useEffect(()=>{
        const value = showPerPage * count;    
        onPaginationChange(value - showPerPage, value);
    },[count])

    const onButtonClick = (type) =>{
          if(type === "prev"){
            if(count === 1){
                setCount(1)
            }else {
                setCount(count-1);
            }

            
          }else if(type === "next") {
            if(numberOfButtons === count) {
                setCount(count);
            } else{
                setCount(count+1);
                
            }
          }
          let arr = [];
                for(let i=count; i<count+5; i++){
                    arr.push(i);
                }
                setPages(arr);
    };

    return(
        <div className="btnp">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li><button class="page-link" onClick={()=> onButtonClick("prev")}>&lt;</button></li>
                {
                    pages.map((el, index) => (
                        <li><button class="page-link" onClick={()=> setCount(el)}>{el}</button></li>    
                    ))
                }
                <li class="page-item"><button class="page-link" onClick={()=> onButtonClick("next")}>&gt;</button></li>
            </ul>
</nav> 
</div>
    )
}

export default Pagination;