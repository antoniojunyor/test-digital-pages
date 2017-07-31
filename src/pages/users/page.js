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
    console.log("brandId", brandId)

    const userArray = [];
    const userArraySort = [];

    const shareUser = [];
    const commentUser = [];
    const favoriteUser = [];
    const arrayTotal = [];
    let totalIteratorSort = [];

    this.props.iterator.map((shot, i) => {

      if(!userArray.includes(shot.user)){

          if(brandId != ""){
            var obj = {
              "user": shot.user, 
              "totalIterator": this.props.iterator
              .filter(x =>  x.brand == brandId)
              .reduce(function(n, val) {
                  return n + (val.user === shot.user);
            }, 0)}
          }else{
            var obj = {
              "user": shot.user, 
              "totalIterator": this.props.iterator
              .reduce(function(n, val) {
                  return n + (val.user === shot.user);
              }, 0)}
          }
          arrayTotal.push(obj);

        userArray.push(shot.user);
      }
    });




    totalIteratorSort = arrayTotal.sort(function(obj1, obj2) {
        return obj2.totalIterator - obj1.totalIterator;
    });




    if(brandId != ""){
      totalIteratorSort.map((totalIteratorSort, i) => {
        this.props.iterator.map((shot, j) => {
          if(totalIteratorSort.user === shot.user && !userArraySort.includes(shot.user)){
            userArraySort.push(shot.user);
            shareUser.push((
              this.props.iterator
              .filter(x => x.type == "SHARE")
              .filter(y=> y.brand == brandId)
              .filter(x => x.user == shot.user))
              .length
            );
            commentUser.push((
              this.props.iterator
              .filter(x => x.type == "COMMENT")
              .filter(y=> y.brand == brandId)
              .filter(x => x.user == shot.user))
              .length
            );
            favoriteUser.push((
              this.props.iterator
              .filter(x => x.type == "FAVORITE")
              .filter(y=> y.brand == brandId)
              .filter(x => x.user == shot.user))
              .length
            );
          }
        });
      });
    }else{
      totalIteratorSort.map((totalIteratorSort, i) => {
        this.props.iterator.map((shot, j) => {
          if(totalIteratorSort.user === shot.user && !userArraySort.includes(shot.user)){
            userArraySort.push(shot.user);
            shareUser.push((
              this.props.iterator
              .filter(x => x.type == "SHARE")
              .filter(x => x.user == shot.user))
              .length
            );
            commentUser.push((
              this.props.iterator
              .filter(x => x.type == "COMMENT")
              .filter(x => x.user == shot.user))
              .length
            );
            favoriteUser.push((
              this.props.iterator
              .filter(x => x.type == "FAVORITE")
              .filter(x => x.user == shot.user))
              .length
            );
          }
        });
      });
    }

    console.log("array de usuários", userArray )
    
    console.log("userArraySort", userArraySort)
    console.log("totalIteratorSort", totalIteratorSort)
    console.log("shareUser", shareUser )
    console.log("commentUser", commentUser )
    console.log("favoriteUser", favoriteUser )


    Highcharts.chart('chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: userArraySort
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
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

