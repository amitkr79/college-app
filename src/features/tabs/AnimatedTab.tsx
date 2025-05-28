import { View, Text } from 'react-native'
import React from 'react'
import { SharedStateProvider } from './SharedContext'
import UserBottomTab from './UserBottomTab'

const AnimatedTab = () => {
  return (
    <SharedStateProvider>
        <UserBottomTab/>
    </SharedStateProvider>
  )
}

export default AnimatedTab