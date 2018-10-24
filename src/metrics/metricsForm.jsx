import React from 'react'

import Calendar from 'react-calendar';

export default props => {
    return (
        <div>
            <div>
                <div>
                    <Calendar
                        onChange={props.onChange}
                        value={new Date()}
                    />
                </div>
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
    );
};