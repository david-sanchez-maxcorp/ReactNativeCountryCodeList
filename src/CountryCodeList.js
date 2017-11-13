import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import PropTypes from 'prop-types'
import {getAlphabet} from './data'
import AlphabetListView from 'react-native-alphabetlistview'
import Search from 'react-native-search-box';

class CountryCodeList extends Component {
  constructor(props){
    super(props)
    this.renderCell = this.renderCell.bind(this)
    this.renderSectionItem = this.renderSectionItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.clearQuery = this.clearQuery.bind(this)

    this.state = {
      data: this.props.data ? this.props.data : getAlphabet(),
      query: ''
    }
  }

  render(){
    let data = this.filterData()
    return (
      <View style={styles.container}>
        <Search
          afterCancel={this.clearQuery}
          afterDelete={this.clearQuery}
          onChangeText={this.props.onSearch ? this.props.onSearch : this.onSearch}
          backgroundColor={this.props.headerBackground}
          titleCancelColor={'rgb(0, 0, 0)'}
          tintColorSearch={'rgb(0, 0, 0)'}
          inputStyle={styles.searchInput}
          {...this.props.searchProps}
        />
        <AlphabetListView
          enableEmptySections={true}
          data={data}
          cell={this.renderCell}
          sectionListItem={this.renderSectionItem}
          sectionHeader={this.renderSectionHeader}
          cellHeight={this.props.cellHeight}
          sectionHeaderHeight={this.props.sectionHeaderHeight}
          {...this.props.alphabetListProps}
        />
      </View>
    )
  }

  filterData(){
    try {
      let data = JSON.parse(JSON.stringify(this.state.data))
      Object.keys(data).map((key)=>{
        data[key] = data[key].filter((el) => {
          return el.name.toLowerCase().includes(this.state.query.toLowerCase()) || el.code.includes(this.state.query)
        })
        if (data[key].length === 0) {
          delete(data[key])
        }
      })
      return data
    } catch (e) {
      return this.state.data
    }
  }

  clearQuery(){
    this.setState({query: ''})
  }

  onSearch(query){
    this.setState({query})
  }

  renderSectionHeader(rowData){
    if (this.props.renderSectionHeader) {
      return this.props.renderSectionHeader(rowData)
    }
    return (
      <View style={[
        styles.sectionHeader,
        this.props.sectionHeaderStyle,
        {backgroundColor: this.props.headerBackground,height: this.props.sectionHeaderHeight - 1}
      ]}>
        <Text style={[styles.sectionHeaderText, this.props.sectionHeaderTextStyle]}>{rowData.title}</Text>
      </View>
    )
  }

  renderSectionItem(rowData){
    if (this.props.renderSectionItem) {
      return this.props.renderSectionItem(rowData)
    }
    return (
      <Text style={[styles.sectionItemText, this.props.sectionItemTextStyle]}>{rowData.title}</Text>
    )
  }

  renderCell(rowData){
    if (this.props.renderCell) {
      return this.props.renderCell(rowData)
    }
    return (
      <View>
        <TouchableOpacity
          onPress={()=>{this.props.onClickCell(rowData.item)}}
          style={[styles.cell, this.props.cellStyle, {height: this.props.cellHeight - 0.5}]}>
          <Text numberOfLines={1} style={[styles.cellTitle, this.props.cellTitleStyle]}>{rowData.item.name}</Text>
          <Text style={[styles.cellLabel, this.props.cellLabelStyle]}>{rowData.item.code}</Text>
        </TouchableOpacity>
        <View style={styles.separator}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1
  },
  sectionHeader: {
    justifyContent: 'center',
    top: -1,
    paddingLeft: 20,
  },
  sectionHeaderText: {
    justifyContent: 'center',
    fontSize: 16,
    color: 'rgb(0,0,0)'
  },
  sectionItemText: {
    color: 'rgb(153, 205, 55)',
    fontSize: 12,
  },
  cell: {
    paddingLeft: 20,
    paddingRight: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: 'rgb(0, 0, 0)',
    height: 0.5,
    opacity: 0.05,
    marginLeft: 20,
    marginRight: 25,
  },
  cellTitle: {
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
    color: 'rgb(0, 0, 0)',
  },
  cellLabel: {
    fontSize: 16,
    color: 'rgb(0, 0, 0)',
  },
  searchInput: {
    backgroundColor: 'white'
  }
});

CountryCodeList.propTypes = {
  data: PropTypes.object,
  // alphabetListProps it is prop react-native-alphabetlistview
  alphabetListProps: PropTypes.object,
  // searchProps it is prop react-native-search-box
  searchProps: PropTypes.object,
  onSearch: PropTypes.func,
  onClickCell: PropTypes.func,
  headerBackground: PropTypes.any,
  cellHeight: PropTypes.number,
  sectionHeaderHeight: PropTypes.number,
  renderCell: PropTypes.func,
  renderSectionItem: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  sectionHeaderStyle: PropTypes.any,
  sectionHeaderTextStyle: PropTypes.any,
  sectionItemTextStyle: PropTypes.any,
  cellStyle: PropTypes.any,
  cellTitleStyle: PropTypes.any,
  cellLabelStyle: PropTypes.any,
};

CountryCodeList.defaultProps = {
  headerBackground: 'rgb(245, 245, 245)',
  cellHeight: 44.5,
  sectionHeaderHeight: 30,
  onClickCell: () => {}
};

module.exports = CountryCodeList;
