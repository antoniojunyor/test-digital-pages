import React, { Component } from 'react';
import { Link } from 'react-router';
import grid from '../../style/grid.css';
import styles from './style.css';
import cx from 'classnames';

import { connect } from 'react-redux';
import InfluenceAction, { fetchUser, fetchBrand, fetchIterator } from '../../redux/influence/InfluenceServices';
import InfluenceSelectors from '../../redux/influence/InfluenceSelectors';


export class Users extends Component {
  constructor(props){
    super(props);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.changeChart = this.changeChart.bind(this);
  }

  changeChart(brandId = ""){
    const userArray = [];
    const userArraySort = [];
    const shareUser = [];
    const commentUser = [];
    const favoriteUser = [];
    const arrayTotal = [];
    const arrayUserCount = [];
    let totalIteratorSort = [];
  
    this.props.iterator.map((shot, i) => {

      let totalIterator = 
        brandId != "" ? 
          this.props.iterator.filter(x =>  brandId == x.brand)
        : 
          this.props.iterator;

      if(!userArray.includes(shot.user)){
          var obj = {
            "user": shot.user, 
            "totalIterator": totalIterator
              .reduce(function(n, val) {
                return n + (val.user === shot.user);
              }, 0)}

        arrayTotal.push(obj);
        userArray.push(shot.user);
      }
    });

    totalIteratorSort = arrayTotal.sort(function(obj1, obj2) {
        return obj2.totalIterator - obj1.totalIterator;
    });

    totalIteratorSort.map((totalIteratorSort, i) => {
      let totalIterator = 
      brandId != "" ? 
        this.props.iterator.filter(x =>  brandId == x.brand)
      : 
        this.props.iterator;

      this.props.iterator.map((shot, j) => {
        if(totalIteratorSort.user === shot.user && !arrayUserCount.includes(shot.user)){
          arrayUserCount.push(shot.user);
          
          let share = totalIterator
            .filter(x => x.type == "SHARE")
            .filter(x => x.user == shot.user)
            .length;

          let comment = totalIterator
            .filter(x => x.type == "COMMENT")
            .filter(x => x.user == shot.user)
            .length;

          let favorite =  totalIterator
            .filter(x => x.type == "FAVORITE")
            .filter(x => x.user == shot.user)
            .length;

          if(share != 0 || comment != 0 || favorite != 0){
            userArraySort.push(this.props.user.filter(x => x.id == shot.user)[0].name.first);
            shareUser.push(share);
            commentUser.push(comment);
            favoriteUser.push(favorite);
          }
          
        }
      });
    });

    Highcharts.chart('chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gráfico de Iterações de Usuários'
        },
        xAxis: {
            categories: userArraySort
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Iterações'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Comment',
            data: commentUser
        }, {
            name: 'Share',
            data: shareUser
        }, {
            name: 'Favorite',
            data: favoriteUser
        }]
    });
  }

  componentDidMount() {
    this.props.fetchUser(); 
    this.props.fetchBrand(); 
    this.props.fetchIterator(); 
  }

  componentDidUpdate(){
    this.changeChart();
  }

  handleChangeSelect(event) {
    const val = {value: event.target.value}
    this.changeChart(val.value);
  }
  
  render() {
    const allBrandTemplate = [];

    this.props.brand.map((brand, i) => {
      allBrandTemplate.push(        
        <option key={i} value={brand.id}>
          {brand.name}  
        </option>
      );
    });

    return (
      <div className={styles.app}>
         <section>
          {this.props.iterator == "" && 
            <img src="http://concrete-project.azurewebsites.net/assets/loader.gif" className={styles.loader} id="loader"/>
          }
           <div className={styles.wrap_select}>
             <select onChange={this.handleChangeSelect}>
               <option value="">Selecione uma marca</option>
               {allBrandTemplate}
             </select>
           </div>

           <div id="chart"></div>
         </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: InfluenceSelectors.user(state),
  brand: InfluenceSelectors.brand(state),
  iterator: InfluenceSelectors.iterator(state),
});

const mapDispatchToProps = (Dispatch) => ({
  fetchUser: () => Dispatch(InfluenceAction.fetchUser()),
  fetchBrand: () => Dispatch(InfluenceAction.fetchBrand()),
  fetchIterator: () => Dispatch(InfluenceAction.fetchIterator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

