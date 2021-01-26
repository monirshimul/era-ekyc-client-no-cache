import React from 'react';

const Pagination = ({ increment, decrement, page, total_pages, onInputChange, handleGo, text_input, goButton }) => {


    let allowPrevious = true;
    let allowNext = false;
    if (page > 1) {
        allowPrevious = false;
    }

    if (page >= total_pages) {
        allowNext = true;
    }


    const nextButtonStyle = {
        backgroundColor: "#938d8d", /* Green */
        border: "none",
        color: "white",
        padding: "12px 28px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "12px",

    };
    const previousButtonStyle = {
        backgroundColor: "#938d8d", /* Red */
        border: "none",
        color: "white",
        padding: "12px 28px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "12px",

    };


    return (
        <div className="container">
            <div className=" row justify-content-md-center" style={{ margin: '16px', padding: "10px" }}>
                <nav>
                    <ul className='pagination '>
                        <li className='page-item' >
                            <button style={nextButtonStyle} type="button" className=" btn btn-xs page-link" onClick={() => decrement()} disabled={allowPrevious} href='!#' >
                                Prev
                        </button>
                        </li>&nbsp;&nbsp;
                        <li>
                            <div className="form-group d-flex justify-content-around">

                                <input className="form-control text-center shadow-none" placeholder="Page No." value={text_input} style={{ width: "100px", borderRadius: "0px" }} id="disabledInput" type="text" autoComplete="off" onChange={onInputChange} />
                                <input type="button" value="Go" style={{ backgroundColor: '#56c9ef', color: "#ffffff" }} onClick={handleGo} disabled={!goButton} />

                            </div>
                            <p className="text-center"><strong>{page + "/" + total_pages}</strong></p>
                        </li>&nbsp;&nbsp;
                        <li className='page-item' >
                            <button style={previousButtonStyle} type="button" className=" btn btn-xs page-link" onClick={() => increment()} disabled={allowNext} href='!#' >
                                Next
                        </button>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default Pagination;