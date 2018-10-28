import React from 'react';

export default props => {

    const formatTemp = temp => {
        return `${temp}º C`
    }

    const formatUmid = umid => {
        return `${umid}%`
    }

    const renderRows = () => {
        const list = props.list || [];
        return list.map(metric => (
            <tr key={metric.idmedicao}>
                <td>{metric.data}</td>
                <td>{metric.hora}</td>
                <td>{formatTemp(metric.temp_int)}</td>
                <td>{formatUmid(metric.umid_int)}</td>
                <td>{formatTemp(metric.temp_ext)}</td>
                <td>{formatUmid(metric.umid_ext)}</td>
                <td>{metric.idcolmeia}</td>
            </tr>
        ));
    }

    return (
        <div className="pre-scrollable">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Temp.Int</th>
                        <th>Umid.Int</th>
                        <th>Temp.Ext</th>
                        <th>Umid.Ext</th>
                        <th>Colmeia</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    );
};