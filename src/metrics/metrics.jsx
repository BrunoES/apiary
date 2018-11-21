import React, { Component } from 'react'
import axios from 'axios';

import MetricsList from './metricsList';
import MetricsForm from './metricsForm';
import { LineChartMetric } from './metricsCharts';

class Metrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
                initial_date: this.getDateFromJSON(new Date()),
                final_date: this.getDateFromJSON(new Date()),
                medicoesFetch: [],
                medicoesChart: [],
                mostrar_datas: '',
                idColmeia: 0
            };
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeColmeia = this.onChangeColmeia.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentWillMount() {
        this.readMetrics(this.state.initial_date, this.state.final_date, this.state.idColmeia);
        this.setState({ ...this.state, medicoesChart: 
            this.reloadChartMetrics(this.state.medicoesFetch)
        });
    }

    readMetrics(initial_date, final_date, idColmeia) {
        let mostrar_datas = true;
        if(initial_date == final_date){
            mostrar_datas = false;
        }
        axios.get(`http://localhost:8080/medicoes?initial_date=${initial_date}&final_date=${initial_date}&idColmeia=${idColmeia}`)
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


    getDateFromJSON(dateValue) {
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        day = (day>9 ? '' : '0') + day;
        month = (month>9 ? '' : '0') + month;
        return `${day}/${month}/${year}`;
    }

    handleSearch() {
        this.readMetrics(this.state.initial_date, this.state.final_date, this.state.idColmeia);
    }

    onChangeData(date) {
        this.setState({...this.state, initial_date: this.getDateFromJSON(date) });
    }

    onChangeColmeia(event) {
        this.setState({...this.state, idColmeia: event.target.value });
    }

    handleClear() {
        this.setState({
            initial_date: '15/10/2018',
            final_date: '15/10/2018',
            medicoesFetch: [],
            medicoesChart: [],
            mostrar_datas: '',
            idColmeia: 0
        });
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <h2>Medições de {this.state.initial_date}</h2>
                        <MetricsForm
                            onChangeData={this.onChangeData}
                            onChangeColmeia={this.onChangeColmeia}
                            handleSearch={this.handleSearch}
                            handleClear={this.handleClear}
                        />
                    </div>
                    <div className='col-xs-6'>
                        <MetricsList list={this.state.medicoesFetch} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Temperatura interna' showChart data={this.state.medicoesFetch} lineKey='temp_int' XKey='hora' />
                    </div>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Umidade interna' showChart data={this.state.medicoesFetch} lineKey='umid_int' XKey='hora' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Temperatura externa' showChart data={this.state.medicoesFetch} lineKey='temp_ext' XKey='hora' />
                    </div>
                    <div className='col-xs-6'>
                        <LineChartMetric title='Umidade externa' showChart data={this.state.medicoesFetch} lineKey='umid_ext' XKey='hora' />
                    </div>
                </div>
            </div>
        );
    }
}

export default Metrics;