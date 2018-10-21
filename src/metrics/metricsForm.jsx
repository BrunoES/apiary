import React, { Component } from 'react'

import Calendar from 'react-calendar';

export default class metricsForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            showCalendar: false
        }
        this.showCalendar = this.showCalendar.bind(this);
    }

    onChange(date){
        this.setState({ date });
    }

    showCalendar(){
        this.setState({ ...this.state, showCalendar: !this.state.showCalendar });
    }

    render() {
        return (
            <div>
                <div>
                    <div className='row'>
                        <div className='col-xs-10'>
                            <input id='initial_date' className='form-control'
                                onChange={this.props.handleChangeInitialDate}
                                value={this.props.initial_date}></input>
                        </div>
                        <div className='col-xs-2'>
                            <button className={'btn btn-info'} 
                                onClick={this.showCalendar}>
                                <i className={'fa fa-calendar'}></i>
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-10'>
                            <input id='final_date' className='form-control'
                                onChange={this.props.handleChangeFinalDate}
                                value={this.props.final_date}></input>
                        </div>
                        <div className='col-xs-2'>
                            <button className={'btn btn-info'} 
                                onClick={this.showCalendar}>
                                <i className={'fa fa-calendar'}></i>
                            </button>
                        </div>
                    </div>
                    <div style={{visibility: (this.state.showCalendar ? 'visible' : 'hidden')}}>
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                    </div>
                </div>
                <div>
                    <button className={'btn btn-info'} 
                        onClick={this.props.handleSearch}>
                        <i className={'fa fa-search'}>Pesquisar</i>
                    </button>
                    <button className={'btn btn-default'} 
                        onClick={this.props.handleClear}>
                        <i className={'fa fa-close'}>Limpar</i>
                    </button>
                </div>
            </div>
        );
    }
}