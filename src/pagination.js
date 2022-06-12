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
                <li><a class="page-link" href="#" onClick={()=> onButtonClick("prev")}>&lt;</a></li>
                {/* <li><a class="page-link" href="!#">1</a></li> */}
                {
                    pages.map((el, index) => (
                        <li><a class="page-link" href="!#" onClick={()=> setCount(el)}>{el}</a></li>
                    
                        
                    ))
                }
                <li class="page-item"><a class="page-link" href="#" onClick={()=> onButtonClick("next")}>&gt;</a></li>
            </ul>
</nav> 
</div>
    )
}

export default Pagination;