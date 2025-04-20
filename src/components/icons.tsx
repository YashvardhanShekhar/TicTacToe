import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PropsWithChildren } from 'react'

type IconProps = PropsWithChildren<{
    name:String,
}>

const icons = ({name}:IconProps) => {
    switch (name) {
        case 'circle':
            return <Icon name="circle-o" size={38} color="red" />;
            break
        case 'cross':
            return <Icon name="times" size={38} color="blue" />
        default :
            return <Icon name="pencil" size={38} color="gray" />
    }
}

export default icons