import { COLORS } from "@/core/theme/colors";
import useNotesStore from "@/store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/home/header";
import Note from "../components/home/note";
import AddNoteModal from "../components/modal";
import Separator from "../components/separator";
import "./global.css";

export default function Index() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { notes } = useNotesStore();
  
  const openModal = () => {
    setIsModalVisible(true);
  }
  return (
    
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <View className = "flex-1 p-4">
        <FlatList
          data={notes}
          renderItem={({ item }) => <Note item={{ ...item, id: String(item.id) }} />}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={Separator}
        />
      </View>

      <AddNoteModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
  
      <TouchableOpacity style={styles.squircleButton} onPress={openModal}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>


    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: '#A6A9BD',
    },
    squircleButton: {
        height: 64,
        width: 64,
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        borderRadius: 16,
        alignItems: "center",
        position: "absolute",
        right: 24,
        bottom: 40,
      },
  });