import React from 'react'

import Calendar from 'react-calendar';

export default props => {
    return (
        <div>
            <div>
                <div>
                    <select style={{ fontSize: 18 }} onChange={props.onChangeColmeia}>
                        <option value='0'>Todas as Colmeias</option>
                        <option value='1'>Colmeia 1</option>
                        <option value='2'>Colmeia 2</option>
                    </select>
                    <Calendar
                        onChange={props.onChangeData}
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