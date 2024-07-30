import React from 'react'
import { Table, Tag } from 'antd';
import { Category, ChartComponent, SplineSeries, DataLabel, Inject, Legend, SeriesCollectionDirective, SeriesDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, PieSeries, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { dateFormat1 } from '../../Functions/Conversion';

// pie-chart configuration for colors
export let pointRender = (args) => {
    let selectedTheme = window.location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme === 'fluent' || selectedTheme === 'bootstrap5') {
        args.fill = seriesColor[args.point.index % 10];
    }
    if (selectedTheme.indexOf('dark') > -1) {
        if (selectedTheme.indexOf('material') > -1) {
            args.border.color = '#303030';
        }
        else if (selectedTheme.indexOf('bootstrap5') > -1) {
            args.border.color = '#212529';
        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';
        }
        else if (selectedTheme.indexOf('fabric') > -1) {
            args.border.color = '#201f1f';
        }
        else if (selectedTheme.indexOf('fluent') > -1) {
            args.border.color = '#252423';
        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';
        }
        else if (selectedTheme.indexOf('tailwind') > -1) {
            args.border.color = '#1F2937';
        }
        else {
            args.border.color = '#222222';
        }
    }
    else if (selectedTheme.indexOf('highcontrast') > -1) {
        args.border.color = '#000000';
    }
    else {
        args.border.color = '#FFFFFF';
    }
};

let seriesColor = ['#FFE066', "#FAB666", "#F68F6A", "#F3646A", "#CC555A", "#9C4649"];


export const Charts = (props) => {
    const tempProjects = props.projects;
    const modifiedStartDate = dateFormat1(tempProjects.startDate);
    const modifiedEndDate = dateFormat1(tempProjects.endDate);
    const Projects = tempProjects.map((tempProject) => {
        return ({
            ...tempProject, 
            startDate: modifiedStartDate,
            dueDate: modifiedEndDate
        });
    });


    const stateColors = {
        completed: 'green',
        active: 'limegreen',
        due: 'blue',
        hold: 'yellow',
        inactive: 'orange',
        dismissed: 'red',
        complete_after_due : 'purple'
    };

    // column definitions for the data grid

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: 'Project Description',
            dataIndex: 'projectDescription',
            key: 'projectDescription',
        },
        {
            title: 'Department Name',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Project State',
            dataIndex: 'projectState',
            key: 'projectState',
            render : (projectState) => (
                <Tag color={stateColors[projectState]} key={projectState}>
                    {projectState.toUpperCase()}
                </Tag>
            
            )
        },

    ];

    // configuration for the spline chart

    const countNoOfProjects = (month) => {
        let noOfProjects = 0;
        Projects?.map((project) => {
            const date = new Date(project.startDate);
            const projectMonth = date.getUTCMonth() + 1;
            if (projectMonth === month) {
                noOfProjects += 1;
            }
        })
        return noOfProjects;
    };

    const data1 = [
        { month: 'Jan', noOfProjects: countNoOfProjects(1) }, { month: 'Feb', noOfProjects: countNoOfProjects(2) },
        { month: 'Mar', noOfProjects: countNoOfProjects(3) }, { month: 'Apr', noOfProjects: countNoOfProjects(4) },
        { month: 'May', noOfProjects: countNoOfProjects(5) }, { month: 'Jun', noOfProjects: countNoOfProjects(6) },
        { month: 'Jul', noOfProjects: countNoOfProjects(7) }, { month: 'Aug', noOfProjects: countNoOfProjects(8) },
        { month: 'Sep', noOfProjects: countNoOfProjects(9) }, { month: 'Oct', noOfProjects: countNoOfProjects(10) },
        { month: 'Nov', noOfProjects: countNoOfProjects(11) }, { month: 'Dec', noOfProjects: countNoOfProjects(12) }
    ];

    const tooltip = { enable: true, shared: false };
    const primaryyAxis = { title: 'No. of Projects', labelFormat: '{value}', interval: 1, minimum: 0 };
    const primaryxAxis = { title: 'Time (Months)', valueType: 'Category' };
    const legendSettings = { visible: true };
    const marker = { dataLabel: { visible: true } };


    // configuration for the pie chart

    const countNoOfProjectStates = (state) => {
        let noOfProjectStates = 0;
        Projects?.map((project) => {
            const projectState = project.projectState;;
            if (projectState === state) {
                noOfProjectStates += 1;
            }
        })
        return noOfProjectStates;
    };

    let data2 = [
        { x: 'Active', y: countNoOfProjectStates('active'), text: `Active: ${countNoOfProjectStates('active')}` },
        { x: 'Completed', y: countNoOfProjectStates('completed'), text: `Completed: ${countNoOfProjectStates('completed')}` },
        { x: 'Due', y: countNoOfProjectStates('due'), text: `Due: ${countNoOfProjectStates('due')}` },
        { x: 'Hold', y: countNoOfProjectStates('hold'), text: `Hold: ${countNoOfProjectStates('hold')}` },
        { x: 'Dismissed', y: countNoOfProjectStates('dismissed'), text: `Dismissed: ${countNoOfProjectStates('dismissed')}`},
        { x: 'Inactive', y: countNoOfProjectStates('inactive'), text: `Inactive: ${countNoOfProjectStates('inactive')}`},
        { x: 'Completed_after_Due', y: countNoOfProjectStates('complete_after_due'), text: `Completed after Due: ${countNoOfProjectStates('complete_after_due')}`},
    ];

    const onChartLoad = (args) => {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    const load = (args) => {
        let selectedTheme = window.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/light/i, "Light").replace(/contrast/i, 'Contrast');
    };


  return (
    <div>
        <Table dataSource={Projects} columns={columns} />

        <ChartComponent id="charts" primaryXAxis={primaryxAxis} legendSettings={legendSettings} primaryYAxis={primaryyAxis} tooltip={tooltip}>
            <Inject services={[SplineSeries, DataLabel, Tooltip, Legend, Category]}/>
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={data1} xName='month' yName='noOfProjects' type='Spline' width={2} marker={marker}/>
            </SeriesCollectionDirective>
         </ChartComponent>

         <AccumulationChartComponent id="pie-chart" centerLabel={{ text: 'Project<br>States<br>Statistics', textStyle: { fontWeight: '600', size: Browser.isDevice ? '7px' : '15px' } }} enableSmartLabels={true} load={load.bind(this)} loaded={onChartLoad.bind(this)} pointRender={pointRender} enableBorderOnMouseMove={false} legendSettings={{ visible: false }}>
            <Inject services={[PieSeries, AccumulationDataLabel]}/>
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data2} xName='x' yName='y' innerRadius='65%' border={{ width: 1 }} startAngle={Browser.isDevice ? 30 : 62} dataLabel={{ visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }} radius={Browser.isDevice ? '40%' : '70%'}/>
            </AccumulationSeriesCollectionDirective>
         </AccumulationChartComponent>
    </div>
  );
}
