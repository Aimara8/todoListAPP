import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Keyboard,
  Animated,
  Platform
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState<string | null>("");
  const [taskItems, setTasksItems] = useState<string[]>([]);
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        Animated.timing(keyboardHeight, {
          duration: 150,
          toValue: e.endCoordinates.height,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          duration: 250,
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handelTask = () => {
    if (task) {
      setTasksItems([...taskItems, task])
      setTask(null);
      Keyboard.dismiss();
    }
  }

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTasksItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Listas de Tareas</Text>
      </View>

      {/* Lista de tareas */}
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Input con animación manual */}
      <Animated.View 
        style={[
          styles.inputContainer,
          {
            marginBottom: keyboardHeight
          }
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea"
          value={task ?? ""}
          onChangeText={text => setTask(text)}
          onSubmitEditing={handelTask}
        />

        <TouchableOpacity onPress={handelTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.add}>+</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fee7b2ff',
  },
  header: {
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
    padding: 16,
    borderWidth: 3,
    borderColor: '#f59e0b',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fffbeb',
    textAlign: 'center',
  },
  scroller: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Espacio para el input
  },
  items: {
    marginTop: 10,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 35,
    paddingHorizontal: 20,
    backgroundColor: '#fee7b2ff',
    borderTopWidth: 1,
    borderTopColor: '#f59e0b',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d97706',
  },
  add: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});