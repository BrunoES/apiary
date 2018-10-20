import React from 'react'

export default props => {
    
    return (
        <div>
            <div>
                <input id='initial_date' className='form-control'
                    onChange={props.handleChangeInitialDate}
                    value={props.initial_date}></input>
                <input id='final_date' className='form-control'
                    onChange={props.handleChangeFinalDate}
                    value={props.final_date}></input>
            </div>
            <div>
                <button className={'btn btn-info'} 
                    onClick={props.handleSearch}>
                    <i className={'fa fa-search'}></i>
                </button>
                <button className={'btn btn-default'} 
                    onClick={props.handleClear}>
                    <i className={'fa fa-close'}></i>
                </button>
            </div>
        </div>
    )
}