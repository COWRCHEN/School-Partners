import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import studyStore from '../../../store/studyStore'
import exerciseStore from '../../../store/exerciseStore'

import './index.scss'

interface IProps {
  studyStore: studyStore,
  exerciseStore: exerciseStore
}

interface IState {

}

@inject('studyStore', 'exerciseStore')
@observer
class List extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidShow() {

  }

  render() {
    const { studyStore: { hotExerciseList }, exerciseStore: { getExerciseDetail } } = this.props

    return hotExerciseList && hotExerciseList.slice().length !== 0 ? (
      <View className='list-container'>
        {hotExerciseList.map((item, index) => {
          const { exercise_cid, exercise_name, exercise_content } = item;
          return (
            <View className='list-wrap' key={index} onClick={() => { getExerciseDetail(exercise_cid) }}>
              <View className='list-preview'>
                <View className='iconfont icon-tiku'></View>
              </View>
              <View className='list-info'>
                <View className='title'>{exercise_name}</View>
                <View className='content'>{exercise_content}</View>
              </View>
            </View>
          )
        })}
      </View>
    )
      : (
        <View className='list-loading'>
          <AtActivityIndicator size={40} content='加载中' mode='center'></AtActivityIndicator>
        </View>
      )
  }
}

export default List 