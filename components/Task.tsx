import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type TaskProps = {
    text: string
}

const Task = ({text}: TaskProps) => {

    return (
        <View style={styles.item}>
            <View style={styles.task}>
                <TouchableOpacity style={styles.state}></TouchableOpacity>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.select}></View>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    state: {
        width: 24,
        height: 24,
        backgroundColor: '#9a5303bb',
        borderRadius: 100,
    },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
    },
    text: {
        fontSize: 18,
        maxWidth: '80%'
    },
    select: {
        width: 14,
        height: 14,
        borderRadius: 5,
        borderColor: '#441b00ff',
        borderWidth: 2,
    },
})


export default Task