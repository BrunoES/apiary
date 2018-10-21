import React, { Component } from 'react'
import axios from 'axios';

import MetricsList from './metricsList';
import MetricsForm from './metricsForm';
import { LineChartMetric } from './metricsCharts';

class Metrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
                initial_date: '15/10/2018',
                final_date: '15/10/2018',
                medicoesFetch: [],
                medicoesChart: [],
                mostrar_datas: ''
            };
        this.handleChangeInitialDate = this.handleChangeInitialDate.bind(this);
        this.handleChangeFinalDate = this.handleChangeFinalDate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentWillMount() {
        this.readMetrics(this.state.initial_date, this.state.final_date);
        this.setState({ ...this.state, medicoesChart: 
            this.reloadChartMetrics(this.state.medicoesFetch)
        });
    }

    readMetrics(initial_date, final_date) {
        let mostrar_datas = true;
        if(initial_date == final_date){
            mostrar_datas = false;
        }
        axios.get(`http://localhost:8080/medicoes?initial_date=${initial_date}&final_date=${final_date}`)
            .then(resp => this.setState({ ...this.state, mostrar_datas, medicoesFetch: resp.data }))
            .catch(error => console.log(error));
    }

    refresh(date = '') {
        const search = date ? `&date__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, date, list: resp.data}))
    }

    reloadChartMetrics(data) {
        const dataChart = data.map(dataObj => {
            return (
                {
                    idmedicao: dataObj.idmedicao,
                    hora: dataObj.datahora,
                    temperatura: dataObj.temp_int
                }
            );
        });
        return dataChart;
    }

    handleSearch() {
        this.readMetrics(this.state.initial_date, this.state.final_date);
    }

    handleChangeInitialDate(e) {
        this.setState({...this.state, initial_date: e.target.value })
    }

    handleChangeFinalDate(e) {
        this.setState({...this.state, final_date: e.target.value })
    }

    handleClear() {
        this.readMetrics(this.state.initial_date, this.state.final_date);
    }

    render() {
        return (
            <div>
                <h2>Medições de {this.state.initial_date} à {this.state.final_date}</h2>
                <MetricsForm
                    handleChangeInitialDate={this.handleChangeInitialDate}
                    handleChangeFinalDate={this.handleChangeFinalDate} 
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <MetricsList list={this.state.medicoesFetch} />
                <div className='row'>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Temperatura geral no período' showChart data={this.state.medicoesFetch} lineKey='temp_int' XKey='hora' />
                    </div>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Umidade geral no período' showChart data={this.state.medicoesFetch} lineKey='umid_int' XKey='hora' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Média de temperatura por hora' showChart data={this.state.medicoesFetch} lineKey='temp_int' XKey='hora' />
                    </div>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Média de umidade por hora' showChart data={this.state.medicoesFetch} lineKey='umid_int' XKey='hora' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Média de temperatura por data' showChart={this.state.mostrar_datas} data={this.state.medicoesFetch} lineKey='temp_int' XKey='data' />
                    </div>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Média de umidade por data' showChart={this.state.mostrar_datas} data={this.state.medicoesFetch} lineKey='umid_int' XKey='data' />
                    </div>
                </div>
            </div>
        );
    }
}

export default Metrics;